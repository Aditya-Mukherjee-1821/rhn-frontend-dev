import React, { useState } from "react";
import "./Edge.css";

const Edge = ({onClick, pipeId, fromNode, toNode, massFlowRate }) => {
  if (!fromNode || !toNode) return null;

  // Offset both lines away from each other
  const offset = 4;

  const dx = toNode.y - fromNode.y;
  const dy = fromNode.x - toNode.x;
  const length = Math.sqrt(dx * dx + dy * dy) || 1;
  const normX = (dx / length) * offset;
  const normY = (dy / length) * offset;

  // Supply line coordinates (slightly above)
  const sx1 = fromNode.x + normX;
  const sy1 = fromNode.y + normY;
  const sx2 = toNode.x + normX;
  const sy2 = toNode.y + normY;

  // Return line coordinates (slightly below, reversed)
  const rx1 = toNode.x - normX;
  const ry1 = toNode.y - normY;
  const rx2 = fromNode.x - normX;
  const ry2 = fromNode.y - normY;

  return (
    <>
      {/* SUPPLY LINE */}
      <line
        onClick={onClick}
        className="base-line supply"
        x1={sx1}
        y1={sy1}
        x2={sx2}
        y2={sy2}
        markerEnd="url(#arrowhead)"
      >
        <title>
          {`Pipe ID: ${pipeId}\nSupply Mass Flow: ${massFlowRate?.toFixed(
            2
          )} kg/s`}
        </title>
      </line>
      <line className="flow-line supply" x1={sx1} y1={sy1} x2={sx2} y2={sy2} />

      {/* RETURN LINE */}
      <line
        onClick={onClick}
        className="base-line return"
        x1={rx1}
        y1={ry1}
        x2={rx2}
        y2={ry2}
        markerEnd="url(#arrowhead)"
      >
        <title>
          {`Pipe ID: ${pipeId}\nReturn Mass Flow: ${massFlowRate?.toFixed(
            2
          )} kg/s`}
        </title>
      </line>
      <line className="flow-line return" x1={rx1} y1={ry1} x2={rx2} y2={ry2} />
    </>
  );
};

export default Edge;
