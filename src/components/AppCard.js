import React from "react";
import "./AppCard.css";
import { Link } from "react-router-dom";

const AppCard = ({url, img, header, body }) => {
  return (
    <div className="app-card">
      <img src={img} alt="sink image" className="card-image" />
      <div className="card-text">
        <Link to={url}>
          <p className="card-text-header">{header}</p>
        </Link>
        <p className="card-text-body">{body}</p>
      </div>
    </div>
  );
};

export default AppCard;
