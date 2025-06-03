import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NextHour.css";
import heater from "../../img/heater.png";
import { LoadingBar } from "../misc/LoadingBar";
import FadingTexts from "../misc/FadingTexts";
import close from "../../img/close.png";

const NextHour = ({
  setApi,
  setIsUpdateDisabled,
  setIsTimeDisabled,
  setReFetchGraph,
  setIsDownloadDisabled,
}) => {
  const [temps, setTemps] = useState(() => {
    const stored = localStorage.getItem("temps");
    return stored ? JSON.parse(stored) : [];
  });

  const [lastRunAt, setLastRunAt] = useState(() => {
    return localStorage.getItem("lastRunAt") || null;
  });

  const [loading, setLoading] = useState(false);

  const fetchTemp = async () => {
    setLoading(true);
    setIsUpdateDisabled(true);
    setIsTimeDisabled(true);
    setIsDownloadDisabled(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/next_hour/");
      const tempData = JSON.parse(response.data); // e.g., [{ "Sarfvik": 273+ }, { "Kirkkonummi": 273+ }]
      const processed = tempData.map((entry) => {
        const location = Object.keys(entry)[0];
        const tempCelsius = entry[location] - 273.15;
        return { location, tempCelsius };
      });

      setTemps(processed);
      setLastRunAt(new Date().toISOString());
      setReFetchGraph(new Date().toISOString());

      // Save to localStorage
      localStorage.setItem("temps", JSON.stringify(processed));
      localStorage.setItem("lastRunAt", new Date().toISOString());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsUpdateDisabled(false);
      setIsTimeDisabled(false);
      setIsDownloadDisabled(false);
    }
  };

  const handleClose = () => {
    !loading && setApi(null);
  };

  const messages = ["Fetching Temperature...", "Almost Done..."];

  return (
    <div
      className="network-api-form-next-hour"
      style={{ position: "relative", paddingBottom: "10px" }}
    >
      <div className="close-parent">
        <img className={`${loading ? "disabled" : ""}`} onClick={handleClose} src={close} alt="Close" />
      </div>
      <div className="network-api-form-header-next-hour">
        Temperature of Source
      </div>
      <div className="network-api-form-subheader-next-hour">
        Last Fetched: {lastRunAt ? new Date(lastRunAt).toLocaleString() : "--"}
      </div>
      <div className="network-api-form-input-next-hour">
        <div className="heater-data-container">
          {temps.length > 0 ? (
            temps.map(({ location, tempCelsius }, index) => (
              <div key={index} className="heater-info">
                <img id="heater-img" src={heater} alt="Heater" />
                <div>
                  T<span className="subscript-temp">{index + 1}</span> ={" "}
                  {tempCelsius.toFixed(2)}°C
                </div>
              </div>
            ))
          ) : (
            <div className="heater-info">-- No data --</div>
          )}
        </div>
      </div>
      <div className="network-api-form-fade-container">
        {loading ? (
          <FadingTexts messages={messages} />
        ) : (
          <button className="run-button fade-in" onClick={fetchTemp}>
            Run
          </button>
        )}
      </div>
      {loading && <LoadingBar />}
    </div>
  );
};

export default NextHour;
