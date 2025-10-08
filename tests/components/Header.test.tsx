// tests/components/Header.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '../../contexts/ThemeContext';
import { AuthProvider } from '../../contexts/AuthContext';
import Header from '../../components/Header';

// Helper to render the Header with all necessary providers and props
const renderHeader = (props: { title: string; showBackButton: boolean }) => {
  const mockOnMenuClick = () => {}; // Mock function for the prop
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Header
            title={props.title}
            onMenuClick={mockOnMenuClick}
            showBackButton={props.showBackButton}
          />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {

  it('should render a text title when the title is NOT "Законодательное собрание"', () => {
    // Arrange
    const testTitle = 'Панель управления';
    renderHeader({ title: testTitle, showBackButton: false });

    // Assert: Check for an h1 with the correct text
    const headingElement = screen.getByRole('heading', { name: testTitle, level: 1 });
    expect(headingElement).toBeInTheDocument();

    // Assert: The logo image should NOT be present
    const logoImage = screen.queryByAltText('Логотип приложения');
    expect(logoImage).not.toBeInTheDocument();
  });

  it('should render the logo image when the title IS "Законодательное собрание"', () => {
    // Arrange
    const specialTitle = 'Законодательное собрание';
    renderHeader({ title: specialTitle, showBackButton: false });

    // Assert: The logo image SHOULD be present
    const logoImage = screen.getByAltText('Логотип приложения');
    expect(logoImage).toBeInTheDocument();

    // Assert: There should be no h1 title element
    const headingElement = screen.queryByRole('heading', { level: 1 });
    expect(headingElement).not.toBeInTheDocument();
  });

  it('should render the menu button when showBackButton is false', () => {
    // Arrange
    renderHeader({ title: 'Any Title', showBackButton: false });

    // Assert
    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    expect(menuButton).toBeInTheDocument();

    const backButton = screen.queryByRole('button', { name: 'Назад' });
    expect(backButton).not.toBeInTheDocument();
  });

  it('should render the back button when showBackButton is true', () => {
    // Arrange
    renderHeader({ title: 'Any Title', showBackButton: true });

    // Assert
    const backButton = screen.getByRole('button', { name: 'Назад' });
    expect(backButton).toBeInTheDocument();

    const menuButton = screen.queryByRole('button', { name: 'Open menu' });
    expect(menuButton).not.toBeInTheDocument();
  });

});
