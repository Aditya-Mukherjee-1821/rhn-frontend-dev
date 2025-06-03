import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Time.css";
import clock from "../../img/clock.png";
import { LoadingBar } from "../misc/LoadingBar";
import FadingTexts from "../misc/FadingTexts";
import close from "../../img/close.png";

const Time = ({
  setApi,
  setIsUpdateDisabled,
  setIsNextHourDisabled,
  setIsDownloadDisabled,
}) => {
  const [time, setTime] = useState(() => {
    // Retrieve stored time if available
    return localStorage.getItem("time") || "--:--:--";
  });

  const [lastRunAt, setLastRunAt] = useState(() => {
    // Retrieve stored lastRunAt if available
    return localStorage.getItem("lastRunAtTime") || null;
  });

  const [loading, setLoading] = useState(false);

  const fetchTime = async () => {
    setLoading(true);
    setIsNextHourDisabled(true);
    setIsUpdateDisabled(true);
    setIsDownloadDisabled(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/time_delay/");
      const timeData = JSON.parse(response.data);
      console.log(timeData);

      // Store new values in state
      setTime(Math.floor(Math.abs(timeData["time"]) / 60));
      setLastRunAt(new Date().toISOString());
      setIsNextHourDisabled(false);
      setIsUpdateDisabled(false);
      setIsDownloadDisabled(false);

      // Save to localStorage
      localStorage.setItem("time", Math.floor(Math.abs(timeData["time"]) / 60));
      localStorage.setItem("lastRunAtTime", new Date().toISOString());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsNextHourDisabled(false);
      setIsUpdateDisabled(false);
      setIsDownloadDisabled(false);
    }
  };

  const handleClose = () => {
    !loading && setApi(null);
  };

  const messages = ["Fetching Time...", "Almost Done..."];

  return (
    <div
      className="network-api-form-time"
      style={{ position: "relative", paddingBottom: "10px" }}
    >
      <div className="close-parent">
        <img className={`${loading ? "disabled" : ""}`} onClick={handleClose} src={close} />
      </div>
      <div className="network-api-form-header-time">Time Delay</div>
      <div className="network-api-form-subheader-time">
        Last Fetched: {lastRunAt ? new Date(lastRunAt).toLocaleString() : "--"}
      </div>
      <div className="network-api-form-input-time">
        <img id="clock-img" src={clock} alt="Clock" />
        {time} minute(s)
      </div>
      <div className="network-api-form-fade-container">
        {loading ? (
          <FadingTexts messages={messages} />
        ) : (
          <button className="run-button fade-in" onClick={fetchTime}>
            Run
          </button>
        )}
      </div>
      {loading && <LoadingBar />}
    </div>
  );
};

export default Time;
