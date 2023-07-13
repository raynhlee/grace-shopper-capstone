import React from "react";
import { default as logo } from "../guitargetlogolarge.png";

const Footer = () => {
  return (
    <div id="footer-container-div">
      <div id="footer-main-div">
        <img src={logo} id="footer-logo" />
        <p id="footer-slogan">Play more. Pay less.</p>
      </div>
      <div id="footer-grey-div">
        <p>© 2023 Guitarget Brands, Inc.</p>
      </div>
    </div>
  );
};

export default Footer;
