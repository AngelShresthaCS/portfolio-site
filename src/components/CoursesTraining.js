import React, { useId, useRef, useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiArrowUpRight, FiChevronDown } from 'react-icons/fi';
import { SiCredly, SiMeta } from 'react-icons/si';
import { training } from '../data/training';
import { getCredentialVerificationUrl } from '../utils/credentials';
import './CoursesTraining.css';

function IssuerMark({ issuer }) {
  if (issuer === 'IBM') return <span className="course-provider-mark course-provider-ibm" aria-hidden="true">IBM</span>;
  const marks = {
    Google: { Icon: FcGoogle, className: 'course-provider-google' },
    Meta: { Icon: SiMeta, className: 'course-provider-meta' },
    'Credly by Pearson': { Icon: SiCredly, className: 'course-provider-credly' },
  };
  const { Icon, className } = marks[issuer] || { Icon: FaGraduationCap, className: 'course-provider-research' };
  return <span className={'course-provider-mark ' + className} aria-hidden="true"><Icon /></span>;
}

function CourseCard({ course }) {
  const titleId = useId();
  const verification = getCredentialVerificationUrl(course);

  return (
    <article className="course-card" aria-labelledby={titleId}>
      <div className="course-card-heading">
        <IssuerMark issuer={course.issuer} />
        <h4 id={titleId}>{course.title}</h4>
      </div>
      <p className="course-metadata"><span>{course.issuer}</span><time dateTime={course.dateTime}>{course.date}</time></p>
      {course.credentialId && <p className="course-id">Credential ID: {course.credentialId}</p>}
      {verification && (
        <div className="course-card-footer">
          <a className="course-verify" href={verification} target="_blank" rel="noreferrer" aria-label={'View ' + course.title + ' credential'}>Verify <FiArrowUpRight aria-hidden="true" /></a>
        </div>
      )}
    </article>
  );
}

export default function CoursesTraining() {
  const [expanded, setExpanded] = useState(false);
  const toggleRef = useRef(null);
  const visibleCourses = expanded ? training : training.slice(0, 4);

  function toggleCourses() {
    if (!expanded) {
      setExpanded(true);
      return;
    }

    toggleRef.current?.focus({ preventScroll: true });
    setExpanded(false);
    window.requestAnimationFrame(() => {
      const toggle = toggleRef.current;
      if (!toggle || typeof toggle.scrollIntoView !== 'function') return;
      const bounds = toggle.getBoundingClientRect();
      if (bounds.top < 0 || bounds.bottom > window.innerHeight) {
        toggle.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      }
    });
  }

  return (
    <div className="course-gallery" role="region" aria-labelledby="courses-heading">
      <div className="course-gallery-header"><h3 id="courses-heading">COURSES &amp; TRAINING</h3><span className="course-count">{training.length} completed</span></div>
      <p className="course-intro">Additional coursework and research training alongside my degree.</p>
      <ul id="course-grid" className="course-grid">
        {visibleCourses.map(course => <li key={course.title}><CourseCard course={course} /></li>)}
      </ul>
      {training.length > 4 && (
        <button ref={toggleRef} type="button" className="course-show-all" aria-expanded={expanded} aria-controls="course-grid" onClick={toggleCourses}>
          {expanded ? 'Show less' : 'Show all ' + training.length} <FiChevronDown aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
