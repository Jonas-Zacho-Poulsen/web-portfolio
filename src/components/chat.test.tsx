import { describe, it, expect } from '@jest/globals'
import { render as rtlRender, screen, fireEvent, waitFor, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Chat } from './chat'

describe('Chat Component', () => {
  it('renders initial message', () => {
    rtlRender(<Chat />) as RenderResult
    // Use a type assertion to tell TypeScript that the result of expect() has a toBeInTheDocument method
    (expect(screen.getByText(/Hi! I'm Jonas' assistant/i)) as any).toBeInTheDocument()
  })

  it('handles user input correctly', async () => {
    rtlRender(<Chat />) as RenderResult
    const input = screen.getByPlaceholderText(/Ask about Jonas/i)
    const button = screen.getByText('Send')

    fireEvent.change(input, { target: { value: 'What are your skills?' } })
    fireEvent.click(button)

    await waitFor(() => {
      // Use a type assertion here as well
      (expect(screen.getByText(/Frontend: React, Next.js/)) as any).toBeInTheDocument()
    })
  })
})


