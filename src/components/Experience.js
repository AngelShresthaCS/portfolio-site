import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: 'Service Desk Analyst (Tier II)',
      company: 'Office of Information Technology, The University of Texas at Arlington',
      period: 'Dec 2025 – Present',
      description: [
        'Promoted to Tier II with elevated administrative privileges to handle escalated incidents involving identity management, access control, and system reliability.',
        'Administered user accounts and security groups using Active Directory Users and Computers (ADUC) and the Microsoft Admin Portal.',
        'Resolved complex authentication, authorization, and access issues across enterprise systems.'
      ]
    },
    {
      title: 'Service Desk Analyst (Tier I)',
      company: 'Office of Information Technology, The University of Texas at Arlington',
      period: 'Jun 2025 – Dec 2025',
      description: [
        'Supported mission-critical campus infrastructure by diagnosing and resolving hardware, software, and networking issues across Linux and Windows systems.',
        'Diagnosed connectivity and uptime issues using TCP/IP fundamentals and system-level troubleshooting.',
        'Developed internal JavaScript automation to streamline operational workflows and reduce manual effort.'
      ]
    },
    {
      title: 'Undergraduate Research Assistant',
      company: 'The University of Texas at Arlington (CRA UR2PhD)',
      period: 'May 2025 – Jul 2025',
      description: [
        'Conducted research on 3D in-memory computing architectures, focusing on memory-centric computation and performance scalability.',
        'Analyzed hardware–software tradeoffs through literature review and technical proposal development.',
        'Contributed to early-stage research exploration in emerging computer architecture paradigms.'
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <h2>Experience</h2>
      <div className="experience-container">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <div className="experience-header">
              <div>
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
              </div>
              <span className="period">{exp.period}</span>
            </div>
            <ul className="experience-list">
              {exp.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
