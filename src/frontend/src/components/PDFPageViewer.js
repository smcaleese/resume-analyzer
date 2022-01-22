import React, { useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { pdfjs, Document, Page } from 'react-pdf';
import { Card, Container, Pagination, Row } from 'react-bootstrap'

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

const PDFPageViewer = ({ className, file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    const handlePagination = (n) => {
        if (n < 1)
            setPageNumber(1)
        else if (n > numPages)
            setPageNumber(numPages)
        else
            setPageNumber(n)
    }

    return (
        <Card className={classnames(className)}>
            <Card.Header className="card-heading" as="h3">
                Resume
            </Card.Header>
            <Card.Body>
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
                    <Row className='justify-content-center pagination-container'>
                        <Pagination className='pagination-controller justify-content-center'>
                            <Pagination.Prev onClick={() => { handlePagination(pageNumber - 1) }} />
                            {
                                Array.from(
                                    new Array(numPages),
                                    (el, index) => (

                                        <Pagination.Item
                                            active={index + 1 === pageNumber}
                                            key={index + 1}
                                            onClick={() => { handlePagination(index + 1) }}
                                        >
                                            {index + 1}
                                        </Pagination.Item>
                                    ),
                                )
                            }
                            <Pagination.Next onClick={() => { handlePagination(pageNumber + 1) }} />
                        </Pagination>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default styled(PDFPageViewer)`
height: 100%;
width: 100%;
overflow: hidden;
box-shadow: 0 0 10px 0 rgba(100, 100, 100, 0.26);

.pagination-container{
    padding:0;
}

.pagination-controller{
    maring:0;
    padding:0;
}

.card-heading{
    background-color:var(--bs-blue);
    color:#fff;
}

.react-pdf__Page__canvas {
    margin: 0 auto;
    width: 100% !important;
    height: 100% !important;
}
.react-pdf__Page__textContent {
    display: none !important;
}
`
