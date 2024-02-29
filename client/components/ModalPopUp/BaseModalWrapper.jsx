import React from "react";
import Modal from "./Modal.jsx";
function BaseModelWrapper({ onBackdropClick, isVisible }) {
  if (isVisible === false) {
    return null;
  }
  const modalContainerStyle = {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    borderRadius: "7px",
    boxShadow: "0 0 32px rgba(0,0,0,0.5)",
    width: "450px",
    fontSize: "26px",
  };
  const headerStyle = {
    color: "white",
    fontSize: "35px",
    lineHeight: "1em",
    fontWeight: "300",
    margin: "5px, 0, 10px",
    textAlign: "center",
  };

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <div style={modalContainerStyle}>
        <h2 style={headerStyle}>Sign In</h2>
      </div>
    </Modal>
  );
}

export default BaseModelWrapper;
