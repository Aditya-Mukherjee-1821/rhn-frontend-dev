import React, { useState, useRef, useEffect } from "react";
import Node from "./Node";
import Edge from "./Edge"; // Add this
import "./Graph.css";
import loadNodesData from "./Data";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import search from "../../img/search.png";
import focus from "../../img/focus.png";

const Graph = ({ setApi, setQueryData, reFetchGraph }) => {
  const [zoom, setZoom] = useState(0.4); // Start at minimum zoom
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });

  const [nodes, setNodes] = useState([]);
  const [pipes, setPipes] = useState([]);

  const [searchType, setSearchType] = useState("node");
  const [searchInput, setSearchInput] = useState("");

  const handleDownloadReport = async () => {};

  const handleSearch = () => {
    if (searchType === "node") {
      const foundNode = nodes.find((n) => n.nodeId === searchInput);
      if (foundNode) {
        setApi("query");
        setQueryData({
          nodeId: foundNode.nodeId,
          x: foundNode.x,
          y: foundNode.y,
          type: foundNode.type,
          temperature: foundNode.temperature,
        });

        // Animate to this node
        animateToPosition(foundNode.x, foundNode.y);
      } else {
        alert("Node not found");
      }
    } else if (searchType === "pipe") {
      const foundPipe = pipes.find((p) => p.pipeId === searchInput);
      if (foundPipe) {
        const fromNode = nodes.find((n) => n.id === foundPipe.from);
        const toNode = nodes.find((n) => n.id === foundPipe.to);

        if (fromNode && toNode) {
          setApi("query");
          setQueryData({
            type: "edge",
            pipeId: foundPipe.pipeId,
            fromNode,
            toNode,
            massFlowRate: foundPipe.massflow,
          });

          // Animate to midpoint of the pipe
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          animateToPosition(midX, midY);
        }
      } else {
        alert("Pipe not found");
      }
    }
  };

  const animateRecentre = (targetZoom = 0.1, duration = 800) => {
    const container = containerRef.current;
    if (!container || nodes.length === 0) return;

    const minX = Math.min(...nodes.map((n) => n.x));
    const maxX = Math.max(...nodes.map((n) => n.x));
    const minY = Math.min(...nodes.map((n) => n.y));
    const maxY = Math.max(...nodes.map((n) => n.y));

    const graphCenterX = (minX + maxX) / 2;
    const graphCenterY = (minY + maxY) / 2;

    const { width, height } = container.getBoundingClientRect();
    const screenCenterX = width / 2;
    const screenCenterY = height / 2;

    const targetOffset = {
      x: screenCenterX - graphCenterX * targetZoom,
      y: screenCenterY - graphCenterY * targetZoom,
    };

    const start = performance.now();
    const initialZoom = zoom;
    const initialOffset = { ...offset };

    const animate = (time) => {
      const elapsed = time - start;
      const t = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - t, 3);

      const newZoom = initialZoom + (targetZoom - initialZoom) * ease;
      const newOffset = {
        x: initialOffset.x + (targetOffset.x - initialOffset.x) * ease,
        y: initialOffset.y + (targetOffset.y - initialOffset.y) * ease,
      };

      setZoom(newZoom);
      setOffset(newOffset);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const animateToPosition = (
    targetX,
    targetY,
    targetZoom = 2,
    duration = 600
  ) => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const screenCenterX = width / 2;
    const screenCenterY = height / 2;

    const targetOffset = {
      x: screenCenterX - targetX * targetZoom,
      y: screenCenterY - targetY * targetZoom,
    };

    const start = performance.now();
    const initialZoom = zoom;
    const initialOffset = { ...offset };

    const animate = (time) => {
      const elapsed = time - start;
      const t = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic

      const newZoom = initialZoom + (targetZoom - initialZoom) * ease;
      const newOffset = {
        x: initialOffset.x + (targetOffset.x - initialOffset.x) * ease,
        y: initialOffset.y + (targetOffset.y - initialOffset.y) * ease,
      };

      setZoom(newZoom);
      setOffset(newOffset);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { nodes: loadedNodes, pipes: loadedPipes } = await loadNodesData();
      setNodes(loadedNodes);
      setPipes(loadedPipes);
      // You can also store pipes later using setPipes(loadedPipes) when edge drawing is added
    };

    fetchData();
  }, [reFetchGraph]);

  useEffect(() => {
    if (nodes.length === 0) return;

    // Wait for container to fully render (2 animation frames)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animateRecentre(0.1, 800);
      });
    });
  }, [nodes]);

  const handleWheel = (e) => {
    e.preventDefault();
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.min(4, Math.max(0.1, zoom * zoomFactor));

    // Convert screen to world (pre-zoom) coordinates
    const worldX = (mouseX - offset.x) / zoom;
    const worldY = (mouseY - offset.y) / zoom;

    // New offset so world point stays under mouse
    const newOffset = {
      x: mouseX - worldX * newZoom,
      y: mouseY - worldY * newZoom,
    };

    setZoom(newZoom);
    setOffset(newOffset);
  };

  const handleMouseDown = (e) => {
    // Prevent panning if clicked inside graph-nav-buttons
    if (e.target.closest(".graph-nav-buttons")) return;

    isDragging.current = true;
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;
    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Attach wheel listener for zoom
  useEffect(() => {
    const ref = containerRef.current;
    ref.addEventListener("wheel", handleWheel, { passive: false });
    return () => ref.removeEventListener("wheel", handleWheel);
  }, [zoom, offset]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    // Assuming your node graph is around 600x300 in unscaled space
    const contentWidth = 600 * zoom;
    const contentHeight = 300 * zoom;

    setOffset({
      x: (rect.width - contentWidth) / 2,
      y: (rect.height - contentHeight) / 2,
    });
  }, []);

  const handleRecentre = () => {
    animateRecentre(0.1, 800);
  };

  const handleClick = (nodeProps) => {
    setApi("query");
    setQueryData({
      nodeId: nodeProps.nodeId,
      x: nodeProps.x,
      y: nodeProps.y,
      type: nodeProps.type,
      temperature: nodeProps.temperature,
    });
  };

  return (
    <div
      className="graph-api-card"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ overflow: "hidden" }} // Prevent overflow
    >
      <div className="graph-nav-buttons">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="node">Node</option>
          <option value="pipe">Pipe</option>
        </select>

        <input
          type="text"
          placeholder="Enter ID"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div
          title="Search"
          onClick={handleSearch}
          className="icon-container icon-button"
        >
          <img src={search} alt="Search" />
        </div>
        <div
          title="Recentre"
          onClick={handleRecentre}
          className="icon-container icon-button"
        >
          <img src={focus} alt="Recentre" />
        </div>
      </div>

      <div
        className="graph-zoom-transform"
        ref={containerRef}
        id="graph-capture-area"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        <svg
          className="graph-edges"
          width={1000} // TEMP hardcoded for now
          height={1000}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          {pipes.map((pipe, index) => {
            const fromNode = nodes.find((n) => n.id === pipe.from);
            const toNode = nodes.find((n) => n.id === pipe.to);

            const handleEdgeClick = () => {
              setApi("query");
              setQueryData({
                type: "edge", // or "pipe"
                pipeId: pipe.pipeId,
                fromNode,
                toNode,
                massFlowRate: pipe.massflow,
              });
            };

            return (
              <Edge
                key={index}
                pipeId={pipe.pipeId}
                fromNode={fromNode}
                toNode={toNode}
                massFlowRate={pipe.massflow}
                onClick={handleEdgeClick}
              />
            );
          })}
        </svg>
        {nodes.map((node) => (
          <Node
            onClick={() => handleClick(node)}
            key={node.id}
            nodeId={node.nodeId}
            x={node.x}
            y={node.y}
            type={node.type}
            temperature={node.temperature}
          />
        ))}
      </div>
    </div>
  );
};

export default Graph;
