import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          &copy; 2025 Your E-Learning Platform. All rights reserved.
        </p>
        <div className="social-links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tooltip"
          >
            <AiFillFacebook />
            <span className="tooltiptext">Facebook</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tooltip"
          >
            <AiFillTwitterSquare />
            <span className="tooltiptext">Twitter</span>
          </a>
          <a
            href="https://instagram.com/mohdafzal7534"
            target="_blank"
            rel="noopener noreferrer"
            className="tooltip"
          >
            <AiFillInstagram />
            <span className="tooltiptext">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
