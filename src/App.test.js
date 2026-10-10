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

test('skills show every original technology and icon within the same six categories', () => {
  render(<App />);
  const skills = sectionWithHeading('Skills');
  const categories = within(skills).getAllByRole('article');
  expect(categories).toHaveLength(6);
  expect(within(skills).getAllByRole('heading', { level: 3 })).toHaveLength(6);
  expect(within(skills).queryByRole('button', { name: /View all skills|Show fewer skills/ })).not.toBeInTheDocument();
  skillCategories.forEach(category => {
    const article = categories.find(candidate => within(candidate).queryByRole('heading', { name: category.title }));
    expect(within(article).getByRole('heading', { name: category.title })).toBeVisible();
    expect(within(article).getAllByRole('list')).toHaveLength(1);
    expect(within(article).getAllByRole('listitem')).toHaveLength(category.skills.length);
    category.skills.forEach(skill => {
      const labels = within(article).getAllByText(skill);
      expect(labels).toHaveLength(1);
      expect(labels[0]).toBeVisible();
      expect(iconForSkill(labels[0])).toHaveAttribute('aria-hidden', 'true');
      expect(iconForSkill(labels[0])).toHaveAttribute('focusable', 'false');
    });
  });
  expect(within(skills).getAllByRole('listitem')).toHaveLength(51);
});

test('the learning tree keeps all five branches visible and every original topic and exercise reachable', () => {
  render(<App />);
  const roadmap = screen.getByRole('region', { name: 'Learning roadmap' });
  expect(within(roadmap).getAllByRole('article')).toHaveLength(5);
  ['Backend', 'Database & data', 'Cloud & DevOps', 'AI & distributed systems', 'Reliability'].forEach(branch => {
    expect(within(roadmap).getByRole('heading', { level: 3, name: branch })).toBeVisible();
  });
  expect(within(roadmap).queryByRole('heading', { name: 'Frontend' })).not.toBeInTheDocument();
  const buttons = within(roadmap).getAllByRole('button', { name: /^Explore / });
  expect(buttons).toHaveLength(16);
  expect(new Set(buttons.map(button => button.getAttribute('aria-controls'))).size).toBe(16);
  expect(within(roadmap).queryByRole('region')).not.toBeInTheDocument();
  buttons.forEach(button => expect(button).toHaveAttribute('aria-expanded', 'false'));

  roadmapPhases.flatMap(phase => phase.steps).forEach(step => {
    const button = within(roadmap).getByRole('button', { name: `Explore ${step.title}` });
    fireEvent.click(button);
    const panel = within(roadmap).getByRole('region', { name: step.title });
    expect(within(roadmap).getAllByRole('region')).toHaveLength(1);
    expect(panel).toHaveAttribute('id', button.getAttribute('aria-controls'));
    expect(within(panel).getByRole('heading', { level: 4, name: step.title })).toBeVisible();
    step.topics.forEach(topic => expect(within(panel).getByText(topic)).toBeVisible());
    expect(within(panel).getByText(step.practice)).toBeVisible();
    buttons.forEach(node => {
      expect(node).toHaveAttribute('aria-expanded', String(node === button));
    });
  });
});

test('learning topic details switch, toggle closed, and restore node focus after Close or Escape', () => {
  render(<App />);
  const roadmap = screen.getByRole('region', { name: 'Learning roadmap' });
  const firstTopic = roadmapPhases[0].steps[0].title;
  const secondTopic = roadmapPhases[1].steps[0].title;
  const first = within(roadmap).getByRole('button', { name: `Explore ${firstTopic}` });
  const second = within(roadmap).getByRole('button', { name: `Explore ${secondTopic}` });
  fireEvent.click(first);
  expect(within(roadmap).getByRole('region', { name: firstTopic })).toBeVisible();
  fireEvent.click(second);
  expect(within(roadmap).queryByRole('region', { name: firstTopic })).not.toBeInTheDocument();
  expect(first).toHaveAttribute('aria-expanded', 'false');
  expect(second).toHaveAttribute('aria-expanded', 'true');
  expect(within(roadmap).getByRole('region', { name: secondTopic })).toBeVisible();

  fireEvent.click(within(roadmap).getByRole('button', { name: 'Close topic details' }));
  expect(within(roadmap).queryByRole('region')).not.toBeInTheDocument();
  expect(second).toHaveAttribute('aria-expanded', 'false');
  expect(second).toHaveFocus();
  fireEvent.click(second);
  fireEvent.keyDown(second, { key: 'Escape' });
  expect(within(roadmap).queryByRole('region')).not.toBeInTheDocument();
  expect(second).toHaveFocus();
  fireEvent.click(second);
  fireEvent.click(second);
  expect(second).toHaveAttribute('aria-expanded', 'false');
  expect(within(roadmap).queryByRole('region')).not.toBeInTheDocument();
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

test('keeps professional credentials prominent while showing a visible four-course preview', () => {
  render(<App />);
  const courses = screen.getByRole('region', { name: 'Courses & training' });
  expect(within(courses).getByRole('heading', { level: 3, name: 'Courses & training' })).toBeVisible();
  expect(within(courses).getByText('11 completed')).toBeVisible();
  expect(within(courses).getAllByRole('article')).toHaveLength(4);
  const toggle = within(courses).getByRole('button', { name: 'Show all 11' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveAttribute('aria-controls', 'course-grid');
  expect(within(courses).getByRole('list')).toHaveAttribute('id', 'course-grid');
  training.slice(0, 4).forEach(course => {
    const article = articleWithHeading(course.title);
    expect(within(article).getByRole('heading', { name: course.title })).toBeVisible();
    expect(within(article).getByText(course.issuer, { selector: 'span:not([aria-hidden])' })).toBeVisible();
    expect(within(article).getByText(course.date)).toBeVisible();
    expect(within(article).queryByLabelText(`${course.title} details`)).not.toBeInTheDocument();
    expect(within(article).getByText(`Credential ID: ${course.credentialId}`)).toBeVisible();
  });
  training.slice(4).forEach(course => {
    expect(within(courses).queryByRole('heading', { name: course.title })).not.toBeInTheDocument();
  });
  expect(within(courses).getAllByRole('link', { name: /^View .* credential$/ })).toHaveLength(3);
  training.slice(0, 3).forEach(course => {
    expect(within(courses).getByRole('link', { name: `View ${course.title} credential` })).toHaveAttribute('href', `https://www.coursera.org/account/accomplishments/verify/${course.credentialId}`);
  });
  expect(within(articleWithHeading(training[3].title)).queryByRole('link')).not.toBeInTheDocument();
  certifications.forEach(certification => {
    const article = articleWithHeading(certification.name);
    expect(within(article).getByRole('heading', { name: certification.name })).toBeVisible();
    expect(within(article).getByText(certification.status)).toBeVisible();
  });
});

test('showing all courses preserves supplied credential links and visible IDs, and Show less retains focus', () => {
  render(<App />);
  const courses = screen.getByRole('region', { name: 'Courses & training' });
  const toggle = within(courses).getByRole('button', { name: 'Show all 11' });
  toggle.focus();
  fireEvent.click(toggle);
  expect(within(courses).getByRole('button', { name: 'Show less' })).toBe(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(toggle).toHaveAttribute('aria-controls', 'course-grid');
  expect(toggle).toHaveFocus();
  expect(within(courses).getAllByRole('article')).toHaveLength(11);
  training.forEach(course => {
    const article = articleWithHeading(course.title);
    expect(within(article).getByRole('heading', { name: course.title })).toBeVisible();
    expect(within(article).getByText(course.issuer, { selector: 'span:not([aria-hidden])' })).toBeVisible();
    expect(within(article).getByText(course.date)).toBeVisible();
    expect(within(article).queryByLabelText(`${course.title} details`)).not.toBeInTheDocument();
  });
  training.filter(course => course.credentialId).forEach(course => {
    expect(within(articleWithHeading(course.title)).getByText(`Credential ID: ${course.credentialId}`)).toBeVisible();
  });
  training.filter(course => !course.credentialId).forEach(course => {
    expect(within(articleWithHeading(course.title)).queryByText(/^Credential ID:/)).not.toBeInTheDocument();
  });
  expect(within(courses).getAllByRole('link', { name: /^View .* credential$/ })).toHaveLength(9);
  training.filter(course => course.credentialId && course.issuer !== 'Computing Research Association').forEach(course => {
    expect(within(courses).getByRole('link', { name: `View ${course.title} credential` })).toHaveAttribute('href', course.verification || `https://www.coursera.org/account/accomplishments/verify/${course.credentialId}`);
  });
  ['UR2PhD Undergraduate Research Training Course Participant', 'Data Science Orientation'].forEach(title => {
    expect(within(courses).queryByRole('link', { name: `View ${title} credential` })).not.toBeInTheDocument();
  });
  expect(within(courses).queryByText('Details')).not.toBeInTheDocument();
  training.filter(course => course.skills.length).forEach(course => {
    expect(within(articleWithHeading(course.title)).queryByText(course.skills.join(' · '))).not.toBeInTheDocument();
  });
  fireEvent.click(toggle);
  expect(toggle).toHaveAccessibleName('Show all 11');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
  expect(within(courses).getAllByRole('article')).toHaveLength(4);
  expect(within(courses).getAllByRole('link', { name: /^View .* credential$/ })).toHaveLength(3);
  training.slice(4).forEach(course => {
    expect(within(courses).queryByRole('heading', { name: course.title })).not.toBeInTheDocument();
  });
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
