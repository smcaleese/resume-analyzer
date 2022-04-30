import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

const Header = ({ className, page }) => {
    return (
        <div className={className}>
            <h1 className='product-name center'>
                ResumeAnalyzer
            </h1>
        </div>
    )
}

export default styled(Header)`
    margin: 0 0 0 120px;
    cursor: pointer;
    height: 120px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .product-name {
        margin: 0;
        font-weight: normal;
        vertical-align: middle;
        font-size: 3em;
        color: #373B53;
    }
`
