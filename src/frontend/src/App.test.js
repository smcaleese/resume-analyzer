import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

const add = (a, b) => a + b

test('add', () => {
    expect(add(1, 2)).toBe(3)
})

test('renders learn react link', () => {
    render(<App />)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
