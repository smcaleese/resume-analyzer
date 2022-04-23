import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import DisplayCard from '../components/DisplayCard'
import CareerPathTree from '../components/tree-components/CareerPathTree'
import LoadingSpinner from '../components/LoadingSpinner'
import { AppContext } from '../App'

const TreePage = ({ className }) => {
    const { appState } = useContext(AppContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!appState.treeData) {
            setLoading(true)
        } else {
            setLoading(false)
        }   
    }, [appState.treeData])

    if(loading) {
        return <LoadingSpinner />
    }

    const infoString = `This digram represents a flow diagram through typical software career paths.
    Clicking on the role will show jobs with in that role`

    return (
        <DisplayCard className={className} info={infoString}>
            <CareerPathTree />
        </DisplayCard>
    )
}

export default styled(TreePage)`
    margin: 0px 10px 0px 110px;
    color: white;
    height: calc(100vh - 140px);

    .react-flow__node {
        cursor: pointer;
    }

    .react-flow__node-default, .react-flow__node-group, .react-flow__node-input, .react-flow__node-output {
        border: 3px solid #373B53
    }

`
