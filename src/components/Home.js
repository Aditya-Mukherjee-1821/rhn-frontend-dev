import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import "./Home.css";
import AppCard from "./AppCard";
import sink from "../img/sink.jpeg";
import pipe from "../img/pipe.jpeg";
import source from "../img/source.jpeg";
import network from "../img/network.jpeg";
import logo from "../img/logo.png";
import "./misc/Card.css";
import "./misc/Logo.css";
import { Link, useNavigate } from "react-router-dom";
import goto from "../img/goto.png";

const Home = () => {
  const navigate = useNavigate();
  const handleClickVisualize = () => {
    navigate("/dashboard"); // replace with your route
  };
  return (
    <div className="app-home-container">
      <div className="app-body">
        <div className="app-api-logo-parent">
          <img className="app-api-logo" src={logo} />
        </div>
        <p id="app-header-heading-1">Regional Heating Network</p>
        <p id="app-header-heading-4">
          Sustainable Heat Distribution for the Future
        </p>
        <br />
        <div className="app-button-container">
          <button onClick={handleClickVisualize} className="button fade-in">
            <span>Dashboard</span>
            <img src={goto} alt="Goto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
