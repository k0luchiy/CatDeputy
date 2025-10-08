// __tests__/pages/LoginPage.test.tsx

import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

// Corrected import paths from the new test directory location
import LoginPage from '../../pages/LoginPage';
import { AuthProvider } from '../../contexts/AuthContext';

// Clean up the JSDOM after each test to prevent side-effects
afterEach(() => {
  cleanup();
});

// A helper function to render our component with all the necessary Providers.
const renderLoginPage = () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('LoginPage', () => {

  it('should render the login form with all its elements correctly', () => {
    // Arrange
    renderLoginPage();

    // Assert
    expect(screen.getByText('Цифровой кабинет депутата')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    
    const loginButton = screen.getByRole('button', { name: 'Войти' });
    expect(loginButton).toBeInTheDocument();

    const confirmPasswordField = screen.queryByLabelText('Подтвердите пароль');
    expect(confirmPasswordField).not.toBeInTheDocument();
  });

  it('should switch to the registration view when the toggle button is clicked', async () => {
    // Arrange
    renderLoginPage();
    const user = userEvent.setup();

    // Act
    const switchToRegisterButton = screen.getByRole('button', { name: 'Нет аккаунта? Зарегистрироваться' });
    await user.click(switchToRegisterButton);

    // Assert
    const heading = screen.getByRole('heading', { name: 'Регистрация' });
    expect(heading).toBeInTheDocument();

    const confirmPasswordField = screen.getByLabelText('Подтвердите пароль');
    expect(confirmPasswordField).toBeInTheDocument();

    const registerButton = screen.getByRole('button', { name: 'Зарегистрироваться' });
    expect(registerButton).toBeInTheDocument();
  });

  it('should display an error message if passwords do not match on registration', async () => {
    // Arrange
    renderLoginPage();
    const user = userEvent.setup();

    // Act: Switch to registration view
    await user.click(screen.getByRole('button', { name: 'Нет аккаунта? Зарегистрироваться' }));

    // Act: Fill out the form with mismatched passwords
    await user.type(screen.getByLabelText('Email'), 'test@test.com');
    await user.type(screen.getByLabelText('Пароль'), 'password123');
    await user.type(screen.getByLabelText('Подтвердите пароль'), 'password456');
    await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

    // Assert
    const errorMessage = await screen.findByText('Пароли не совпадают');
    expect(errorMessage).toBeInTheDocument();
  });
});
