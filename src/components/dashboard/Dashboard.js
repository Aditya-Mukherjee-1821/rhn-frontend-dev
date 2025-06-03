import React, { useState } from "react";
import "./Dashboard.css";
import Graph from "../graph/Graph";
import NextHour from "../network/NextHour";
import Time from "../network/Time";
import Query from "../network/Query";
import Upload from "../network/Upload";
import play from "../../img/play.png";
import pen from "../../img/pen.png";
import time from "../../img/time.png";
import download from "../../img/download.png";
import { handleDownload } from "../graph/HandleDownload";

const Dashboard = () => {
  const [api, setApi] = useState(null);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);
  const [isNextHourDisabled, setIsNextHourDisabled] = useState(false);
  const [isTimeDisabled, setIsTimeDisabled] = useState(false);
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);
  const [isQueryDisabled, setIsQueryDisabled] = useState(false);
  const [reFetchGraph, setReFetchGraph] = useState("");
  const [queryData, setQueryData] = useState(null);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app-dashboard-container">
      <div className="app-api-card-side-panel">
        <div
          title="Simulate"
          onClick={() => !isNextHourDisabled && setApi("next-hour")}
          className={`app-api-card-side-panel-containers icon-button ${
            isNextHourDisabled ? "disabled" : ""
          }`}
        >
          <img src={play} alt="Heater" />
        </div>

        <div
          title="Time-delay"
          onClick={() => !isTimeDisabled && setApi("time-delay")}
          className={`app-api-card-side-panel-containers icon-button ${
            isTimeDisabled ? "disabled" : ""
          }`}
        >
          <img src={time} alt="Time" />
        </div>

        <div
          title="Upload"
          onClick={() => !isUpdateDisabled && setShowModal(true)}
          className={`app-api-card-side-panel-containers icon-button ${
            isUpdateDisabled ? "disabled" : ""
          }`}
        >
          <img src={pen} alt="Edit" />
        </div>
        <div
          title="Download"
          onClick={() => !isDownloadDisabled && handleDownload()}
          className={`app-api-card-side-panel-containers icon-button ${
            isDownloadDisabled ? "disabled" : ""
          }`}
        >
          <img src={download} alt="Edit" />
        </div>
      </div>
      <div className="app-api-card-container">
        <div className={`graph-container ${api ? "shrink" : "full"}`}>
          <Graph
            setApi={setApi}
            setQueryData={setQueryData}
            reFetchGraph={reFetchGraph}
          />
        </div>
        <div className={`api-container ${api ? "expand" : "hide"}`}>
          {api === "next-hour" && (
            <NextHour
              setReFetchGraph={setReFetchGraph}
              setApi={setApi}
              setIsUpdateDisabled={setIsUpdateDisabled}
              setIsTimeDisabled={setIsTimeDisabled}
              setIsDownloadDisabled={setIsDownloadDisabled}
            />
          )}
          {api === "query" && <Query queryData={queryData} setApi={setApi} />}
          {api === "time-delay" && (
            <Time
              setApi={setApi}
              setIsUpdateDisabled={setIsUpdateDisabled}
              setIsNextHourDisabled={setIsNextHourDisabled}
              setIsDownloadDisabled={setIsDownloadDisabled}
            />
          )}
        </div>

        {/* Render Edit modal if showModal is true */}
        {showModal && (
          <Upload
            setReFetchGraph={setReFetchGraph}
            setShowModal={setShowModal}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
