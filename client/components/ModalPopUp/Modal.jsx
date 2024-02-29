import React, { useState } from "react";
import ReactDom from "react-dom";
const overLay = {
  backgroundColor: "rgba(0,0,0,0.5)",
  position: "fixed",
  height: "100%",
  width: "100%",
  top: "0",
  left: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
function Modal({ onBackdropClick, children }) {
  //need to give user a way to close the modal in the modal corner
  return ReactDom.createPortal(
    <div style={overLay} onClick={onBackdropClick}>
      <span color="black">{children}</span>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
