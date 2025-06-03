import React, { useState } from "react";
import "./SourceApiCard.css";
import RemoveSource from "./sourceAPIcomponents/RemoveSource";
import AddSource from "./sourceAPIcomponents/AddSource";

const SourceApiCard = () => {
  const [api, setApi] = useState("Remove source");

  return (
    <div className="source-api-card">
      <div className="source-api-select-slider-parent">
        <div
          className="source-api-select-slider-element"
          onClick={() => setApi("Remove source")}
          style={{
            boxShadow:
              api === "Remove source" ? "0px 6px 10px rgba(0, 0, 0, 0.3)" : "none",
            borderBottomLeftRadius: "0px",
            borderTopLeftRadius: api === "Remove source" ? "10px" : "0px",
            backgroundColor: api === "Remove source" ? "#fff" : "transparent",
            transition: "all 0.3s ease-in-out",
          }}
        >
          Remove source
        </div>
      
        <div
          className="source-api-select-slider-element"
          onClick={() => setApi("Add source")}
          style={{
            boxShadow:
              api === "Add source" ? "0px 6px 10px rgba(0, 0, 0, 0.3)" : "none",
            borderBottomRightRadius: "0px",
            borderTopRightRadius: api === "Add source" ? "10px" : "0px",
            backgroundColor: api === "Add source" ? "#fff" : "transparent",
            transition: "all 0.3s ease-in-out",
          }}
        >
          Add source
        </div>
      </div>
      {api === "Remove source" ? <RemoveSource /> : null}
      {api === "Add source" ? <AddSource /> : null}
    </div>
  );
};

export default SourceApiCard;
