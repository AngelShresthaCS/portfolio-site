import React from "react";
import "./Header.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo / Name */}
        <div className="logo">Angel</div>

        {/* Navigation */}
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#resume">Resume</a>
          <a href="#experience">Experience</a>
          <a href="#leetcode">LeetCode</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Social Icons */}
        <div className="social-icons">
          <a
            href="https://github.com/angelshresthacs"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/angelshrestha"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://leetcode.com/angelshresthacs"
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
          >
            <SiLeetcode />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
