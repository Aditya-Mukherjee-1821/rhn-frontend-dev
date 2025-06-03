import React, { useState } from "react";
import "./PipeApiCard.css";
import RemovePipe from "./pipeAPIcomponents/RemovePipe";
import AddPipe from "./pipeAPIcomponents/AddPipe";

const PipeApiCard = () => {
  const [api, setApi] = useState("Remove pipe");

  return (
    <div className="pipe-api-card">
      <div className="pipe-api-select-slider-parent">
        <div
          className="pipe-api-select-slider-element"
          onClick={() => setApi("Remove pipe")}
          style={{
            boxShadow:
              api === "Remove pipe" ? "0px 6px 10px rgba(0, 0, 0, 0.3)" : "none",
            borderBottomLeftRadius: "0px",
            borderTopLeftRadius: api === "Remove pipe" ? "10px" : "0px",
            backgroundColor: api === "Remove pipe" ? "#fff" : "transparent",
            transition: "all 0.3s ease-in-out",
          }}
        >
          Remove pipe
        </div>
      
        <div
          className="pipe-api-select-slider-element"
          onClick={() => setApi("Add pipe")}
          style={{
            boxShadow:
              api === "Add pipe" ? "0px 6px 10px rgba(0, 0, 0, 0.3)" : "none",
            borderBottomRightRadius: "0px",
            borderTopRightRadius: api === "Add pipe" ? "10px" : "0px",
            backgroundColor: api === "Add pipe" ? "#fff" : "transparent",
            transition: "all 0.3s ease-in-out",
          }}
        >
          Add pipe
        </div>
      </div>
      {api === "Remove pipe" ? <RemovePipe /> : null}
      {api === "Add pipe" ? <AddPipe /> : null}
    </div>
  );
};

export default PipeApiCard;
