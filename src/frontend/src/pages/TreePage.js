import React from 'react'
import styled from 'styled-components'
import DisplayCard from '../components/DisplayCard'
import { Container, Col, Row, Card } from 'react-bootstrap'

const TreePage = ({ className }) => {
    return (
        <div className={className}>
            <DisplayCard header='Tree Page'>

            </DisplayCard>
        </div>
    )
}

export default styled(TreePage)`
    margin-left: 110px;
    color: white;
`
