import React from 'react'
import styled from 'styled-components'
import logo from '../assets/Temp-Logo.svg'
import { Navbar, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Header = ({ className }) => {
    const navigate = useNavigate()

    return (
        <div className={className}>
            <span className='product-name'>ResumeAnalyzer</span>
        </div>
    )
}

export default styled(Header)`
    z-index: 9999;
    position: absoulte;
    margin-left: 125px;

    .product-name {
        line-height: 100px; 
        vertical-align: middle;
        font-size: 3em;
        color: #4a4a4a
    }
`
