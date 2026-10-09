import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { profile, projects, experiences, certifications, skillCategories } from './data/portfolio';
import { roadmapPhases } from './data/roadmap';
import { training } from './data/training';

function articleWithHeading(name) {
  return screen.getAllByRole('article', { hidden: true }).find(article =>
    within(article).queryByRole('heading', { name, hidden: true })
  );
}

function sectionWithHeading(name) {
  // These existing sections have no accessible names; scope them by their headings.
  // eslint-disable-next-line testing-library/no-node-access
  return screen.getByRole('heading', { name }).closest('section');
}

function disclosureFor(summary) {
  // Native details have no queryable role; inspect their open state via the summary.
  // eslint-disable-next-line testing-library/no-node-access
  return summary.closest('details');
}

function iconForSkill(label) {
  // Decorative SVGs are deliberately excluded from the accessibility tree.
  // eslint-disable-next-line testing-library/no-node-access
  return label.closest('li').querySelector('svg');
}

test('shows current education, projects, and credential status without obsolete content', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'B.S. Computer Science' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'PhilosoStream' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Source code/ })).toHaveAttribute('href', 'https://github.com/AngelShresthaCS/philosostream');
  const architect = articleWithHeading('AWS Certified Solutions Architect');
  expect(within(architect).getByText('In progress')).toBeInTheDocument();
  expect(within(architect).getByText('Expected October 23, 2026')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Verify credential/ })).toHaveLength(3);
  expect(screen.queryByText(/Computer Engineering|Soap Quality|Travis CI/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Preview placeholder/i)).not.toBeInTheDocument();
});

test('navigation opens and closes when a section is selected', () => {
  render(<App />);
  const header = screen.getByRole('banner');
  expect(within(header).getByRole('link', { name: 'LinkedIn profile' })).toHaveAttribute('href', profile.linkedin);
  expect(within(header).getByRole('link', { name: 'GitHub profile' })).toHaveAttribute('href', profile.github);
  expect(within(header).getByRole('link', { name: 'LeetCode profile' })).toHaveAttribute('href', 'https://leetcode.com/angelshresthacs');
  const toggle = screen.getByRole('button', { name: 'Open navigation' });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'Certifications' }));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(within(screen.getByRole('navigation')).getByRole('link', { name: 'Certifications' })).toHaveAttribute('aria-current', 'location');
  fireEvent.click(toggle);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
});

test('secondary destinations remain accessible through More and Escape closes one navigation layer at a time', () => {
  render(<App />);
  const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
  const toggle = screen.getByRole('button', { name: 'Open navigation' });
  const summary = within(navigation).getByText('More');
  const more = disclosureFor(summary);
  expect(more).not.toHaveAttribute('open');
  ['About', 'Projects', 'Experience', 'Certifications', 'Resume', 'Contact'].forEach(label => {
    expect(within(navigation).getByRole('link', { name: label })).toBeVisible();
  });
  expect(within(navigation).getByRole('link', { name: 'Skills', hidden: true })).not.toBeVisible();

  fireEvent.click(toggle);
  fireEvent.click(summary);
  expect(more).toHaveAttribute('open');
  ['Skills', 'LeetCode', 'Roadmap'].forEach(label => {
    const link = within(more).getByRole('link', { name: label });
    expect(link).toHaveAttribute('href', `#${label.toLowerCase()}`);
    // Check hash destinations themselves: JSDOM does not perform anchor navigation.
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.getElementById(label.toLowerCase())).toBeInTheDocument();
  });
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(more).not.toHaveAttribute('open');
  expect(summary).toHaveFocus();
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();

  fireEvent.click(toggle);
  fireEvent.click(summary);
  fireEvent.click(within(more).getByRole('link', { name: 'Skills' }));
  expect(more).not.toHaveAttribute('open');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(within(more).getByRole('link', { name: 'Skills', hidden: true })).toHaveAttribute('aria-current', 'location');
});

test('company and university logos accept direct image URLs and recover from unavailable images', () => {
  const previousUniversity = profile.universityLogo;
  const previousCompany = experiences[0].logo;
  profile.universityLogo = 'https://images.example.com/university.png';
  experiences[0].logo = 'https://images.example.com/company.png';
  try {
    render(<App />);
    const university = screen.getAllByRole('img', { name: `${profile.university} logo` })[0];
    const operations = articleWithHeading(experiences[0].title);
    const company = within(operations).getByRole('img', { name: 'UTA Office of Information Technology logo' });
    expect(university).toHaveAttribute('src', profile.universityLogo);
    expect(company).toHaveAttribute('src', experiences[0].logo);
    fireEvent.error(company);
    expect(company).toHaveAttribute('src', '/images/placeholders/company-logo.svg');
  } finally {
    profile.universityLogo = previousUniversity;
    experiences[0].logo = previousCompany;
  }
});

test('projects expose a concise overview and retain original engineering details behind an optional disclosure', () => {
  render(<App />);
  projects.forEach(project => {
    const article = articleWithHeading(project.title);
    const summary = within(article).getByLabelText(`${project.title}: engineering details`);
    const details = disclosureFor(summary);
    expect(within(article).getByText(project.introduction)).toBeVisible();
    expect(within(article).getByText(project.highlight, { selector: 'p' })).toBeVisible();
    expect(details).not.toHaveAttribute('open');
    const featuredStack = within(article).getAllByRole('list')[0];
    expect(within(featuredStack).getAllByRole('listitem').length).toBeLessThanOrEqual(5);
    project.points.forEach(point => expect(within(details).getByText(point)).not.toBeVisible());

    fireEvent.click(summary);
    expect(details).toHaveAttribute('open');
    project.points.forEach(point => expect(within(details).getByText(point)).toBeVisible());
    project.technologies.forEach(technology => expect(within(details).getByText(technology)).toBeVisible());
    fireEvent.click(summary);
    expect(details).not.toHaveAttribute('open');
  });
  projects.filter(project => project.github).forEach(project => {
    const article = articleWithHeading(project.title);
    expect(within(article).getByRole('link', { name: /Source code/ })).toBeVisible();
  });
});

test('experience keeps dates and strongest accomplishments visible while preserving complete role details', () => {
  render(<App />);
  experiences.forEach(experience => {
    const article = articleWithHeading(experience.title);
    const summary = within(article).getByLabelText(`${experience.title}: role details`);
    const details = disclosureFor(summary);
    expect(within(article).getByText(experience.period)).toBeVisible();
    expect(within(article).getByText(experience.summary)).toBeVisible();
    experience.highlights.forEach(highlight => expect(within(article).getByText(highlight)).toBeVisible());
    expect(details).not.toHaveAttribute('open');
    experience.points.forEach(point => expect(within(details).getByText(point)).not.toBeVisible());
    fireEvent.click(summary);
    experience.points.forEach(point => expect(within(details).getByText(point)).toBeVisible());
  });
  const serviceDesk = articleWithHeading('Service Desk Analyst (Tier I)');
  expect(within(serviceDesk).getByText('June 2025 – December 2025')).toBeVisible();
  expect(screen.queryByRole('heading', { name: 'Service Desk Analyst (Tier II)' })).not.toBeInTheDocument();
});

test('skills retain their icons and complete toolkit while the additional tools start collapsed', () => {
  render(<App />);
  const skills = sectionWithHeading('My toolkit');
  const summary = within(skills).getByLabelText('More tools I work with');
  const details = disclosureFor(summary);
  expect(details).not.toHaveAttribute('open');
  skillCategories.forEach(category => {
    category.skills.forEach(skill => {
      const label = within(skills).getByText(skill);
      expect(iconForSkill(label)).toHaveAttribute('aria-hidden', 'true');
    });
    category.featuredSkills.forEach(skill => expect(within(skills).getByText(skill)).toBeVisible());
    category.skills.filter(skill => !category.featuredSkills.includes(skill)).forEach(skill => {
      expect(within(skills).getByText(skill)).not.toBeVisible();
    });
  });
  fireEvent.click(summary);
  skillCategories.forEach(category => {
    category.skills.forEach(skill => expect(within(skills).getByText(skill)).toBeVisible());
  });
});

test('the planned roadmap shows stage milestones and retains every topic and exercise in collapsed details', () => {
  render(<App />);
  const roadmap = screen.getByRole('region', { name: 'My learning roadmap' });
  expect(roadmap).toHaveTextContent('What I want to explore next');
  const stages = within(roadmap).getAllByRole('article');
  expect(stages).toHaveLength(3);
  roadmapPhases.forEach((phase, index) => {
    const stage = stages[index];
    const summary = within(stage).getByLabelText(/^Topics and exercises for/);
    const details = disclosureFor(summary);
    expect(within(stage).getByRole('heading', { level: 3 })).toBeVisible();
    const milestones = within(stage).getAllByRole('list')[0];
    expect(within(milestones).getAllByRole('listitem')).toHaveLength(3);
    expect(details).not.toHaveAttribute('open');
    phase.steps.forEach(step => {
      expect(within(details).getByRole('heading', { name: step.title, hidden: true })).not.toBeVisible();
      expect(within(details).getByText(step.topics.join(' · '))).not.toBeVisible();
      expect(within(details).getByText(step.practice)).not.toBeVisible();
    });
    fireEvent.click(summary);
    phase.steps.forEach(step => {
      expect(within(details).getByRole('heading', { name: step.title })).toBeVisible();
      expect(within(details).getByText(step.practice)).toBeVisible();
    });
  });
});

test('failed contact submissions retain the message and offer direct email', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('Offline'));
  render(<App />);
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Visitor' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'visitor@example.com' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'An internship opportunity' } });
  fireEvent.click(screen.getByRole('button', { name: /Send message/ }));
  await waitFor(() => expect(screen.getByRole('link', { name: 'email me directly' })).toHaveAttribute('href', 'mailto:angelshresthacs@gmail.com'));
  expect(screen.getByLabelText('Message')).toHaveValue('An internship opportunity');
  delete global.fetch;
});

test('keeps professional credentials prominent and includes the supplied course completions separately', () => {
  render(<App />);
  const courses = disclosureFor(screen.getByText('Courses & training'));
  expect(courses).not.toHaveAttribute('open');
  expect(within(courses).getByText('11 completed')).toBeInTheDocument();
  expect(within(courses).getAllByRole('article', { hidden: true })).toHaveLength(11);
  expect(within(courses).getByText('7F7TDA5Q2A0J')).not.toBeVisible();
  expect(within(courses).getByText('40294036106007')).toBeInTheDocument();
  expect(within(courses).getByRole('link', { name: 'View React Basics credential', hidden: true })).toHaveAttribute('href', 'https://www.coursera.org/account/accomplishments/verify/O05MCEG33UGA');
  expect(within(courses).getAllByRole('link', { name: /^View .* credential$/, hidden: true })).toHaveLength(9);
  expect(within(courses).getByRole('link', { name: 'View Monitoring and Observability for Development and DevOps credential', hidden: true })).toHaveAttribute('href', 'https://www.coursera.org/account/accomplishments/verify/7F7TDA5Q2A0J');
  expect(within(courses).queryByRole('link', { name: 'View UR2PhD Undergraduate Research Training Course Participant credential', hidden: true })).not.toBeInTheDocument();
  expect(within(courses).queryByRole('link', { name: 'View Data Science Orientation credential', hidden: true })).not.toBeInTheDocument();
  certifications.forEach(certification => {
    expect(screen.getByRole('heading', { name: certification.name })).toBeVisible();
  });

  fireEvent.click(within(courses).getByText('Courses & training'));
  training.forEach(course => {
    const article = articleWithHeading(course.title);
    expect(within(article).getByText(course.issuer, { selector: 'span:not([aria-hidden])' })).toBeVisible();
    expect(within(article).getByText(course.date)).toBeVisible();
  });
  training.filter(course => course.credentialId || course.skills.length).forEach(course => {
    const summary = within(courses).getByLabelText(`${course.title} details`);
    expect(disclosureFor(summary)).not.toHaveAttribute('open');
  });
  const monitoring = articleWithHeading(training[0].title);
  expect(within(monitoring).getByRole('link', { name: `View ${training[0].title} credential` })).toBeVisible();
  fireEvent.click(within(monitoring).getByLabelText(`${training[0].title} details`));
  expect(within(monitoring).getByText('7F7TDA5Q2A0J')).toBeVisible();
  expect(within(monitoring).getByText('Instana · System Monitoring')).toBeVisible();
});

test('restores the LeetCode stats card and keeps the profile reachable if the image fails', () => {
  render(<App />);
  const section = screen.getByRole('region', { name: 'A little problem-solving' });
  const stats = within(section).getByRole('img', { name: 'LeetCode statistics for angelshresthacs' });
  expect(stats).toHaveAttribute('src', 'https://leetcard.jacoblin.cool/angelshresthacs?theme=dark&font=Inter');
  expect(within(screen.getByRole('navigation')).getByRole('link', { name: 'LeetCode', hidden: true })).toHaveAttribute('href', '#leetcode');
  fireEvent.error(stats);
  expect(within(section).getByRole('status')).toHaveTextContent('temporarily unavailable');
  expect(within(section).getByRole('link', { name: 'View LeetCode profile' })).toHaveAttribute('href', 'https://leetcode.com/angelshresthacs');
});

test('restores an on-demand resume preview while retaining open and download links', () => {
  render(<App />);
  const about = sectionWithHeading('About me');
  expect(within(about).getByRole('article', { name: 'My resume' })).toBeVisible();
  const button = screen.getByRole('button', { name: 'Preview resume' });
  expect(screen.queryByTitle('Angel Shrestha resume preview')).not.toBeInTheDocument();
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('region', { name: 'Resume preview' })).toBeVisible();
  expect(screen.getByTitle('Angel Shrestha resume preview')).toHaveAttribute('src', '/resume.pdf');
  expect(screen.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('download', 'Angel_Shrestha_Resume.pdf');
  fireEvent.click(screen.getByRole('button', { name: 'Close preview' }));
  expect(button).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByTitle('Angel Shrestha resume preview')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Open resume' })).toHaveAttribute('href', '/resume.pdf');
  fireEvent.click(button);
  fireEvent.click(screen.getByRole('button', { name: 'Close PDF preview' }));
  expect(button).toHaveFocus();
  expect(screen.queryByRole('region', { name: 'Resume preview' })).not.toBeInTheDocument();
});
