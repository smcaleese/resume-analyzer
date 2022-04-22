import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { AppContext } from '../App' 
import { roles } from '../constants'

const RoleDropdown = ({ className }) => {
    const { appState, dispatch } = useContext(AppContext)
    const [dropdown, setDropdown] = useState('Software Engineer')

    useEffect(() => {
        console.log('role changed: ', appState)
        dispatch({ type: 'SET_ROLE', payload: dropdown })
    }, [dropdown])

    return (
        <div className={classnames('center', className)}>
            <DropdownButton align='end' variant='success' title={dropdown}>
                {Object.keys(roles).map((role, index) => {
                    return <Dropdown.Item key={index} onClick={() => setDropdown(role)}>{role}</Dropdown.Item>
                })}
            </DropdownButton>
        </div>
    )
}

const StyledRoleDropdown = styled(RoleDropdown)`
    width: 20rem;

    .btn {
        padding: 0.5rem;
        font-size: 1.1rem;
    }
`

const Header = ({ className, page }) => {
    return (
        <div className={className}>
            <h1 className='product-name center'>
                ResumeAnalyzer
            </h1>
            { page === 'home' || page === 'results' ? <StyledRoleDropdown /> : null }
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
