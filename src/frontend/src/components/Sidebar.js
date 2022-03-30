import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../assets/Temp-Logo.svg'
import selected_home_icon from '../assets/Icons/Home-Selected.png'
import unselected_home_icon from '../assets/Icons/Home-Unselected.png'
import selected_chart_icon from '../assets/Icons/Chart-Selected.png'
import unselected_chart_icon from '../assets/Icons/Chart-Unselected.png'
import selected_tree_icon from '../assets/Icons/Tree-Selected.png'
import unselected_tree_icon from '../assets/Icons/Tree-Unselected.png'
import selected_reports_icon from '../assets/Icons/Reports-Selected.png'
import unselected_reports_icon from '../assets/Icons/Reports-Unselected.png'
import { Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'

const Sidebar = ({ className, page, setPage }) => {
    const navigate = useNavigate()

    const changePage = (page) => {
        setPage(page)
        navigate(page)
    }

    const getStyle = (iconType) =>
        iconType === page ? { backgroundColor: '#33DAC1' } : { backgroundColor: 'transparent' }

    return (
        <Nav className={classnames(className, 'd-block')}
            activeKey={page}
            onSelect={selectedKey => { changePage(selectedKey) }}
        >
            <Nav.Item>
                <Nav.Link className='logo-container center' eventKey='home'>
                    <img
                        alt='Brand Logo'
                        src={logo}
                        width='76'
                        height='76'
                        className='logo-image'
                    />
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className='icon-container center' style={getStyle('home')} eventKey='home'>
                    <img
                        alt='Home Icon'
                        src={page === 'home' ? selected_home_icon : unselected_home_icon}
                        width='50'
                        className='icon'
                    />
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className='icon-container center' style={getStyle('results')} eventKey='results'>
                    <img
                        alt='Results Icon'
                        src={page === 'results' ? selected_chart_icon : unselected_chart_icon}
                        width='50'
                        className='icon'
                    />
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className='icon-container center' style={getStyle('reports')} eventKey='reports'>
                    <img
                        alt='Reports Icon'
                        src={page === 'reports' ? selected_reports_icon : unselected_reports_icon}
                        width='50'
                        className='icon'
                    />
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className='icon-container center' style={getStyle('tree')} eventKey='tree'>
                    <img
                        alt='Tree Icon'
                        src={page === 'tree' ? selected_tree_icon : unselected_tree_icon}
                        width='50'
                        className='icon'
                    />
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default styled(Sidebar)`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #373B53;
    z-index: 9999;
    width: 100px;

    .logo-container {
        background-color: #33DAC1;
        height: 100px;
        padding: 0;
    }

    .icon-container {
        margin: 10px;
        height: 80px;
        border-radius: 50%;
    }
`
