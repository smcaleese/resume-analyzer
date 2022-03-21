import React from 'react'
import styled from 'styled-components'
import DisplayCard from '../components/DisplayCard'
import CareerPathTree from '../components/tree-components/CareerPathTree'

const TreePage = ({ className }) => {
    return (
        <DisplayCard className={className}>
            <CareerPathTree />
        </DisplayCard>
    )
}

export default styled(TreePage)`
    margin: 0px 10px 0px 110px;
    color: white;
    height: calc(100vh - 140px);
`
