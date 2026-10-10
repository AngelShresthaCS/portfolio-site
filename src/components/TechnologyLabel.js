import SkillIcon from './SkillIcon';
import './TechnologyLabel.css';

// Keep the label readable; the shared icon resolver handles aliases and fallbacks.
export default function TechnologyLabel({ name }) {
  return (
    <span className="technology-label">
      <SkillIcon name={name} className="technology-icon" />
      <span>{name}</span>
    </span>
  );
}
