import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        'Python',
        'C',
        'C++',
        'Java',
        'JavaScript',
        'SQL (PostgreSQL)',
        'R'
      ]
    },
    {
      title: 'Frameworks & Libraries',
      skills: [
        'React',
        'Node.js',
        'Django',
        'Django REST Framework',
        'Flask',
        'FastAPI',
        'Bootstrap',
        'pandas',
        'NumPy',
        'Matplotlib'
      ]
    },
    {
      title: 'Developer Tools & Platforms',
      skills: [
        'Git',
        'GitHub',
        'Docker',
        'Travis CI',
        'Google Cloud Platform',
        'AWS (EC2)',
        'VS Code',
        'Visual Studio',
        'PyCharm',
        'IntelliJ',
        'Eclipse',
        'Jupyter Notebook',
        'Google Colab'
      ]
    },
    {
      title: 'Cloud, Virtualization & Infrastructure',
      skills: [
        'Docker',
        'Proxmox',
        'Virtualization',
        'AWS EC2',
        'Linux System Administration',
        'User & Group Management',
        'Shell Scripting'
      ]
    },
    {
      title: 'Networking',
      skills: [
        'TCP/IP',
        'Routing',
        'Firewalls',
        'VPNs',
        'pfSense',
        'WireGuard',
        'IP Addressing',
        'Network Configuration'
      ]
    },
    {
      title: 'Databases',
      skills: [
        'PostgreSQL',
        'MySQL',
        'SQLite'
      ]
    },
    {
      title: 'Hardware & Embedded Systems',
      skills: [
        'Raspberry Pi',
        'GPIO',
        'Sensor Integration',
        'Breadboards & Wiring',
        'Basic Circuit Design',
        'Computer Architecture',
        'Memory Management'
      ]
    },
    {
      title: 'Data, Systems & CS Foundations',
      skills: [
        'Data Structures & Algorithms',
        'Data Analysis',
        'Operating Systems',
        'Memory Management',
        'Computer Architecture'
      ]
    },
    {
      title: 'Documentation, Research & Support',
      skills: [
        'Technical Documentation',
        'Academic Literature Review',
        'Proposal Writing',
        'Technical Support',
        'Troubleshooting',
        'Ticket Handling',
        'End-User Support'
      ]
    },
    {
      title: 'Design & Productivity Tools',
      skills: [
        'Microsoft Office Suite',
        'Figma',
        'Adobe Photoshop',
        'Blender (3D Modeling)'
      ]
    }
  ];

  return (
    <section id="skills" className="skills">
      <h2>Skills</h2>
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3>{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
