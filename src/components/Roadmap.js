import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { roadmapPhases } from '../data/roadmap';
import './Roadmap.css';

// Compact summaries of the existing steps. The full learning plan stays below
// each overview, including every original topic and practical exercise.
const stageOverviews = {
  foundations: {
    title: 'Backend foundations',
    goal: 'Build reliable APIs with thoughtful data models, caching, and tests.',
    milestones: [
      { title: 'APIs & data models', focus: 'FastAPI · PostgreSQL', exercise: 'Authenticated APIs with migrations' },
      { title: 'Caching & rate limits', focus: 'Redis · Cache patterns', exercise: 'Session caching and rate limits' },
      { title: 'Testing', focus: 'pytest · Integration tests', exercise: 'API and database behavior' },
    ],
  },
  'build-deploy': {
    title: 'Build & deploy',
    goal: 'Connect delivery, cloud infrastructure, and maintainable architecture.',
    milestones: [
      { title: 'Containers & delivery', focus: 'Docker · GitHub Actions', exercise: 'A tested, deployable image' },
      { title: 'Cloud deployment', focus: 'AWS · RDS · IAM', exercise: 'A deployed service with logs' },
      { title: 'Performance & architecture', focus: 'Async Python · SOLID', exercise: 'Profiling and modular services' },
    ],
  },
  'ai-distributed': {
    title: 'AI & distributed systems',
    goal: 'Connect data, retrieval, and asynchronous services, with evaluation and observability.',
    milestones: [
      { title: 'Data & event pipelines', focus: 'NoSQL · Kafka · Neo4j', exercise: 'Events and relationship models' },
      { title: 'Retrieval & AI assistants', focus: 'Embeddings · pgvector · Tool calling', exercise: 'Document answers with citations' },
      { title: 'Observability', focus: 'Prometheus · OpenTelemetry', exercise: 'Traces, failures, and latency' },
    ],
  },
};

function getStageOverview(phase) {
  return stageOverviews[phase.id] || {
    title: phase.title,
    goal: phase.description,
    milestones: phase.steps.slice(0, 3).map(step => ({
      title: step.title,
      focus: step.topics.slice(0, 2).join(' · '),
      exercise: step.practice,
    })),
  };
}

export default function Roadmap() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-heading">
      <div className="section-heading roadmap-heading">
        <p className="eyebrow">Always learning</p>
        <h2 id="roadmap-heading">My learning roadmap</h2>
        <p className="roadmap-intro">
          What I want to explore next, with small projects to put each topic into practice.
        </p>
      </div>

      <div className="roadmap-stages">
        {roadmapPhases.map(phase => {
          const overview = getStageOverview(phase);
          const headingId = `roadmap-${phase.id}-heading`;

          return (
            <article className="roadmap-stage" key={phase.id} aria-labelledby={headingId}>
              <div className="roadmap-stage-intro">
                <h3 id={headingId}>{overview.title}</h3>
                <p>{overview.goal}</p>
              </div>
              <div className="roadmap-stage-content">
                <ul className="roadmap-milestones">
                  {overview.milestones.map(milestone => (
                    <li className="roadmap-milestone" key={milestone.title}>
                      <strong>{milestone.title}</strong>
                      <p className="roadmap-milestone-focus">{milestone.focus}</p>
                      <p className="roadmap-milestone-exercise">{milestone.exercise}</p>
                    </li>
                  ))}
                </ul>
                <details className="roadmap-details">
                  <summary aria-label={`Topics and exercises for ${overview.title}`}>
                    <span>Topics &amp; exercises</span>
                    <FiChevronDown className="roadmap-chevron" aria-hidden="true" />
                  </summary>
                  <ol className="roadmap-steps" start={Number(phase.steps[0].number)}>
                    {phase.steps.map(step => (
                      <li key={step.number}>
                        <div className="roadmap-step">
                          <div className="roadmap-step-topic">
                            <h4>{step.title}</h4>
                            <p>{step.topics.join(' · ')}</p>
                          </div>
                          <p className="roadmap-step-practice">{step.practice}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </details>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
