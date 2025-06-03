import React from "react";
import "./SourceAnalysis.css";
import SourceApiCard from "./SourceApiCard";
import logo from "../../img/logo.png";

const SourceAnalysis = () => {
  return (
    <div className="app-source-container">
      <div className="app-source-body">
        <div className="app-api-logo-parent">
          <img className="app-api-logo" src={logo} />
        </div>
        <p id="app-source-header-heading-1">Source Analysis</p>
        <p id="app-source-header-heading-4">
          Access source API to control and simulate water discharge dynamically.
        </p>
      </div>
      <div className="app-source-api-card-container">
        <SourceApiCard />
      </div>
    </div>
  );
};

export default SourceAnalysis;
