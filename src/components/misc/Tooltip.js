import React from "react";
import "./Tooltip.css"; // Add custom styling here

const Tooltip = ({ content, x, y }) => {
  return (
    <div
      className="tooltip"
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        pointerEvents: "none", // Prevent it from interfering with other hover events
      }}
    >
      <div className="tooltip-content">{content}</div>
    </div>
  );
};

export default Tooltip;
