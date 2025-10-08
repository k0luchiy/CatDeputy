import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mocking window.matchMedia
// This is necessary because JSDOM, the environment where our tests run,
// does not implement window.matchMedia. Our ThemeContext uses it to detect
// the user's preferred color scheme.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false, // Default to light mode for tests
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated but good to have for some libraries
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
