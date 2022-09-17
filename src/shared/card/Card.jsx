import React from "react";
import "./Card.scss";

export const Card = ({ url, title }) => {
  return (
    <div className="card">
      <img src={url}></img>
      <span>{title}</span>
    </div>
  );
};
