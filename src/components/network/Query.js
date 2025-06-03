import React, { useEffect, useState } from "react";
import "./Query.css";
import close from "../../img/close.png";
import heater from "../../img/heater.png";
import pipe from "../../img/pipe.png";
import node from "../../img/node.png";
import flat from "../../img/flat.png";
import search from "../../img/search.png";
import loadNodesData from "../graph/Data";

const Query = ({ setApi, queryData }) => {
  const [nodes, setNodes] = useState([]);
  const [pipes, setPipes] = useState([]);
  const [queryType, setQueryType] = useState("");
  const [queryId, setQueryId] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      const { nodes: loadedNodes, pipes: loadedPipes } = await loadNodesData();
      setNodes(loadedNodes);
      setPipes(loadedPipes);
      // You can also store pipes later using setPipes(loadedPipes) when edge drawing is added
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setApi(null);
  };

  const handleSearch = () => {
    if (!queryType || !queryId) {
      console.log("Please select type and enter an ID.");
      return;
    }

    if (queryType === "node") {
      const foundNode = nodes.find((n) => n.nodeId === queryId);
      if (foundNode) {
        setApi(foundNode);
      } else {
        console.log("Node not found");
      }
    } else if (queryType === "pipe") {
      const foundPipe = pipes.find((p) => p.pipeId === queryId);
      if (foundPipe) {
        setApi({
          ...foundPipe,
          type: "edge",
          fromNode: nodes.find((n) => n.id === foundPipe.from),
          toNode: nodes.find((n) => n.id === foundPipe.to),
        });
      } else {
        console.log("Pipe not found");
      }
    }
  };

  return (
    <div
      className="network-api-form-query"
      style={{ position: "relative", paddingBottom: "10px" }}
    >
      <div className="close-parent">
        <img onClick={handleClose} src={close} alt="Close" />
      </div>
      <div className="network-api-form-header-query">
        Node/Connection Details
      </div>

      <div className="network-api-form-input-query">
        <div className="query-image">
          {queryData ? (
            queryData.type === "edge" ? (
              <img src={pipe} alt="Pipe" />
            ) : queryData.type === "sink" ? (
              <img src={flat} alt="Sink" />
            ) : queryData.type === "junction" ? (
              <img src={node} alt="Junction" />
            ) : queryData.type === "heater" ? (
              <img src={heater} alt="Heater" />
            ) : (
              <p>Unknown type</p>
            )
          ) : null}
        </div>
        <div className="query-details">
          {queryData ? (
            queryData.type === "edge" ? (
              <div>
                <p>
                  <strong>Pipe ID:</strong> {queryData.pipeId}
                </p>
                <p>
                  <strong>From Node:</strong> {queryData.fromNode.nodeId} &nbsp;
                  (<em>x:</em> {queryData.fromNode.x}, <em>y:</em>{" "}
                  {queryData.fromNode.y})
                </p>
                <p>
                  <strong>To Node:</strong> {queryData.toNode.nodeId} &nbsp; (
                  <em>x:</em> {queryData.toNode.x}, <em>y:</em>{" "}
                  {queryData.toNode.y})
                </p>
                <p>
                  <strong>Mass Flow Rate:</strong> {queryData.massFlowRate}
                </p>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Node ID:</strong> {queryData.nodeId}
                </p>
                <p>
                  <strong>Type:</strong> {queryData.type}
                </p>
                <p>
                  <strong>Coordinates:</strong> x = {queryData.x}, y ={" "}
                  {queryData.y}
                </p>
                <p>
                  <strong>Temperature:</strong> {queryData.temperature}°C
                </p>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Query;
