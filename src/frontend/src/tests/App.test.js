import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

describe('Test loading the app', () => {
    test('When the app is loaded, the upload page should be shown', () => {
        render(<App />)
        expect(screen.getByText('Upload a resume (PDF)')).toBeInTheDocument()
        expect(screen.getByText('Drag and Drop a File')).toBeInTheDocument()
        expect(screen.getByText('Click Here to Upload')).toBeInTheDocument()
    })
})

describe('Test resume upload', () => {
    test('When a resume is uploaded, the submit button should be shown', async () => {
        render(<App />)

        const testResume = new File(['Test resume content'], 'testResume.pdf', { type: 'application/pdf'})
        const input = screen.getByAltText(/file upload/i)

        fireEvent.change(input, {target: {files: [testResume]}})

        const submitButton = await screen.findByText(/submit/i) 
        expect(submitButton).toBeInTheDocument()
    })
})
