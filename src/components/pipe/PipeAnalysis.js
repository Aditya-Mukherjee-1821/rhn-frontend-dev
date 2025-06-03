import React from "react";
import "./PipeAnalysis.css";
import PipeApiCard from "./PipeApiCard";
import logo from "../../img/logo.png";

const PipeAnalysis = () => {
  return (
    <div className="app-pipe-container">
      <div className="app-pipe-body">
        <div className="app-api-logo-parent">
          <img className="app-api-logo" src={logo} />
        </div>
        <p id="app-pipe-header-heading-1">Pipe analysis</p>
        <p id="app-pipe-header-heading-4">
          Access pipe API to control and simulate water discharge dynamically.
        </p>
      </div>
      <div className="app-pipe-api-card-container">
        <PipeApiCard />
      </div>
    </div>
  );
};

export default PipeAnalysis;
