import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'FPGA-Based Image Processor',
      description: 'Implemented real-time image processing filters on Xilinx FPGA using Verilog. Achieved 60fps processing with edge detection and blur filters.',
      image: '/images/project1.jpg',
      technologies: ['Verilog', 'FPGA', 'Xilinx Vivado', 'Image Processing'],
      github: 'https://github.com/yourusername/project1',
      demo: '#'
    },
    {
      title: 'IoT Weather Station',
      description: 'Built an IoT weather monitoring system using ESP32, various sensors, and a React dashboard for real-time data visualization.',
      image: '/images/project2.jpg',
      technologies: ['C++', 'ESP32', 'React', 'MQTT', 'Node.js'],
      github: 'https://github.com/yourusername/project2',
      demo: '#'
    },
    {
      title: 'ARM-Based Game Console',
      description: 'Designed a portable game console using ARM Cortex-M4, featuring custom PCB, LCD display, and game engine written in C.',
      image: '/images/project3.jpg',
      technologies: ['C', 'ARM', 'PCB Design', 'Embedded Systems'],
      github: 'https://github.com/yourusername/project3',
      demo: '#'
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-btn">
                  GitHub
                </a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-btn">
                  Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;