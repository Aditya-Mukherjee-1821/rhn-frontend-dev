import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SourceAnalysis from "./components/source/SourceAnalysis";
import PipeAnalysis from "./components/pipe/PipeAnalysis";
import GraphAnalysis from "./components/graph/Graph";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
