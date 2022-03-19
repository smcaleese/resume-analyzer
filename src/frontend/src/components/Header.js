import React from 'react'
import styled from 'styled-components'
import logo from '../assets/Temp-Logo.svg'

const Header = ({ className }) => {
    return (
        <div className={className}>
            <h1 className='product-name'>
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
    flex-direction: column;
    justify-content: center;

    .product-name {
        margin: 0;
        font-weight: normal;
        vertical-align: middle;
        font-size: 3em;
        color: #373B53;
    }
`
