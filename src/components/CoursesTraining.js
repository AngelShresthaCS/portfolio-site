import React from 'react';
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
  return <span className={`course-provider-mark ${className}`} aria-hidden="true"><Icon /></span>;
}

export default function CoursesTraining() {
  return (
    <details className="course-archive">
      <summary className="course-archive-toggle"><span>Courses &amp; training</span><span className="course-count">{training.length} completed</span><FiChevronDown aria-hidden="true" /></summary>
      <p className="course-intro">Additional coursework and research training alongside my degree.</p>
      <ul className="course-list">
        {training.map(course => {
          const verification = getCredentialVerificationUrl(course);
          const hasDetails = Boolean(course.credentialId || course.skills.length);
          return (
            <li key={course.title}>
              <article className="course-entry">
                <IssuerMark issuer={course.issuer} />
                <div className="course-entry-copy">
                  <h3>{course.title}</h3>
                  <p className="course-metadata"><span>{course.issuer}</span><span aria-hidden="true">·</span><time dateTime={course.dateTime}>{course.date}</time></p>
                </div>
                {verification && <a className="course-verify" href={verification} target="_blank" rel="noreferrer" aria-label={`View ${course.title} credential`}>Verify <FiArrowUpRight aria-hidden="true" /></a>}
                {hasDetails && (
                  <details className="course-record">
                    <summary aria-label={`${course.title} details`}>Details <FiChevronDown aria-hidden="true" /></summary>
                    <div className="course-record-body">
                      {course.credentialId && <dl className="course-id"><dt>Credential ID</dt><dd>{course.credentialId}</dd></dl>}
                      {course.skills.length > 0 && <p className="course-skills">{course.skills.join(' · ')}</p>}
                    </div>
                  </details>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
