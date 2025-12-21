import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: 'Hardware Engineering Intern',
      company: 'Tech Company XYZ',
      period: 'Summer 2024',
      description: [
        'Assisted in FPGA development for signal processing applications',
        'Collaborated with team on PCB design and testing',
        'Performed circuit analysis and troubleshooting'
      ]
    },
    {
      title: 'Research Assistant',
      company: 'University Lab',
      period: '2023 - Present',
      description: [
        'Working on embedded systems research project',
        'Developing sensor networks using IoT protocols',
        'Published paper on low-power microcontroller optimization'
      ]
    },
    {
      title: 'Teaching Assistant - Digital Logic',
      company: 'University Name',
      period: 'Fall 2023',
      description: [
        'Assisted professor in Digital Logic Design course',
        'Conducted lab sessions and office hours',
        'Graded assignments and provided student support'
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