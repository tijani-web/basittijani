import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo">
          <span className="logo-text">
            <img src="basit_logo_white.png" alt="basit logo" className="logo-image" />
          </span>
        </div>
        
        <div className="social-link-footer">
          <a href="https://github.com/tijani-web" className="social-linkss" target='_blank' rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/basit-tijani-4362b3320/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BDwxG1JF3Q9GPLZQvHefV8w%3D%3D" className="social-linkss" target='_blank' rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://x.com/tijani_web" className="social-linkss" target='_blank' rel="noopener noreferrer" aria-label="Twitter">
            <FaXTwitter />
          </a>
          <a href="https://www.instagram.com/tijanidev?igsh=MWVpczc4eTBpM2xlYQ==" className="social-linkss" target='_blank' rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
        
        <div className="copyright">
          <p>Made with < FaHeart className="heart-icon"  /> by Basit • © 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;