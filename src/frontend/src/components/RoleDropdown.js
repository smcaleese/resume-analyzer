import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { AppContext } from '../App' 
import { roles } from '../constants'

const RoleDropdown = ({ className }) => {
    const { appState, dispatch } = useContext(AppContext)
    const [dropdown, setDropdown] = useState('Software Engineer')

    const updateRole = (role) => {
        dispatch({ type: 'SET_ROLE', payload: role })
    }

    useEffect(() => {
        setDropdown(appState.role)
    }, [appState.role])

    return (
        <div className={classnames('center', className)}>
            <DropdownButton align='end' variant='success' title={dropdown}>
                {Object.keys(roles).map((role, index) => {
                    return <Dropdown.Item key={index} onClick={() => updateRole(role)}>{role}</Dropdown.Item>
                })}
            </DropdownButton>
        </div>
    )
}

export default styled(RoleDropdown)`
    .btn {
        padding: 0.4rem;
        font-size: 1.1rem;
        box-shadow: none !important;
        background-color: #31DAC1;
        border: 2px #31DAC1 solid;
    }
    .btn-check:active+.btn-success, .btn-check:checked+.btn-success, .btn-success.active, .btn-success:active, .show>.btn-success.dropdown-toggle {
        color: #fff;
        background-color: #1c8071;
        border-color: #13653f;
    }

`
