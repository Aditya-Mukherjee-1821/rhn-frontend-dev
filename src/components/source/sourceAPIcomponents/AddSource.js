import React, { useState } from "react";
import "./AddSource.css";
import { LoadingBar } from "../../misc/LoadingBar";
import FadingTexts from "../../misc/FadingTexts";

const AddSource = () => {
  const [loading, setLoading] = useState(false);
  const messages = ["Fetching Temperature...", "Almost Done..."];
  return (
    <div
      className="source-api-form-add-source"
      style={{ position: "relative", paddingBottom: "10px" }}
    >
      <div className="source-api-form-header-add-source">Add source</div>
      <div className="sink-api-form-subheader-add-source">Last Fetched:</div>
      <div className="source-api-form-input-add-source">
        <input placeholder="Junction ID" />
        <input placeholder="X-coordinate" />
        <input placeholder="Y-coordinate" />
        <input placeholder="Base Demand" />
      </div>
      <div className="network-api-form-fade-container">
        {loading ? (
          <FadingTexts messages={messages} />
        ) : (
          <button className="add-sink-button fade-in">Remove</button>
        )}
      </div>
      {loading && <LoadingBar />}
    </div>
  );
};

export default AddSource;
