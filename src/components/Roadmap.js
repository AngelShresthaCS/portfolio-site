import React, { useRef, useState } from 'react';
import {
  FiActivity, FiBox, FiCheckCircle, FiChevronRight, FiCloud, FiCpu,
  FiDatabase, FiGitBranch, FiGitMerge, FiLayers, FiMessageSquare,
  FiSearch, FiServer, FiShare2, FiSliders, FiTool, FiX, FiZap,
} from 'react-icons/fi';
import { roadmapBranches } from '../data/roadmap';
import TechnologyLabel from './TechnologyLabel';
import './Roadmap.css';

const topicIcons = {
  FiActivity, FiBox, FiCheckCircle, FiCloud, FiCpu, FiDatabase,
  FiGitBranch, FiGitMerge, FiLayers, FiMessageSquare, FiSearch,
  FiServer, FiShare2, FiSliders, FiTool, FiZap,
};

function TopicIcon({ name, ...props }) {
  const Icon = topicIcons[name] || FiGitBranch;
  return <Icon aria-hidden="true" {...props} />;
}

function SkillNode({ node, selected, onSelect, buttonRef }) {
  return (
    <button
      type="button"
      className={'roadmap-node' + (selected ? ' is-selected' : '')}
      ref={buttonRef}
      aria-label={'Explore ' + node.step.title}
      aria-expanded={selected}
      aria-controls={'roadmap-detail-' + node.id}
      onClick={onSelect}
    >
      <span className="roadmap-node-top">
        <TopicIcon name={node.icon} />
        <span className="roadmap-node-title">{node.title}</span>
        <FiChevronRight className="roadmap-node-arrow" aria-hidden="true" />
      </span>
      <span className="roadmap-node-focus">
        {node.focus.split(' · ').map((name, index) => (
          <React.Fragment key={name}>
            {index > 0 && ' · '}
            <TechnologyLabel name={name} />
          </React.Fragment>
        ))}
      </span>
    </button>
  );
}

function SkillDetailPanel({ branch, node, active, onClose }) {
  const titleId = 'roadmap-detail-title-' + node.id;
  return (
    <div
      id={'roadmap-detail-' + node.id}
      className={'roadmap-detail' + (active ? ' is-open' : '')}
      role="region"
      aria-labelledby={titleId}
      aria-hidden={!active}
      inert={!active}
    >
      <div className="roadmap-detail-inner">
        <div className="roadmap-detail-card">
          <div className="roadmap-detail-header">
            <div>
              <span className="roadmap-detail-category">
                <TopicIcon name={branch.icon} />
                {branch.title}
              </span>
              <h4 id={titleId}>{node.step.title}</h4>
            </div>
            <button type="button" className="roadmap-close" aria-label="Close topic details" onClick={onClose}>
              <FiX aria-hidden="true" />
            </button>
          </div>
          <p className="roadmap-detail-description">{node.description}</p>
          <div className="roadmap-detail-columns">
            <div>
              <h5>Tools &amp; concepts</h5>
              <ul className="roadmap-topic-chips" aria-label="Tools and concepts">
                {node.step.topics.map(topic => <li key={topic}><TechnologyLabel name={topic} /></li>)}
              </ul>
            </div>
            <div className="roadmap-build-idea">
              <h5><FiTool aria-hidden="true" /> Put it into practice</h5>
              <p>{node.step.practice}</p>
            </div>
          </div>
          <p className="roadmap-learning-stage">
            <FiGitBranch aria-hidden="true" />
            {node.phaseTitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function SkillBranch({ branch, selectedId, onSelect, onClose, nodeRefs }) {
  const headingId = 'roadmap-branch-' + branch.id;
  return (
    <article
      className="roadmap-branch"
      aria-labelledby={headingId}
      style={{
        '--branch-accent': branch.accent,
        '--branch-tint': branch.tint,
        '--branch-connector': branch.connector,
        '--node-count': branch.nodes.length,
      }}
    >
      <div className="roadmap-branch-anchor">
        <div className="roadmap-branch-title">
          <TopicIcon name={branch.icon} />
          <h3 id={headingId}>{branch.title}</h3>
        </div>
        <p>{branch.description}</p>
      </div>
      <div className="roadmap-branch-body">
        <ul className="roadmap-nodes" aria-label={branch.title + ' topics'}>
          {branch.nodes.map(node => (
            <li key={node.id}>
              <SkillNode
                node={node}
                selected={selectedId === node.id}
                buttonRef={element => { nodeRefs.current[node.id] = element; }}
                onSelect={() => onSelect(node.id)}
              />
            </li>
          ))}
        </ul>
        {branch.nodes.map(node => (
          <SkillDetailPanel
            key={node.id}
            branch={branch}
            node={node}
            active={selectedId === node.id}
            onClose={onClose}
          />
        ))}
      </div>
    </article>
  );
}

export default function Roadmap() {
  const [selectedId, setSelectedId] = useState(null);
  const nodeRefs = useRef({});
  const selectedBranch = roadmapBranches.find(branch => branch.nodes.some(node => node.id === selectedId));
  const selectedNode = selectedBranch?.nodes.find(node => node.id === selectedId);

  const closeDetails = () => {
    const button = nodeRefs.current[selectedId];
    setSelectedId(null);
    button?.focus();
  };

  const handleKeyDown = event => {
    if (event.key === 'Escape' && selectedId) {
      event.preventDefault();
      event.stopPropagation();
      closeDetails();
    }
  };

  return (
    <section id="roadmap" className="roadmap-section" aria-labelledby="roadmap-heading" onKeyDown={handleKeyDown}>
      <div className="section-heading roadmap-heading">
        <p className="eyebrow">Always learning</p>
        <h2 id="roadmap-heading">Learning roadmap</h2>
        <p className="roadmap-intro">What I want to explore next, from backend foundations to connected systems.</p>
      </div>

      <div className="roadmap-map-heading">
        <div className="roadmap-root">
          <FiGitBranch aria-hidden="true" />
          <div>
            <span>Learning plan</span>
            <strong>Building reliable systems</strong>
          </div>
        </div>
        <p className="roadmap-map-hint">Pick a topic to explore its tools and a small build idea.</p>
      </div>

      <div className="roadmap-branches">
        {roadmapBranches.map(branch => (
          <SkillBranch
            key={branch.id}
            branch={branch}
            selectedId={selectedId}
            onSelect={id => setSelectedId(current => current === id ? null : id)}
            onClose={closeDetails}
            nodeRefs={nodeRefs}
          />
        ))}
      </div>
      <div className="roadmap-announcement" role="status" aria-live="polite" aria-atomic="true">
        {selectedNode ? selectedNode.step.title + ' details opened below the ' + selectedBranch.title + ' branch.' : ''}
      </div>
    </section>
  );
}
