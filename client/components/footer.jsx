import React from "react";

const Footer = () => {
  return (
    <div class="footer">
      <p>
        Data and images are sourced from the Art Institute of Chicago API.
        Please visit their main website here:{" "}
        <a href="https://api.artic.edu/docs/">
          {" "}
          "https://api.artic.edu/docs/"{" "}
        </a>
      </p>
      <p>Copyright © by Imma Duverger - all rights reserved</p>
      <p>
        You can view the source code{" "}
        <a href="https://github.com/moodymango/CurateMe"> here</a>
      </p>
    </div>
  );
};

export default Footer;
