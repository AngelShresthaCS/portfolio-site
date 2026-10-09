import React from 'react';
import { FaArrowRight, FaGraduationCap, FaAward } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { SiGoogle, SiMeta } from 'react-icons/si';
import { training } from '../data/training';
import { getCredentialVerificationUrl } from '../utils/credentials';

function IssuerMark({ issuer }) {
  if (issuer === 'IBM') return <span className="training-issuer-mark" aria-hidden="true">IBM</span>;
  const Icon = issuer === 'Google' ? SiGoogle : issuer === 'Meta' ? SiMeta : issuer === 'Credly by Pearson' ? FaAward : FaGraduationCap;
  return <span className="training-issuer-mark" aria-hidden="true"><Icon /></span>;
}

export default function CoursesTraining() {
  return (
    <details className="training-disclosure">
      <summary><span>Courses &amp; training</span><span className="training-count">{training.length} completed</span><FiChevronDown aria-hidden="true" /></summary>
      <p className="training-intro">Additional coursework and research training completed alongside my degree.</p>
      <ul className="training-list">
        {training.map(course => {
          const verification = getCredentialVerificationUrl(course);
          return (
            <li key={course.title}>
              <article className="training-entry">
                <div className="training-entry-heading"><IssuerMark issuer={course.issuer} /><div><h3>{course.title}</h3><p>{course.issuer} <span aria-hidden="true">·</span> <time dateTime={course.dateTime}>{course.date}</time></p></div></div>
                {course.credentialId && <dl className="training-id"><dt>Credential ID</dt><dd>{course.credentialId}</dd></dl>}
                {course.skills.length > 0 && <p className="training-skills">{course.skills.join(' · ')}</p>}
                {verification && <a className="training-link" href={verification} target="_blank" rel="noreferrer" aria-label={`View ${course.title} credential`}>View credential <FaArrowRight aria-hidden="true" /></a>}
              </article>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
