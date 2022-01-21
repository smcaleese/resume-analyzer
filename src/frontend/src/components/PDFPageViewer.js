import React, { useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { pdfjs, Document, Page } from 'react-pdf';

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
        <article className={classnames(className, 'panel is-link')}>
            <p className='panel-heading'> Resume </p>
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
            <div>
                <nav class="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
                    <a class="pagination-previous" onClick={() => {handlePagination(pageNumber-1)}}>&#10096;</a>
                    <a class="pagination-next" onClick={() => {handlePagination(pageNumber+1)}}>&#10097;</a>
                    <ul class="pagination-list">
                        {
                            Array.from(
                                new Array(numPages),
                                (el, index) => (
                                    <li><a
                                        class={"pagination-link" + (index + 1 === pageNumber ? " is-current" : "")}
                                        key={index + 1}
                                        aria-label={"Goto page " + index + 1}
                                        onClick={() => {handlePagination(index+1)}}
                                    >
                                        {index + 1}</a></li>
                                ),
                            )
                        }
                    </ul>
                </nav>
            </div>
        </article>
    )
}

export default styled(PDFPageViewer)`
height: 100%;
width: 100%;
overflow: hidden;

.pdf-container{
    height:80vh;
}

.pdf-page{
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
`
