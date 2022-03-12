import React from 'react'
import styled from 'styled-components'
import logo from '../assets/Temp-Logo.svg'
import { Navbar, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Header = ({ className }) => {
    const navigate = useNavigate()

    return (
        <div className={className}>
            <h1 className='product-name' onClick={() => navigate('/')}>
                ResumeAnalyzer
            </h1>
        </div>
    )
}

export default styled(Header)`
    margin: 0 0 0 120px;
    cursor: pointer;
    padding: calc((100px - 3em) / 2) 0 calc((100px - 3em) / 2) 0;
    height: 100px;

    .product-name {
        margin: 0;
        font-weight: normal;
        vertical-align: middle;
        font-size: 3em;
        color: #373B53;
    }
`
