import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock window scrollTo and scrollIntoView
beforeAll(() => {
  window.scrollTo = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

test('renders Quantum vs Classical Key Distribution Laboratory title', () => {
  render(<App />);
  const headings = screen.getAllByText(/Quantum vs Classical/i);
  expect(headings.length).toBeGreaterThan(0);
});

test('renders primary laboratory navigation tabs', () => {
  render(<App />);
  const comparisonTabs = screen.getAllByRole('tab', { name: /Dual Comparison/i });
  const classicalTabs = screen.getAllByRole('tab', { name: /Classical \(RSA\/DH\)/i });
  const quantumTabs = screen.getAllByRole('tab', { name: /BB84 Quantum/i });
  
  expect(comparisonTabs.length).toBeGreaterThan(0);
  expect(classicalTabs.length).toBeGreaterThan(0);
  expect(quantumTabs.length).toBeGreaterThan(0);
});

test('renders legal modals triggers in laboratory footer', () => {
  render(<App />);
  const tosBtn = screen.getByRole('button', { name: /Terms of Service/i });
  const privacyBtn = screen.getByRole('button', { name: /Privacy Policy/i });
  const specsBtn = screen.getByRole('button', { name: /Protocol Specifications/i });

  expect(tosBtn).toBeInTheDocument();
  expect(privacyBtn).toBeInTheDocument();
  expect(specsBtn).toBeInTheDocument();
});
