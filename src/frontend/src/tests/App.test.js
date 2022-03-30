import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

jest.mock('react-chartjs-2', () => ({
    Bar: () => null,
    Doughnut: () => null
}))

jest.mock('react-pdf', () => ({
    pdfjs: { GlobalWorkerOptions: { workerSrc: null } },
    Document: () => <div>pdf document</div>,
    Page: () => <div>page</div>
}))

describe('Test loading the app', () => {
    test('When the app is loaded, the upload page should be shown', () => {
        render(<App />)
        expect(screen.getByText('Upload a resume (PDF)')).toBeInTheDocument()
        expect(screen.getByText('Drag and Drop a File')).toBeInTheDocument()
        expect(screen.getByText('Click Here to Upload')).toBeInTheDocument()
    })
})

describe('Test resume upload', () => {
    const uploadResume = () => {
        const testResume = new File(['I have experience with Python'], 'testResume.pdf', { type: 'application/pdf'})
        const input = screen.getByAltText(/file upload/i)

        fireEvent.change(input, {target: {files: [testResume]}})
    }

    const clickButton = (button) => fireEvent.click(button)

    test('When a resume is uploaded, the submit button should be shown', async () => {
        render(<App />)
        uploadResume()

        const submitButton = await screen.findByText(/submit/i) 
        expect(submitButton).toBeInTheDocument()
    })

    test('When the resume is submitted, the results page should be shown', async () => {
        render(<App />)
        uploadResume()

        const submitButton = await screen.findByText(/submit/i)
        clickButton(submitButton)

        await waitFor(() => {
            screen.getByText('Resume')
        }) 
        const panels = ['Skills', 'Skill Frequencies', 'Resume', 'Matching Jobs']

        for (const panelName of panels) {
            expect(screen.getByText(panelName)).toBeInTheDocument()
        }
    })
})

describe('Test reports page', () => {
    test('When the reports page is clicked in the sidebar, the reports page should be shown', () => {

    })

    test('When a search query is added to the search bar, the reports should be filtered', () => {

    })
})

describe('Test tree page', () => {
    test('When the tree page is clicked in the sidebar, the tree page should be shown', () => {

    }) 
})
