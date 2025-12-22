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
            I’m Angel Singh Shrestha, a Computer Engineering student at the University of Texas at Arlington (UTA)
            with experience across systems, networking, and software development. My background includes
            supporting mission-critical infrastructure, administering user access and identity systems, and
            building full-stack and infrastructure-focused projects.
          </p>

          <p>
            Through coursework, research, and professional roles, I’ve worked with Linux and Windows systems,
            networking fundamentals, virtualization, monitoring tools, and full-stack web technologies. I’ve
            also conducted undergraduate research in memory-centric computing, focusing on hardware–software
            tradeoffs and system scalability.
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