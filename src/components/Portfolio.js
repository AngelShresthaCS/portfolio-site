import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaArrowRight, FaArrowUp, FaDownload, FaBars, FaTimes } from 'react-icons/fa';
import { profile, projects, experiences, certifications, skillCategories, coursework } from '../data/portfolio';
import PortfolioImage from './PortfolioImage';
import SkillIcon from './SkillIcon';
import Roadmap from './Roadmap';
import CoursesTraining from './CoursesTraining';

const resume = `${process.env.PUBLIC_URL}/resume.pdf`;
const navigation = ['About', 'Projects', 'Experience', 'Certifications', 'Skills', 'Roadmap', 'Contact'];

function SectionTitle({ number, label, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{number} / {label}</p>
      <h2>{children}</h2>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const toggle = useRef(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section')];
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
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = event => {
      if (event.key === 'Escape') { setMenuOpen(false); toggle.current?.focus(); }
    };
    const closeOnResize = () => { if (window.innerWidth > 1180) setMenuOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnResize);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnResize);
    };
  }, [menuOpen]);

  function selectSection(section) { setActiveSection(section); setMenuOpen(false); }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" onClick={() => selectSection('home')} aria-label="Angel Shrestha home">angel<span>.shrestha</span><b> / </b></a>
        <button ref={toggle} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
        <nav id="main-navigation" aria-label="Main navigation" className={`navigation${menuOpen ? ' is-open' : ''}`}>
          {navigation.map(label => {
            const id = label.toLowerCase();
            return <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => selectSection(id)}>{label}</a>;
          })}
          <a className="nav-resume" href="#resume" aria-current={activeSection === 'resume' ? 'location' : undefined} onClick={() => selectSection('resume')}>Resume <FaArrowRight aria-hidden="true" /></a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Computer Science · UT Arlington</p>
        <h1>Angel<br /><span>Shrestha.</span></h1>
        <p className="hero-focus">Software engineering. Cloud infrastructure. Applied AI.</p>
        <p className="hero-description">I build applications and the systems behind them. Currently studying Computer Science at UTA and working in Network Operations.</p>
        <div className="button-row">
          <a className="button primary" href="#projects">View projects <FaArrowRight aria-hidden="true" /></a>
          <a className="button secondary" href={resume} target="_blank" rel="noreferrer">View resume <FaDownload aria-hidden="true" /></a>
        </div>
        <div className="hero-facts"><span>{profile.location}</span><span>Class of {profile.graduation.split(' ')[1]}</span><span>{profile.gpa} GPA</span></div>
      </div>
      <figure className="hero-visual">
        <PortfolioImage source={profile.heroImage} fallback="hero.svg" alt="Illustrated portrait of Angel Shrestha" width="640" height="640" />
        <figcaption className="visual-caption"><span>Angel Singh Shrestha</span><span>Arlington, TX</span></figcaption>
      </figure>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <SectionTitle number="01" label="About">A little background.</SectionTitle>
      <div className="about-layout">
        <div>
          <p className="lead">I’m {profile.name}, a Computer Science student at the {profile.university}. I’m interested in how software, AI, and infrastructure fit together.</p>
          <p>In UTA’s Network Operations team, I work with hybrid infrastructure, observability, incident response, and workflow automation. Outside work, I build knowledge retrieval tools and run a cloud infrastructure homelab.</p>
          <p>Previously, I developed Python simulations for in-memory computing research, exploring how architecture affects system performance.</p>
        </div>
        <aside className="education-card">
          <div className="organization-heading">
            <PortfolioImage className="organization-logo" source={profile.universityLogo} fallback="university-logo.svg" alt={`${profile.university} logo`} width="64" height="64" loading="lazy" />
            <div><p className="eyebrow">Education</p><h3>{profile.degree}</h3></div>
          </div>
          <p>{profile.university}</p>
          <dl><div><dt>Expected graduation</dt><dd>{profile.graduation}</dd></div><div><dt>GPA</dt><dd>{profile.gpa}</dd></div><div><dt>Location</dt><dd>{profile.location}</dd></div></dl>
        </aside>
      </div>
      <div className="coursework"><h3>Relevant coursework</h3><div className="tags">{coursework.map(course => <span key={course}>{course}</span>)}</div></div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects">
      <SectionTitle number="02" label="Selected work">Projects.</SectionTitle>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <div className="project-art"><PortfolioImage source={project.image} fallback={index === 0 ? 'philosostream.svg' : 'homelab.svg'} alt={`${project.title} project preview`} width="800" height="480" loading="lazy" /></div>
            <div className="project-content">
              <p className="eyebrow">0{index + 1} / {project.category}</p>
              <h3>{project.title}</h3><p>{project.summary}</p>
              <ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul>
              <div className="tags">{project.technologies.map(tech => <span key={tech}><SkillIcon name={tech} />{tech}</span>)}</div>
              {(project.github || project.demo) && <div className="project-links">{project.github && <a href={project.github} target="_blank" rel="noreferrer">Source code <FaArrowRight aria-hidden="true" /></a>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <FaArrowRight aria-hidden="true" /></a>}</div>}
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
      <SectionTitle number="03" label="Experience">Where I’ve worked.</SectionTitle>
      <div className="timeline">{experiences.map(exp => (
        <article className="experience-entry" key={exp.title}>
          <p className="experience-date">{exp.period}</p>
          <div>
            <div className="organization-heading">
              <PortfolioImage className="organization-logo" source={exp.logo} fallback="company-logo.svg" alt={exp.logoAlt || `${exp.company} logo`} width="56" height="56" loading="lazy" />
              <div><h3>{exp.title}</h3><p className="muted">{exp.company}</p></div>
            </div>
            <ul>{exp.points.map(point => <li key={point}>{point}</li>)}</ul>
          </div>
        </article>
      ))}</div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications">
      <SectionTitle number="04" label="Certifications">Credentials &amp; continued learning.</SectionTitle>
      <div className="certification-grid">{certifications.map(cert => (
        <article className="certification-card" key={cert.name}>
          <PortfolioImage source={cert.image} fallback="aws-cloud.svg" alt="" width="96" height="96" loading="lazy" />
          <span className={`cert-status ${cert.status === 'Earned' ? 'earned' : ''}`}>{cert.status}</span>
          <h3>{cert.name}</h3><p>{cert.issuer}</p>
          {cert.date && <p className="muted">{cert.status === 'Earned' ? 'Earned' : 'Expected'} {cert.date}</p>}
          {cert.verification && <a href={cert.verification} target="_blank" rel="noreferrer">Verify credential <FaArrowRight aria-hidden="true" /></a>}
        </article>
      ))}</div>
      <CoursesTraining />
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <SectionTitle number="05" label="Toolkit">What I work with.</SectionTitle>
      <div className="skills-grid">{skillCategories.map(category => (
        <article className="skill-card" key={category.title}>
          <h3>{category.title}</h3>
          <ul className="skill-list">{category.skills.map(skill => <li key={skill}><SkillIcon name={skill} /><span>{skill}</span></li>)}</ul>
        </article>
      ))}</div>
    </section>
  );
}

function Resume() {
  return (
    <section id="resume">
      <div className="resume-banner">
        <div><p className="eyebrow">07 / Resume</p><h2>On paper.</h2><p>Education, experience, projects, and certifications in one PDF.</p></div>
        <div className="button-row"><a className="button secondary" href={resume} target="_blank" rel="noreferrer">Open resume <FaArrowRight aria-hidden="true" /></a><a className="button primary" href={resume} download="Angel_Shrestha_Resume.pdf">Download PDF <FaDownload aria-hidden="true" /></a></div>
      </div>
    </section>
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
      <SectionTitle number="08" label="Contact">Let’s talk.</SectionTitle>
      <div className="contact-layout">
        <div><p className="lead">Have an internship opportunity or a project in mind? I’d be happy to hear about it.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <FaArrowRight aria-hidden="true" /></a><div className="social-links"><a href={profile.github} target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin aria-hidden="true" /> LinkedIn</a></div><p className="muted">Based in {profile.location}</p></div>
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
      <main id="main"><Hero /><About /><Projects /><Experience /><Certifications /><Skills /><Roadmap /><Resume /><Contact /></main>
      <footer className="site-footer"><p>© {new Date().getFullYear()} {profile.name}</p><a href="#home">Back to top <FaArrowUp aria-hidden="true" /></a></footer>
    </div>
  );
}
