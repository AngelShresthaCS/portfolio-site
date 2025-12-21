import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <h2>About Me</h2>
      <div className="about-container">
        <div className="about-image">
          <img src="/images/profile.jpg" alt="Profile" />
        </div>
        <div className="about-text">
          <p>
            I'm Angel Singh Shrestha, a Computer Engineering student at the University of Texas At Arlington (UTA) with a passion for 
            both hardware and software. My interests lie in embedded systems, digital design, 
            and creating efficient solutions that bridge the gap between software and hardware.
          </p>
          <p>
            Throughout my academic journey, I've worked on various projects involving 
            microcontrollers, FPGA programming, circuit design, and full-stack development. 
            I'm always eager to learn new technologies and apply them to real-world problems.
          </p>
          <div className="about-info">
            <div className="info-item">
              <strong>Email:</strong> your.email@example.com
            </div>
            <div className="info-item">
              <strong>Location:</strong> City, State
            </div>
            <div className="info-item">
              <strong>Education:</strong> BS in Computer Engineering
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;