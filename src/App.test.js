import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { profile, experiences, skillCategories } from './data/portfolio';

test('shows current education, projects, and credential status without obsolete content', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'B.S. Computer Science' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'PhilosoStream' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Source code/ })).toHaveAttribute('href', 'https://github.com/AngelShresthaCS/philosostream');
  const architect = screen.getByRole('heading', { name: 'AWS Certified Solutions Architect' }).closest('article');
  expect(within(architect).getByText('In progress')).toBeInTheDocument();
  expect(within(architect).getByText('Expected October 23, 2026')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Verify credential/ })).toHaveLength(3);
  expect(screen.queryByText(/Computer Engineering|Soap Quality|Travis CI/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Preview placeholder/i)).not.toBeInTheDocument();
});

test('navigation opens and closes when a section is selected', () => {
  render(<App />);
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

test('company and university logos accept direct image URLs and recover from unavailable images', () => {
  const previousUniversity = profile.universityLogo;
  const previousCompany = experiences[0].logo;
  profile.universityLogo = 'https://images.example.com/university.png';
  experiences[0].logo = 'https://images.example.com/company.png';
  try {
    render(<App />);
    const university = screen.getAllByRole('img', { name: `${profile.university} logo` })[0];
    const company = screen.getByRole('img', { name: 'UTA Office of Information Technology logo' });
    expect(university).toHaveAttribute('src', profile.universityLogo);
    expect(company).toHaveAttribute('src', experiences[0].logo);
    fireEvent.error(company);
    expect(company).toHaveAttribute('src', '/images/placeholders/company-logo.svg');
  } finally {
    profile.universityLogo = previousUniversity;
    experiences[0].logo = previousCompany;
  }
});

test('every listed skill has a decorative icon and roadmap is separate from current skills', () => {
  render(<App />);
  const skills = screen.getByRole('heading', { name: 'What I work with.' }).closest('section');
  const count = skillCategories.reduce((total, category) => total + category.skills.length, 0);
  expect(skills.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(count);
  expect(screen.getByRole('region', { name: "What I'm exploring next." })).toHaveTextContent('A personal learning plan');
  expect(screen.getByRole('region', { name: "What I'm exploring next." }).querySelectorAll('details')).toHaveLength(3);
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
  const courses = screen.getByText('Courses & training').closest('details');
  expect(courses).not.toHaveAttribute('open');
  expect(within(courses).getByText('11 completed')).toBeInTheDocument();
  expect(courses.querySelectorAll('article')).toHaveLength(11);
  expect(within(courses).getByText('7F7TDA5Q2A0J')).toBeInTheDocument();
  expect(within(courses).getByText('40294036106007')).toBeInTheDocument();
  expect(within(courses).getByRole('link', { name: 'View React Basics credential', hidden: true })).toHaveAttribute('href', 'https://www.coursera.org/account/accomplishments/verify/O05MCEG33UGA');
  expect(within(courses).getAllByRole('link', { name: /^View .* credential$/, hidden: true })).toHaveLength(9);
  expect(within(courses).getByRole('link', { name: 'View Monitoring and Observability for Development and DevOps credential', hidden: true })).toHaveAttribute('href', 'https://www.coursera.org/account/accomplishments/verify/7F7TDA5Q2A0J');
  expect(within(courses).queryByRole('link', { name: 'View UR2PhD Undergraduate Research Training Course Participant credential', hidden: true })).not.toBeInTheDocument();
  expect(within(courses).queryByRole('link', { name: 'View Data Science Orientation credential', hidden: true })).not.toBeInTheDocument();
  expect(document.querySelector('.certification-grid').querySelectorAll('article')).toHaveLength(4);
});
