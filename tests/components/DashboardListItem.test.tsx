// tests/components/DashboardListItem.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import DashboardListItem from '../../components/DashboardListItem';
import type { DashboardItem } from '../../types'; // Import the type for clarity

// Mock Icon Component for testing purposes
const MockIcon = () => <svg data-testid="mock-icon" />;

describe('DashboardListItem Component', () => {

  it('should render the title and icon from the item prop', () => {
    // 1. Arrange: Create a mock 'item' object that matches the component's expected structure
    const mockItem: DashboardItem = {
      id: 'contacts-1',
      title: 'Всего контактов',
      path: '/contacts',
      icon: MockIcon,
      // The component doesn't render value or unit, so we can omit them
      // or include them to match the type.
    };

    // 2. Act: Render the component, passing the 'item' object as a single prop
    render(
      <BrowserRouter>
        <DashboardListItem item={mockItem} />
      </BrowserRouter>
    );

    // 3. Assert: Check if the content is visible
    expect(screen.getByText('Всего контактов')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('should be a link pointing to the correct path from the item prop', () => {
    // Arrange
    const mockItem: DashboardItem = {
      id: 'budget-1',
      title: 'Бюджет',
      path: '/budget',
      icon: MockIcon,
    };

    // Act
    render(
      <BrowserRouter>
        <DashboardListItem item={mockItem} />
      </BrowserRouter>
    );

    // Assert: Find the link and check its 'href' attribute
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/budget');
  });
});
