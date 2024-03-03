import React, { useState } from "react";
import { Link } from "react-router-dom";
import BaseModalWrapper from "../components/ModalPopUp/BaseModalWrapper.jsx";

function Navbar(props) {
  const [seen, setSeen] = useState(false);
  function toggleModal() {
    setSeen(!seen);
  }

  return (
    <nav>
      <ul className="navbar">
        <div className="left-nav">
          <li>
            <Link to="/"> CurateMe </Link>
          </li>
          <li>
            <Link to="/search"> Search for Artworks </Link>
          </li>
        </div>
        <div className="right-nav">
          <button onClick={toggleModal}>Show modal</button>
          <BaseModalWrapper
            isVisible={seen}
            onBackdropClick={toggleModal}
          ></BaseModalWrapper>
          <li>
            <Link to="/signup"> Sign Up </Link>
          </li>
          <li>
            <Link to="/login"> Login </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
