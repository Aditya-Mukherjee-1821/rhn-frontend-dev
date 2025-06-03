import React, { useRef, useEffect, useState } from "react";
import "./Update.css";
import loadNodesData from "../graph/Data";
import axios from "axios";

const Update = ({ onClose, setShowModal }) => {
  const modalRef = useRef();
  const [data, setData] = useState({ nodes: [], pipes: [] });
  const [modifications, setModifications] = useState({ nodes: {}, pipes: {} });
  const [searchType, setSearchType] = useState("node");
  const [searchInput, setSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const handleApply = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/edit/",
        modifications
      );
      console.log("Server response:", response.data);
      alert("Changes applied successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error sending modifications:", error);
      alert("Failed to apply changes.");
    }
  };

  useEffect(() => {
    loadNodesData().then(setData);
  }, []);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (id, type, currentValue) => {
    setModifications((prevMods) => ({
      ...prevMods,
      [type]: {
        ...prevMods[type],
        [id]: { is_on: currentValue ? 0 : 1 },
      },
    }));
  };

  const handleSearchInput = (value) => {
    setSearchInput(value);
    const source = searchType === "node" ? data.nodes : data.pipes;
    const key = searchType === "node" ? "nodeId" : "pipeId";
    const suggestions = source
      .filter((item) => item[key].startsWith(value))
      .map((item) => item[key]);
    setSearchSuggestions(suggestions);
  };

  const handleSearch = () => {
    let foundElement = null;
    if (searchType === "node") {
      foundElement = document.querySelector(`[data-node-id='${searchInput}']`);
    } else {
      foundElement = document.querySelector(`[data-pipe-id='${searchInput}']`);
    }

    if (foundElement) {
      foundElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      alert(`${searchType === "node" ? "Node" : "Pipe"} not found`);
    }
  };

  const renderRow = (item, type) => {
    const id =
      type === "nodes"
        ? `Junction_${item.nodeId}_supply`
        : `Pipe_${item.pipeId}_supply`;

    const visibleFields =
      type === "nodes"
        ? ["nodeId", "x", "y", "type"]
        : ["pipeId", "from", "to"];

    const mod = modifications[type]?.[id];
    const isOn = mod ? mod.is_on === 1 : 1;

    return (
      <tr
        key={`${type}-${id}`}
        className="table-row"
        data-node-id={item.nodeId}
        data-pipe-id={item.pipeId}
      >
        {visibleFields.map((field) => (
          <td key={field}>{item[field]}</td>
        ))}
        {/* <td>
          <label className="switch">
            <input
              type="checkbox"
              checked={isOn}
              onChange={() => handleToggle(id, type, isOn)}
            />
            <span className="slider round"></span>
          </label>
        </td> */}
      </tr>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="search-section">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="input-table-data"
          >
            <option value="node">Node</option>
            <option value="pipe">Pipe</option>
          </select>
          <input
            className="input-table-data"
            placeholder={`Search ${searchType} ID`}
            value={searchInput}
            onChange={(e) => handleSearchInput(e.target.value)}
            list="search-suggestions"
          />
          <datalist id="search-suggestions">
            {searchSuggestions.map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
          </datalist>
          <button className="app-button search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="modal-scroll-body">
          <h3>Junctions</h3>
          <table className="edit-table">
            <thead>
              <tr>
                <th>Node ID</th>
                <th>X</th>
                <th>Y</th>
                <th>Type</th>
                {/* <th>Toggle</th> */}
              </tr>
            </thead>
            <tbody>{data.nodes.map((node) => renderRow(node, "nodes"))}</tbody>
          </table>

          <h3>Pipes</h3>
          <table className="edit-table">
            <thead>
              <tr>
                <th>Pipe ID</th>
                <th>From</th>
                <th>To</th>
                {/* <th>Toggle</th> */}
              </tr>
            </thead>
            <tbody>{data.pipes.map((pipe) => renderRow(pipe, "pipes"))}</tbody>
          </table>
        </div>

        <div className="modal-buttons">
          <button className="app-button" onClick={onClose}>
            Close
          </button>
          {/* <button className="app-button" onClick={handleApply}>
            Apply
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Update;
