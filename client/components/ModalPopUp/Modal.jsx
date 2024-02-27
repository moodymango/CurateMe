import React, { useState } from "react";
import ReactDom from "react-dom";
const modalStyle = {
  position: "50%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#555",
  padding: "50px",
  zIndex: 1000,
};
const overLayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};
function Modal({ onBackdropClick, children }) {
  console.log("we should be seeing our modal");
  //need to give user a way to close the modal in the modal corner
  return ReactDom.createPortal(
    <div onClick={onBackdropClick}>
      <span color="black">I'm a happy little modal</span>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
