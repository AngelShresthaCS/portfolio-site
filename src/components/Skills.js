import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['C/C++', 'Python', 'Java', 'JavaScript', 'Verilog/VHDL', 'Assembly']
    },
    {
      title: 'Hardware & Embedded',
      skills: ['Arduino', 'Raspberry Pi', 'FPGA', 'ARM Cortex', 'PCB Design', 'Microcontrollers']
    },
    {
      title: 'Software & Tools',
      skills: ['React', 'Node.js', 'Git', 'MATLAB', 'Xilinx Vivado', 'Quartus']
    },
    {
      title: 'Other Skills',
      skills: ['Digital Design', 'Circuit Analysis', 'Signal Processing', 'Linux', 'Networking', 'Database']
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