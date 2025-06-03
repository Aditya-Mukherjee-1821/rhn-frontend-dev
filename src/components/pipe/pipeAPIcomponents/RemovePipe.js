import React, { useState } from "react";
import "./RemovePipe.css";
import { LoadingBar } from "../../misc/LoadingBar";
import FadingTexts from "../../misc/FadingTexts";

const RemovePipe = () => {
  const [loading, setLoading] = useState(false);
  const messages = ["Fetching Temperature...", "Almost Done..."];
  return (
    <div
      className="pipe-api-form-remove-pipe"
      style={{ position: "relative", paddingBottom: "10px" }}
    >
      <div className="pipe-api-form-header-remove-pipe">Remove pipe</div>
      <div className="sink-api-form-subheader-remove-pipe">Last Fetched:</div>
      <div className="pipe-api-form-input-remove-pipe">
        <input placeholder="Junction ID" />
      </div>
      <div className="network-api-form-fade-container">
        {loading ? (
          <FadingTexts messages={messages} />
        ) : (
          <button className="remove-pipe-button fade-in">Remove</button>
        )}
      </div>
      {loading && <LoadingBar />}
    </div>
  );
};

export default RemovePipe;
