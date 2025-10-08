// tests/components/BottomNav.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import BottomNav from '../../components/BottomNav';

// Helper function remains the same
const renderBottomNav = (initialRoute: string = '/') => {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <BottomNav />
    </MemoryRouter>
  );
};

describe('BottomNav Component', () => {

  it('should render all navigation links with correct paths', () => {
    renderBottomNav();

    // Assert using the CORRECT text from the component
    const servicesLink = screen.getByRole('link', { name: /сервисы/i });
    expect(servicesLink).toHaveAttribute('href', '/');

    const newsLink = screen.getByRole('link', { name: /новости/i });
    expect(newsLink).toHaveAttribute('href', '/news');

    const analyticsLink = screen.getByRole('link', { name: /аналитика/i });
    expect(analyticsLink).toHaveAttribute('href', '/analytics');
    
    const contactsLink = screen.getByRole('link', { name: /контакты/i });
    expect(contactsLink).toHaveAttribute('href', '/contacts');
  });

  it('should apply aria-current="page" to the link of the current page', () => {
    // Arrange: Simulate being on the "/analytics" page
    const analyticsRoute = '/analytics';
    renderBottomNav(analyticsRoute);

    // Act: Find the links
    const analyticsLink = screen.getByRole('link', { name: /аналитика/i });
    const servicesLink = screen.getByRole('link', { name: /сервисы/i });

    // Assert: The active link should have the aria-current attribute set to "page"
    expect(analyticsLink).toHaveAttribute('aria-current', 'page');

    // The inactive link should NOT have this attribute
    expect(servicesLink).not.toHaveAttribute('aria-current', 'page');
  });

  it('should correctly set the Services link as active on the root route', () => {
    // Arrange: Simulate being on the root "/" page
    renderBottomNav('/');

    // Act
    const servicesLink = screen.getByRole('link', { name: /сервисы/i });
    const newsLink = screen.getByRole('link', { name: /новости/i });

    // Assert
    expect(servicesLink).toHaveAttribute('aria-current', 'page');
    expect(newsLink).not.toHaveAttribute('aria-current', 'page');
  });
});
