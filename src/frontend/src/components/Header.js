import React from 'react'
import styled from 'styled-components'
import logo from '../assets/Temp-Logo.svg'

const Header = ({ className }) => {
    return (
        <div className={className}>
        <nav className='navbar' role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item" style={{padding:0, lineHeight:2, fontSize:"3em"}}>
                    <img src={logo} alt="Logo" width="100" height="100"  />
                    <span>ResumAI</span>
                </div>
            </div>
        </nav>
        </div>
    )
}

export default styled(Header)`
    box-shadow: 2px 2px 5px grey;
    overflow: hidden;
    position: fixed; 
    top: 0;
    width: 100%;
    z-index: 1000;

    .navbar-item{
        img{
            max-height: 5rem;
        }
    }
`
