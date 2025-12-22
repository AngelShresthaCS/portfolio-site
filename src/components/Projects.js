import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Social Media Platform for Book Readers',
      description:
        'Designed and implemented a full-stack social platform for book readers using RESTful APIs and a React frontend. Handled over 1K requests per day with average response latency under 120 ms and supported 100+ concurrent authenticated sessions during testing. Deployed on AWS with MySQL-backed persistence and integrated monitoring.',
      image: '/images/project-books.png',
      technologies: [
        'Django REST Framework',
        'React',
        'MySQL',
        'AWS',
        'Zabbix'
      ],
      github: 'https://github.com/angelshresthacs',
      demo: ''
    },
    {
      title: 'Networking Homelab & Self-Hosted Infrastructure',
      description:
        'Built and maintained a virtualized homelab hosting 10+ services using Proxmox with isolated networking and resource allocation. Configured pfSense firewall and routing achieving 900+ Mbps throughput with sub-5 ms internal latency. Implemented centralized monitoring and log analysis to maintain zero unplanned downtime.',
      image: '/images/project-homelab.png',
      technologies: [
        'Proxmox',
        'pfSense',
        'AWS EC2',
        'Nginx',
        'WireGuard',
        'Zabbix',
        'Splunk'
      ],
      github: 'https://github.com/angelshresthacs',
      demo: ''
    },
    {
      title: 'AI-Based Soap Quality Detection Model',
      description:
        'Developed a machine learning model using SUDS sensor data to classify soap quality for cartography-related applications. Achieved 100% accuracy in detecting defective samples during validation and logged training and inference outputs for analysis and debugging. Project received the Best Group Presentation Award.',
      image: '/images/project-ai.png',
      technologies: [
        'Python',
        'Machine Learning',
        'Sensors',
        'Data Analysis'
      ],
      github: 'https://github.com/angelshresthacs',
      demo: ''
    }
  ];

  return (
    <section id="projects" className="projects">
      {/* Centered Section Title */}
      <div className="projects-title">
        <h2>PROJECTS</h2>
      </div>

      {/* Projects Grid */}
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
                  <span key={idx} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn"
                >
                  GitHub
                </a>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn"
                  >
                    Demo
                  </a>
                )}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
