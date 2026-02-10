import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

/**
 * Unit tests for NavigationBar component
 * 
 * Tests:
 * - Component renders with all navigation links
 * - Links have correct href attributes
 * - Active page highlighting works correctly
 * 
 * Requirements: 5.1, 5.5, 5.6
 */

describe('NavigationBar', () => {
  it('should render all navigation links', () => {
    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    // Check that all navigation links are present
    expect(screen.getByText('Dashboard')).toBeDefined();
    expect(screen.getByText('Planner')).toBeDefined();
    expect(screen.getByText('About')).toBeDefined();
    expect(screen.getByText('AI Chat')).toBeDefined();
  });

  it('should render brand link', () => {
    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    expect(screen.getByText('Event Planning Platform')).toBeDefined();
  });

  it('should have correct href attributes for links', () => {
    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    const plannerLink = screen.getByText('Planner').closest('a');
    const aboutLink = screen.getByText('About').closest('a');
    const aiChatLink = screen.getByText('AI Chat').closest('a');

    expect(dashboardLink?.getAttribute('href')).toBe('/');
    expect(plannerLink?.getAttribute('href')).toBe('/planner');
    expect(aboutLink?.getAttribute('href')).toBe('/about');
    expect(aiChatLink?.getAttribute('href')).toBe('/ai-chat');
  });

  it('should highlight active page on dashboard route', () => {
    // Mock window.location for testing
    window.history.pushState({}, 'Dashboard', '/');

    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink?.className).toContain('active');
  });

  it('should apply nav-link class to all navigation links', () => {
    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    const plannerLink = screen.getByText('Planner').closest('a');
    const aboutLink = screen.getByText('About').closest('a');
    const aiChatLink = screen.getByText('AI Chat').closest('a');

    expect(dashboardLink?.className).toContain('nav-link');
    expect(plannerLink?.className).toContain('nav-link');
    expect(aboutLink?.className).toContain('nav-link');
    expect(aiChatLink?.className).toContain('nav-link');
  });
});
