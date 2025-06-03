// src/components/Data.js
import axios from "axios";

// Fetch and parse the graph data from the backend API
const loadNodesData = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/graph/");
    const rawData = response.data;

    if (!Array.isArray(rawData) || rawData.length < 2) {
      throw new Error("Unexpected API response format");
    }

    const [nodesRaw, pipesRaw] = rawData;

    // Filter and normalize _supply nodes
    const nodes = Object.entries(nodesRaw)
      .filter(([key]) => key.endsWith("_supply"))
      .map(([id, data]) => {
        const numericId = id.split("_")[1]; // "897"
        return {
          id,
          nodeId: numericId,
          x: data.x,
          y: data.y,
          type: data.type,
          temperature: data.t,
        };
      });

    // Normalize pipe (edge) data
    const pipes = Object.entries(pipesRaw)
      .filter(([id]) => id.endsWith("_supply"))
      .map(([id, data]) => {
        const numericId = id.split("_")[1]; // "10285469"
        return {
          id,
          pipeId: numericId,
          from: data.from,
          to: data.to,
          massflow: data.massflow,
        };
      });

    return { nodes, pipes };
  } catch (error) {
    console.error("Failed to load graph data:", error);
    return { nodes: [], pipes: [] };
  }
};

export default loadNodesData;
