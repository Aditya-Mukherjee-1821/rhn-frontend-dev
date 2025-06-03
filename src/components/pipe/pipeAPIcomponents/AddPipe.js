import React, { useState } from "react";
import "./AddPipe.css";
import { LoadingBar } from "../../misc/LoadingBar";
import FadingTexts from "../../misc/FadingTexts";

const AddPipe = () => {
  const [loading, setLoading] = useState(false);
  const messages = ["Fetching Temperature...", "Almost Done..."];
  return (
    <div
      className="pipe-api-form-add-pipe"
      style={{ position: "relative", paddingBottom: "10px" }}
    >
      <div className="pipe-api-form-header-add-pipe">Add pipe</div>
      <div className="sink-api-form-subheader-add-pipe">Last Fetched:</div>
      <div className="pipe-api-form-input-add-pipe">
        <input placeholder="Junction ID" />
        <input placeholder="X-coordinate" />
        <input placeholder="Y-coordinate" />
        <input placeholder="Base Demand" />
      </div>
      <div className="network-api-form-fade-container">
        {loading ? (
          <FadingTexts messages={messages} />
        ) : (
          <button className="add-pipe-button fade-in">Remove</button>
        )}
      </div>
      {loading && <LoadingBar />}
    </div>
  );
};

export default AddPipe;
