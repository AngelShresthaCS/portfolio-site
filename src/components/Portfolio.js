import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaArrowRight, FaArrowUp, FaDownload, FaBars, FaTimes, FaRegFilePdf } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { FiChevronDown } from 'react-icons/fi';
import { profile, projects, experiences, certifications, skillCategories, coursework } from '../data/portfolio';
import PortfolioImage from './PortfolioImage';
import SkillIcon from './SkillIcon';
import Roadmap from './Roadmap';
import CoursesTraining from './CoursesTraining';
import LeetCodeStats from './LeetCodeStats';
import ContentDisclosure from './ContentDisclosure';

const resume = `${process.env.PUBLIC_URL}/resume.pdf`;
const navigation = ['About', 'Projects', 'Experience', 'Certifications', 'Resume', 'Contact'];
const secondaryNavigation = ['Skills', 'LeetCode', 'Roadmap'];
const leetcodeProfile = `https://leetcode.com/${encodeURIComponent(profile.leetcodeUsername)}`;

function SectionTitle({ children }) {
  return (
    <div className="section-heading">
      <h2>{children}</h2>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const toggle = useRef(null);
  const more = useRef(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section, #resume')];
    let frame = null;
    const updateCurrentSection = () => {
      frame = null;
      const marker = document.querySelector('.site-header').getBoundingClientRect().bottom + 40;
      const current = sections.filter(section => section.getBoundingClientRect().top <= marker).pop();
      if (current) setActiveSection(current.id);
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateCurrentSection);
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = event => {
      if (event.key !== 'Escape') return;
      if (more.current?.open) {
        more.current.open = false;
        more.current.querySelector('summary')?.focus();
      } else if (menuOpen) {
        setMenuOpen(false); toggle.current?.focus();
      }
    };
    const closeOnResize = () => { if (window.innerWidth > 1120) setMenuOpen(false); };
    const closeOnOutsideClick = event => {
      if (more.current && !more.current.contains(event.target)) more.current.open = false;
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsideClick);
    window.addEventListener('resize', closeOnResize);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      window.removeEventListener('resize', closeOnResize);
    };
  }, [menuOpen]);

  function selectSection(section) {
    setActiveSection(section); setMenuOpen(false);
    if (more.current) more.current.open = false;
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" onClick={() => selectSection('home')} aria-label="Angel Shrestha home">Angel<span>.Shrestha</span><b>.</b></a>
        <button ref={toggle} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
        <nav id="main-navigation" aria-label="Main navigation" className={`navigation${menuOpen ? ' is-open' : ''}`}>
          {navigation.map(label => {
            const id = label.toLowerCase();
            return <a key={id} className={id === 'resume' ? 'nav-resume' : undefined} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => selectSection(id)}>{label}</a>;
          })}
          <details ref={more} className={`nav-more${secondaryNavigation.some(label => label.toLowerCase() === activeSection) ? ' is-current' : ''}`}>
            <summary>More <FiChevronDown aria-hidden="true" /></summary>
            <div className="secondary-navigation">
              {secondaryNavigation.map(label => {
                const id = label.toLowerCase();
                return <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => selectSection(id)}>{label}</a>;
              })}
            </div>
          </details>
        </nav>
        <div className="navbar-social" aria-label="Social profiles">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><FaLinkedin aria-hidden="true" /></a>
          <a href={leetcodeProfile} target="_blank" rel="noreferrer" aria-label="LeetCode profile" title="LeetCode"><SiLeetcode aria-hidden="true" /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub"><FaGithub aria-hidden="true" /></a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <p className="hero-greeting">Hi, I’m</p>
        <h1>Angel <span>Shrestha.</span></h1>
        <p className="hero-focus">Software engineering, cloud infrastructure &amp; applied AI.</p>
        <p className="hero-description">I’m a Computer Science student at UT Arlington, building reliable applications and the systems behind them.</p>
        <div className="button-row">
          <a className="button primary" href="#projects">Explore projects <FaArrowRight aria-hidden="true" /></a>
          <a className="button secondary" href={resume} target="_blank" rel="noreferrer">View resume <FaDownload aria-hidden="true" /></a>
        </div>
        <ul className="hero-facts"><li>{profile.location}</li><li>Class of {profile.graduation.split(' ')[1]}</li></ul>
      </div>
      <figure className="hero-visual">
        <PortfolioImage source={profile.heroImage} fallback="hero.svg" alt="Illustrated portrait of Angel Shrestha" width="640" height="640" />
        <figcaption className="visual-caption">Computer Science · UT Arlington</figcaption>
      </figure>
    </section>
  );
}

function About() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const preview = useRef(null);
  const previewButton = useRef(null);
  useEffect(() => {
    if (previewOpen) preview.current?.scrollIntoView?.({ block: 'start' });
  }, [previewOpen]);
  function closePreview() {
    setPreviewOpen(false);
    previewButton.current?.focus();
  }
  return (
    <section id="about">
      <SectionTitle>About me</SectionTitle>
      <div className="about-layout">
        <div className="about-copy">
          <p className="lead">I’m {profile.name}, a Computer Science student at the {profile.university}, interested in how software, AI, and infrastructure fit together.</p>
          <p>At UTA’s Network Operations team, I work on hybrid infrastructure, incident response, and automation. Outside work, I build knowledge retrieval tools and run a cloud homelab.</p>
          <div className="coursework"><h3>What I’m studying</h3><div className="tags">{coursework.map(course => <span key={course}>{course}</span>)}</div></div>
        </div>
        <div className="about-sidebar">
          <Resume previewOpen={previewOpen} previewButton={previewButton} onToggle={() => setPreviewOpen(!previewOpen)} />
          <aside className="education-card">
            <div className="organization-heading">
              <PortfolioImage className="organization-logo" source={profile.universityLogo} fallback="university-logo.svg" alt={`${profile.university} logo`} width="64" height="64" loading="lazy" />
              <div><p className="eyebrow">Education</p><h3>{profile.degree}</h3></div>
            </div>
            <p>{profile.university}</p>
            <dl><div><dt>Expected graduation</dt><dd>{profile.graduation}</dd></div><div><dt>GPA</dt><dd>{profile.gpa}</dd></div><div><dt>Location</dt><dd>{profile.location}</dd></div></dl>
          </aside>
        </div>
      </div>
      <div ref={preview} id="resume-preview" className="resume-preview" role="region" aria-label="Resume preview" hidden={!previewOpen}>
        {previewOpen && <iframe src={resume} title="Angel Shrestha resume preview" className="resume-frame" />}
        <div className="button-row"><a className="button secondary compact-button" href={resume} target="_blank" rel="noreferrer">Open the PDF in a new tab <FaArrowRight aria-hidden="true" /></a><button type="button" className="button secondary compact-button" onClick={closePreview}>Close PDF preview <FaTimes aria-hidden="true" /></button></div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects">
      <SectionTitle>A few things I’ve built</SectionTitle>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <div className="project-art"><PortfolioImage source={project.image} fallback={index === 0 ? 'philosostream.svg' : 'homelab.svg'} alt={`${project.title} project preview`} width="800" height="480" loading="lazy" /></div>
            <div className="project-content">
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3><p className="project-introduction">{project.introduction || project.summary}</p>
              <p className="project-highlight">{project.highlight || project.points[0]}</p>
              <ul className="project-stack">{(project.featuredTechnologies || project.technologies.slice(0, 4)).map(tech => <li key={tech}><SkillIcon name={tech} />{tech}</li>)}</ul>
              {(project.github || project.demo) && <div className="project-links">{project.github && <a className="button secondary compact-button" href={project.github} target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> Source code <FaArrowRight aria-hidden="true" /></a>}{project.demo && <a className="button primary compact-button" href={project.demo} target="_blank" rel="noreferrer">Live demo <FaArrowRight aria-hidden="true" /></a>}</div>}
              <ContentDisclosure label="Engineering details" accessibleLabel={`${project.title}: engineering details`}>
                <p>{project.summary}</p>
                <ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul>
                <h4>Full stack</h4>
                <div className="tags">{project.technologies.map(tech => <span key={tech}><SkillIcon name={tech} />{tech}</span>)}</div>
              </ContentDisclosure>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience">
      <SectionTitle>My experience</SectionTitle>
      <div className="timeline">{experiences.map(exp => (
        <article className="experience-entry" key={exp.title}>
          <div className="experience-heading">
            <PortfolioImage className="organization-logo" source={exp.logo} fallback="company-logo.svg" alt={exp.logoAlt || `${exp.company} logo`} width="48" height="48" loading="lazy" />
            <div className="experience-position"><h3>{exp.title}</h3><p>{exp.company}</p></div>
            <p className="experience-date">{exp.period}</p>
          </div>
          <div className="experience-body">
            <p className="experience-summary">{exp.summary || exp.points[0]}</p>
            {exp.highlights && <ul className="experience-highlights">{exp.highlights.map(point => <li key={point}>{point}</li>)}</ul>}
            {exp.tools && <ul className="experience-tools">{exp.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>}
            <ContentDisclosure label="More about this role" accessibleLabel={`${exp.title}: role details`}>
              <ul>{exp.points.map(point => <li key={point}>{point}</li>)}</ul>
            </ContentDisclosure>
          </div>
        </article>
      ))}</div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications">
      <SectionTitle>Certifications &amp; learning</SectionTitle>
      <div className="certification-grid">{certifications.map(cert => (
        <article className="certification-card" key={cert.name}>
          <PortfolioImage source={cert.image} fallback={cert.fallbackImage || 'aws-cloud.svg'} alt="" width="96" height="96" loading="lazy" />
          <span className={`cert-status ${cert.status === 'Earned' ? 'earned' : ''}`}>{cert.status}</span>
          <h3>{cert.name}</h3><p>{cert.issuer}</p>
          {cert.date && <p className="muted">{cert.status === 'Earned' ? 'Earned' : 'Expected'} {cert.date}</p>}
          {cert.credentialId && <dl className="certification-id"><dt>Credential ID</dt><dd>{cert.credentialId}</dd></dl>}
          {cert.verification && <a className="button secondary compact-button" href={cert.verification} target="_blank" rel="noreferrer">Verify credential <FaArrowRight aria-hidden="true" /></a>}
        </article>
      ))}</div>
      <CoursesTraining />
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <SectionTitle>My toolkit</SectionTitle>
      <p className="section-intro">The tools I use to build applications, run infrastructure, and understand systems.</p>
      <div className="skills-grid">{skillCategories.map(category => (
        <article className="skill-card" key={category.title}>
          <h3>{category.title}</h3>
          <ul className="skill-list">{(category.featuredSkills || category.skills.slice(0, 4)).map(skill => <li key={skill}><SkillIcon name={skill} /><span>{skill}</span></li>)}</ul>
        </article>
      ))}</div>
      <ContentDisclosure label="More tools I work with" accessibleLabel="More tools I work with" className="toolkit-details">
        <div className="skills-grid additional-skills">{skillCategories.map(category => {
          const featured = category.featuredSkills || category.skills.slice(0, 4);
          const additional = category.skills.filter(skill => !featured.includes(skill));
          return additional.length > 0 && <div key={category.title}><h3>{category.title}</h3><ul className="skill-list">{additional.map(skill => <li key={skill}><SkillIcon name={skill} /><span>{skill}</span></li>)}</ul></div>;
        })}</div>
      </ContentDisclosure>
    </section>
  );
}

function Resume({ previewOpen, previewButton, onToggle }) {
  return (
    <article id="resume" className="resume-card" aria-labelledby="resume-title">
        <div className="resume-card-heading"><FaRegFilePdf aria-hidden="true" /><h3 id="resume-title">My resume</h3></div>
        <p>Want the quick version? My education, experience, and projects in one PDF.</p>
        <div className="button-row">
          <a className="button primary compact-button" href={resume} download="Angel_Shrestha_Resume.pdf">Download PDF <FaDownload aria-hidden="true" /></a>
          <button ref={previewButton} type="button" className="button secondary compact-button" aria-expanded={previewOpen} aria-controls="resume-preview" onClick={onToggle}>{previewOpen ? 'Close preview' : 'Preview resume'} {previewOpen ? <FaTimes aria-hidden="true" /> : <FaArrowRight aria-hidden="true" />}</button>
          <a className="text-action" href={resume} target="_blank" rel="noreferrer">Open resume <FaArrowRight aria-hidden="true" /></a>
        </div>
    </article>
  );
}

function Contact() {
  const [status, setStatus] = useState('idle');
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/mlgrwdwb', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error('Unable to send');
      form.reset(); setStatus('success');
    } catch { setStatus('error'); }
  }
  return (
    <section id="contact">
      <SectionTitle>Let’s connect</SectionTitle>
      <div className="contact-layout">
        <div><p className="lead">Have an internship opportunity or a project in mind? I’d be happy to hear about it.</p><a className="button secondary email-link" href={`mailto:${profile.email}`}>{profile.email} <FaArrowRight aria-hidden="true" /></a><div className="social-links"><a className="button secondary compact-button" href={profile.github} target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> GitHub</a><a className="button secondary compact-button" href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin aria-hidden="true" /> LinkedIn</a><a className="button secondary compact-button" href={leetcodeProfile} target="_blank" rel="noreferrer"><SiLeetcode aria-hidden="true" /> LeetCode</a></div><p className="muted">Based in {profile.location}</p></div>
        <form onSubmit={submit} className="contact-form">
          <label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required placeholder="Your name" />
          <label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          <label htmlFor="message">Message</label><textarea id="message" name="message" rows="5" required placeholder="Tell me what you have in mind." />
          <button className="button primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'} <FaArrowRight aria-hidden="true" /></button>
          <div role="status" aria-live="polite">{status === 'success' && <p>Thanks! Your message has been sent.</p>}{status === 'error' && <p>Could not send your message. Please try again or <a href={`mailto:${profile.email}`}>email me directly</a>.</p>}</div>
        </form>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="App">
      <a className="skip-link" href="#main">Skip to content</a><Header />
      <main id="main"><Hero /><About /><Projects /><Experience /><Certifications /><Skills /><LeetCodeStats /><Roadmap /><Contact /></main>
      <footer className="site-footer"><p>© {new Date().getFullYear()} {profile.name}</p><a className="button secondary compact-button" href="#home">Back to top <FaArrowUp aria-hidden="true" /></a></footer>
    </div>
  );
}
