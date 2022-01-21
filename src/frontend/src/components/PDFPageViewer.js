import React, { useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

const PDFPageViewer = ({ className, pages }) => {
    const [pageNumber, setPageNumber] = useState(0)

    const handlePagination = (n) => {
        if (n < 0)
            setPageNumber(0)
        else if (n >= pages.length)
            setPageNumber(pages.length-1)
        else
            setPageNumber(n)
    }

    let page = pages[pageNumber]

    return (
        <article className={classnames(className, 'panel is-link')}>
            <p className='panel-heading'> Resume </p>
            <div className='text-container'>
                {page.split("\n").map((str, index) => <p key={index}>{str}</p>)}
            </div>
            <div className='pagination-container'>
                <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                    <a className='pagination-previous' onClick={() => {handlePagination(pageNumber - 1)}}> &#10096; </a>
                    <ul class="pagination-list">
                        {pages.map((page,index) => 
                            <li onClick={() => {handlePagination(index)}}>
                                <a class={"pagination-link" + (pageNumber===index ? " is-current" : "")} aria-label={"Page " + (index+1)}  aria-current="page">{(index+1)}</a>
                            </li>
                        )}
                    </ul>
                    <a className='pagination-next' onClick={() => {handlePagination(pageNumber + 1)}}> &#10097; </a>
                </nav>
            </div>
        </article>
    )
}

export default styled(PDFPageViewer)`
height: 100%;
width: 100%;
overflow: hidden;

.text-container{
    height:90%;
    padding: 10px 10px 0px 10px;
    overflow-y:auto;
    overflow-x:hidden;
}

.pagination-container{
    padding: 10px 10px 0px 10px;
}
`
