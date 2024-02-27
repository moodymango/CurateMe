import React from "react";
import Modal from "./Modal.jsx";
function BaseModelWrapper({ onBackdropClick, isVisible }) {
  if (isVisible === false) {
    console.log("should not see our modal");
    return null;
  }
  return <Modal onBackdropClick={onBackdropClick}></Modal>;
}

export default BaseModelWrapper;
