import React, { useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Card, Container, Pagination, Row } from 'react-bootstrap'
import { pdfjs, Document, Page } from 'react-pdf'
import { nanoid } from 'nanoid'
import DisplayCard from './DisplayCard'

// render PDF files using separate thread to improve performance:
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js'

const PaginationComponent = ({pageNumber, setPageNumber, numPages}) => {
    const handlePagination = (n) => {
        if (n < 1)
            setPageNumber(1)
        else if (n > numPages)
            setPageNumber(numPages)
        else
            setPageNumber(n)
    }

    const paginationItems = Array.from({length: numPages}, 
        (_, index) => (
            <Pagination.Item
                active={index + 1 === pageNumber}
                key={nanoid()}
                onClick={() => { handlePagination(index + 1) }}
            >
                {index + 1}
            </Pagination.Item>
        )
    )

    return (
        <Row className='justify-content-center pagination-container'>
            <Pagination className='pagination-controller justify-content-center'>
                <Pagination.Prev onClick={() => { handlePagination(pageNumber - 1) }} />
                { paginationItems }
                <Pagination.Next onClick={() => { handlePagination(pageNumber + 1) }} />
            </Pagination>
        </Row>
    )
}

const PDFPageViewer = ({ className, file }) => {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
        console.log('pages in function:', numPages)
        setNumPages(nextNumPages)
    }

    return (
        <DisplayCard header='Resume' className={className}>
            <Container fluid>
                <Row>
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className='pdf-page'
                    >
                        <Page
                            pageNumber={pageNumber}
                        />
                    </Document>
                </Row>
                <Row>
                    <PaginationComponent
                        pageNumber={pageNumber}
                        numPages={numPages}
                        setPageNumber={setPageNumber}
                    />
                </Row>
            </Container>
        </DisplayCard>
    )
}

export default styled(PDFPageViewer)`
.pagination-container {
    padding: 0;
}

.pagination-controller {
    margin: 0;
    padding: 0;
}

.pdf-page {
    width: 100% !important;
    height: 100% !important;
}

.react-pdf__Page__canvas {
    width: 100% !important;
    height: 100% !important;
}

.react-pdf__Page__textContent {
    display: none !important;
}
`
