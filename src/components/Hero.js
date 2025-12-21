import React from "react";
import "./Hero.css";
import engineering from "./images/angel.jpg"; // replace with your image

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <span className="hero-badge">Welcome to my Portfolio</span>

          <h1 className="hero-title">
            Hi! I’m <br />
            <span className="accent">Angel</span>{" "}
            <span className="cursor">|</span>
          </h1>

          <p className="hero-description">
            Computer Engineering student focused on low-level systems,
            embedded design, and software that respects the hardware it runs
            on. I like building things that actually work.
          </p>

          <a href="#contact" className="hero-link">
            Let’s Connect <span>→</span>
          </a>
        </div>

        {/* RIGHT VISUAL */}
        <div className="hero-right">
          <div className="planet-glow" />
          <img
            src={engineering}
            alt="Astronaut illustration"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
