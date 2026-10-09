import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

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
});

test('navigation opens and closes when a section is selected', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: 'Open navigation' });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'Certifications' }));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
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
