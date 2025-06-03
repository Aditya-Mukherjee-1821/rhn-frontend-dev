import React, { useState } from "react";
import "./RemoveSource.css";
import { LoadingBar } from "../../misc/LoadingBar";
import FadingTexts from "../../misc/FadingTexts";

const RemoveSource = () => {
  const [loading, setLoading] = useState(false);
  const messages = ["Fetching Temperature...", "Almost Done..."];
  return (
    <div
      className="source-api-form-remove-source"
      style={{ position: "relative", paddingBottom: "10px" }}
    >
      <div className="source-api-form-header-remove-source">Remove source</div>
      <div className="sink-api-form-subheader-remove-source">Last Fetched:</div>
      <div className="source-api-form-input-remove-source">
        <input placeholder="Junction ID" />
      </div>
      <div className="network-api-form-fade-container">
        {loading ? (
          <FadingTexts messages={messages} />
        ) : (
          <button className="remove-source-button fade-in">Remove</button>
        )}
      </div>
      {loading && <LoadingBar />}
    </div>
  );
};

export default RemoveSource;
