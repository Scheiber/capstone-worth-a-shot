import React from "react";
import "./Footer.css";

const Footer = () => (
  <div className="footer">
    <p className="footer-text">
      &copy; {new Date().getFullYear()} Worth a Shot. All rights reserved.
    </p>
  </div>
);

export default Footer;
