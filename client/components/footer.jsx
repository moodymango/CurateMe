import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="general-info">
        <p>
          Data and images are sourced from the Art Institute of Chicago API.
        </p>
        <p>Please visit their main website here: </p>
        <a href="https://www.artic.edu/"> "https://www.artic.edu/" </a>
      </div>
      <p>Copyright © by Imma Duverger - all rights reserved</p>
      <p>
        You can view the source code{" "}
        <a href="https://github.com/moodymango/CurateMe"> here</a>
      </p>
    </div>
  );
};

export default Footer;
