import React from "react";
import "./Node.css";
import flat from "../../img/flat.png";
import coil from "../../img/coil.png";
import node from "../../img/node.png";

const Node = ({ onClick, nodeId, x, y, temperature, type }) => {
  const getImage = () => {
    if (type === "heater") return coil;
    if (type === "sink") return flat;
    return node;
  };

  const getClassName = () => {
    if (type === "heater") return "graph-node source";
    if (type === "sink") return "graph-node sink";
    return "graph-node junction";
  };

  const getAltText = () => {
    if (type === "heater") return "Source/Heater";
    if (type === "sink") return "Sink/User";
    return "Junction";
  };

  return (
    <div className="node-img-parent">
      <img
        onClick={onClick}
        src={getImage()}
        alt={getAltText()}
        className={getClassName()}
        style={{
          top: `${y - 10}px`,
          left: `${x - 10}px`,
        }}
        title={`Node ID: ${nodeId}\nType: ${type}\nX: ${x}\nY: ${y}\nTemperature: ${temperature}°C`}
      />
    </div>
  );
};

export default Node;
