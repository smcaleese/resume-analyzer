import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { jest, describe, expect, test } from '@jest/globals'
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

        const panelNames = ['Resume Skills', 'Skill Frequencies', 'Resume Score', 'Resume', 'Matching Jobs']

        for (const panelName of panelNames) {
            const panel = await screen.findByText(panelName)
            expect(panel).toBeInTheDocument()
        }
    })
})

const clickSidebarLink = (altText) => screen.getByAltText(altText).click()

describe('Test changing the page using the sidebar', () => {
    test('When the reports page icon is clicked, the reports page should be shown', async () => {
        render(<App />)
        act(() => clickSidebarLink('Reports Icon'))
        const searchText = await screen.findByText('Search')
        expect(searchText).toBeInTheDocument()
    })
})
