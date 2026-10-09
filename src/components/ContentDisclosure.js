import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function ContentDisclosure({ label, accessibleLabel, children, className = '' }) {
  return (
    <details className={`content-disclosure ${className}`.trim()}>
      <summary aria-label={accessibleLabel}>
        <span>{label}</span><FiChevronDown aria-hidden="true" />
      </summary>
      <div className="disclosure-content">{children}</div>
    </details>
  );
}
