import React from 'react'
import styled from 'styled-components'
import logo from '../assets/Temp-Logo.svg'
import { Navbar, Container } from 'react-bootstrap'

const Header = ({ className }) => {
    return (
        <Navbar className={className} fixed="top">
            <Container fluid>
                <Navbar.Brand>
                    <img
                        alt="logo"
                        src={logo}
                        width="100"
                        height="100"
                        className='d-inline-block align-top' 
                    />{' '}
                    <span className='product-name'>ResumAI</span>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default styled(Header)`
box-shadow: 0px 2px 5px #ccc;
background-color: #fff;
z-index: 3000;

.product-name{
    line-height: 100px; 
    vertical-align: middle;
    font-size: 3em;
    color: #4a4a4a
}
`
