import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { roadmapPhases } from '../data/roadmap';
import './Roadmap.css';

export default function Roadmap() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-heading">
      <div className="section-heading roadmap-heading">
        <p className="eyebrow">06 / Learning roadmap</p>
        <h2 id="roadmap-heading">What I'm exploring next.</h2>
        <p className="roadmap-intro">
          A personal learning plan across backend engineering, cloud, and applied AI.
          Each topic leads to something I can build, test, and understand more deeply.
        </p>
      </div>

      <div className="roadmap-phases">
        {roadmapPhases.map((phase, index) => (
          <details className="roadmap-phase" key={phase.id} open={index === 0}>
            <summary>
              <span className="roadmap-phase-number" aria-hidden="true">0{index + 1}</span>
              <span className="roadmap-phase-title">{phase.title}</span>
              <span className="roadmap-phase-range">Steps {phase.range}</span>
              <FiChevronDown className="roadmap-chevron" aria-hidden="true" />
            </summary>
            <div className="roadmap-phase-content">
              <p className="roadmap-phase-description">{phase.description}</p>
              <ol className="roadmap-steps" start={Number(phase.steps[0].number)}>
                {phase.steps.map(step => (
                  <li className="roadmap-step" key={step.number}>
                    <span className="roadmap-step-number" aria-hidden="true">{step.number}</span>
                    <div className="roadmap-step-topic">
                      <h3>{step.title}</h3>
                      <p>{step.topics.join(' · ')}</p>
                    </div>
                    <p className="roadmap-step-practice">
                      <span>Practice</span>
                      {step.practice}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </details>
        ))}
      </div>
      <p className="roadmap-note">The plan will evolve with what I learn and build.</p>
    </section>
  );
}
