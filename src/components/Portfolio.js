import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaArrowRight, FaDownload, FaBars, FaTimes } from 'react-icons/fa';
import { profile, projects, experiences, certifications, skillCategories, coursework } from '../data/portfolio';
const asset = file => `${process.env.PUBLIC_URL}/images/placeholders/${file}`;
const resume = `${process.env.PUBLIC_URL}/resume.pdf`;
const navigation = ['About', 'Projects', 'Experience', 'Certifications', 'Skills', 'Contact'];
function SectionTitle({
  number,
  label,
  children
}) {
  return <div className="section-heading"><p className="eyebrow">{number} / {label}</p><h2>{children}</h2></div>;
}
function Contact() {
  const [status, setStatus] = useState('idle');
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/mlgrwdwb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      if (!response.ok) throw new Error('Unable to send');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }
  return <section id="contact"><SectionTitle number="07" label="Contact">Let’s build something useful.</SectionTitle><div className="contact-layout"><div><p className="lead">Interested in software engineering, cloud infrastructure, and applied AI opportunities. Reach out about internships, projects, or collaboration.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <FaArrowRight /></a><div className="social-links"><a href={profile.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a></div><p className="muted">Based in {profile.location}</p></div>
    <form onSubmit={submit} className="contact-form"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required placeholder="Your name" /><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /><label htmlFor="message">Message</label><textarea id="message" name="message" rows="5" required placeholder="Tell me what you have in mind." /><button className="button primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'} <FaArrowRight /></button><div role="status" aria-live="polite">{status === 'success' && <p>Thanks! Your message has been sent.</p>}{status === 'error' && <p>Could not send your message. Please try again or <a href={`mailto:${profile.email}`}>email me directly</a>.</p>}</div></form></div></section>;
}
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="App"><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="header-inner"><a className="brand" href="#home" aria-label="Angel Shrestha home">angel<span>.shrestha</span><b> / </b></a><button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FaTimes /> : <FaBars />}</button><nav id="main-navigation" aria-label="Main navigation" className={menuOpen ? 'navigation is-open' : 'navigation'}>{navigation.map(label => <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-resume" href="#resume" onClick={() => setMenuOpen(false)}>Resume <FaArrowRight /></a></nav></div></header>
    <main id="main"><section id="home" className="hero"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> Computer Science · UTA</p><h1>Hi, I’m Angel.<br />I build <span>intelligent software.</span></h1><p className="hero-description">From AI-powered applications to the cloud infrastructure behind them. I’m a Computer Science student building across backend engineering, applied AI, and reliable systems.</p><div className="button-row"><a className="button primary" href="#projects">Explore my work <FaArrowRight /></a><a className="button secondary" href={resume} target="_blank" rel="noreferrer">View resume <FaDownload /></a></div><div className="hero-facts"><span>Arlington, TX</span><span>Class of 2028</span><span>3.89 GPA</span></div></div><div className="hero-visual"><img src={asset('avatar.png')} alt="Abstract placeholder artwork with connected software and cloud layers" width="640" height="640" /><div className="visual-caption"><span>SOFTWARE / CLOUD / AI</span><span>01 — Building across the stack</span></div></div></section>
    <section id="about"><SectionTitle number="01" label="About">Curiosity, translated into systems.</SectionTitle><div className="about-layout"><div><p className="lead">I’m {profile.name}, a Computer Science student at the {profile.university}. My work connects software development, AI, and the infrastructure that keeps applications running.</p><p>In UTA’s Network Operations team, I work with hybrid infrastructure, observability, incident response, and workflow automation. My projects explore knowledge retrieval, asynchronous services, and cloud deployment.</p><p>Previously, I developed Python simulations for in-memory computing research. That experience continues to shape how I approach performance and the behavior of complex systems.</p></div><aside className="education-card"><p className="eyebrow">Education</p><h3>{profile.degree}</h3><p>{profile.university}</p><dl><div><dt>Expected graduation</dt><dd>{profile.graduation}</dd></div><div><dt>GPA</dt><dd>{profile.gpa}</dd></div><div><dt>Location</dt><dd>{profile.location}</dd></div></dl></aside></div><div className="coursework"><h3>Relevant coursework</h3><div className="tags">{coursework.map(course => <span key={course}>{course}</span>)}</div></div></section>
    <section id="projects"><SectionTitle number="02" label="Selected work">Ideas built into working systems.</SectionTitle><div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.title}><div className="project-art"><img src={asset(project.image)} alt={`${project.title} abstract preview placeholder`} width="800" height="480" loading="lazy" /><span className="image-label">Preview placeholder</span></div><div className="project-content"><p className="eyebrow">0{index + 1} / {project.category}</p><h3>{project.title}</h3><p>{project.summary}</p><ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul><div className="tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>{(project.github || project.demo) && <div className="project-links">{project.github && <a href={project.github} target="_blank" rel="noreferrer">Source code <FaArrowRight /></a>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <FaArrowRight /></a>}</div>}</div></article>)}</div></section>
    <section id="experience"><SectionTitle number="03" label="Experience">Hands-on, from research to operations.</SectionTitle><div className="timeline">{experiences.map(exp => <article className="experience-entry" key={exp.title}><p className="experience-date">{exp.period}</p><div><h3>{exp.title}</h3><p className="muted">{exp.company}</p><ul>{exp.points.map(point => <li key={point}>{point}</li>)}</ul></div></article>)}</div></section>
    <section id="certifications"><SectionTitle number="04" label="Certifications">Learning with a practical foundation.</SectionTitle><div className="certification-grid">{certifications.map(cert => <article className="certification-card" key={cert.name}><img src={asset(cert.image)} alt="" width="96" height="96" loading="lazy" /><span className={`cert-status ${cert.status === 'Earned' ? 'earned' : ''}`}>{cert.status}</span><h3>{cert.name}</h3><p>{cert.issuer}</p>{cert.date && <p className="muted">{cert.status === 'Earned' ? 'Earned' : 'Expected'} {cert.date}</p>}{cert.verification && <a href={cert.verification} target="_blank" rel="noreferrer">Verify credential <FaArrowRight /></a>}</article>)}</div></section>
    <section id="skills"><SectionTitle number="05" label="Toolkit">The tools behind the work.</SectionTitle><div className="skills-grid">{skillCategories.map(category => <article className="skill-card" key={category.title}><h3>{category.title}</h3><div className="tags">{category.skills.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></section>
    <section id="resume"><div className="resume-banner"><div><p className="eyebrow">06 / Resume</p><h2>The details, all in one place.</h2><p>Education, experience, projects, and certifications in a downloadable PDF.</p></div><div className="button-row"><a className="button secondary" href={resume} target="_blank" rel="noreferrer">Open resume <FaArrowRight /></a><a className="button primary" href={resume} download="Angel_Shrestha_Resume.pdf">Download PDF <FaDownload /></a></div></div></section><Contact /></main><footer className="site-footer"><p>© {new Date().getFullYear()} {profile.name}</p><a href="#home">Back to top ↑</a></footer></div>;
}
