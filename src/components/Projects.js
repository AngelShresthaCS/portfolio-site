import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Social Media Platform for Book Readers',
      image: '/images/project-books.png',
      description: [
        'Designed and implemented a full-stack social platform using Django REST Framework and React.',
        'Handled over 1K API requests per day with average response latency under 120 ms.',
        'Supported 100+ concurrent authenticated user sessions during load testing.',
        'Deployed on AWS with MySQL-backed persistence and integrated monitoring for uptime and performance.'
      ],
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
      image: '/images/project-homelab.png',
      description: [
        'Built a virtualized homelab hosting 10+ services using Proxmox with isolated networking.',
        'Configured pfSense firewall and routing achieving 900+ Mbps throughput.',
        'Maintained sub-5 ms internal network latency under normal load.',
        'Implemented centralized monitoring with Zabbix and log analysis using Splunk.',
        'Achieved zero unplanned downtime through proactive monitoring and alerting.'
      ],
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
      image: '/images/project-ai.png',
      description: [
        'Developed a machine learning model using SUDS sensor data to classify soap quality.',
        'Achieved 100% accuracy in detecting defective samples during validation.',
        'Logged training and inference outputs for analysis and debugging.',
        'Project received the Best Group Presentation Award.'
      ],
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
      <div className="projects-title">
        <h2>PROJECTS</h2>
      </div>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>

            <div className="project-content">
              <h3>{project.title}</h3>

              <ul className="project-points">
                {project.description.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>

              <div className="project-technologies">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
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
