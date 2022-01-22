import React, { useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { pdfjs, Document, Page } from 'react-pdf'
import { nanoid } from 'nanoid'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

// render PDF files using separate thread to improve performance:
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js'

const Pagination = ({pageNumber, setPageNumber, numPages}) => {
    const handlePagination = (n) => {
        if (n < 1)
            setPageNumber(1)
        else if (n > numPages)
            setPageNumber(numPages)
        else
            setPageNumber(n)
    }
    
    const paginationListItems = Array.from({length: numPages}, (_, pageIndex) => 
        <li key={nanoid()}>
            <div
                className={classnames('pagination-link', {'is-current': pageIndex + 1 === pageNumber})}
                aria-label={`Goto page ${pageIndex + 1}`}
                onClick={() => { handlePagination(pageIndex + 1) }}
            >
                {pageIndex + 1}
            </div>
        </li>
    )

    return (
        <nav className='pagination is-rounded is-centered' role='navigation' aria-label='pagination'>
            <div className='pagination-previous arrow' onClick={() => { handlePagination(pageNumber - 1) }}>
                <FiArrowLeft />
            </div>
            <div className='pagination-next arrow' onClick={() => { handlePagination(pageNumber + 1) }}>
                <FiArrowRight />
            </div>
            <ul className='pagination-list'>
                { paginationListItems }
            </ul>
        </nav>
    )
}

const PDFPageViewer = ({ className, file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
        console.log('pages in function:', numPages)
        setNumPages(nextNumPages)
    }

    return (
        <article className={classnames(className, 'panel is-link')}>
            <h1 className='panel-heading'>Resume</h1>
            <div className='pdf-container'>
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className='pdf-page'
                >
                    <Page
                        pageNumber={pageNumber}
                    />
                </Document>
            </div>
            <div className='pagination-container'>
                <Pagination
                    pageNumber={pageNumber}
                    numPages={numPages}
                    setPageNumber={setPageNumber}
                />
            </div>
        </article>
    )
}

export default styled(PDFPageViewer)`
height: 100%;
overflow: hidden;

.pdf-page {
    width: 100% !important;
    height: 100% !important;
}

.react-pdf__Page__canvas {
    margin: 0 auto;
    width: 100% !important;
    height: 100% !important;
}

.react-pdf__Page__textContent {
    display: none !important;
}

.pagination-container {
    .arrow {
        cursor: pointer;
    }
    .pagination-link {
        cursor: pointer;
    }
}
`
