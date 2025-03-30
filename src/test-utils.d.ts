// Import the necessary types from @testing-library/jest-dom
import '@testing-library/jest-dom'

// Extend the Jest matchers
declare global {
  namespace jest {
    // Make sure the interface matches the one from @jest/expect
    interface Matchers<R, T> {
      toBeInTheDocument(): R
      toBeVisible(): R
      toBeInTheDOM(): R
      toHaveTextContent(text: string | RegExp): R
      toHaveAttribute(attr: string, value?: string | RegExp): R
      // Add other matchers as needed
    }
  }
}

// Export an empty object to make this a module
export {}
