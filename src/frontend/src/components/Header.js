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
        // <div className={className}>
        // <nav className='navbar' role="navigation" aria-label="main navigation">
        //     <div className="navbar-brand">
        //         <div className="navbar-item" style={{padding:0, lineHeight:2, fontSize:"3em"}}>
        //             <img src={logo} alt="Logo" width="100" height="100"  />
        //             <span>ResumAI</span>
        //         </div>
        //     </div>
        // </nav>
        // </div>
    )
}

export default styled(Header)`
box-shadow: 0px 2px 5px #ccc;

.product-name{
    line-height: 100px; 
    vertical-align: middle;
    font-size: 3em;
    color: #4a4a4a
}
`
