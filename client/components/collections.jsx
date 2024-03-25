import React, { useState, useEffect } from "react";

const CollectionsCard = (props) => {
  const { title, description } = props;
  return (
    <div className="artwork-cards">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div id="collectionsInfo">
          <label htmlFor="title">Title: </label>
          <span id="title">{title}</span>
        </div>
        <div id="collectionsInfo">
          <label htmlFor="info">Description: </label>
          <span id="info">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionsCard;
