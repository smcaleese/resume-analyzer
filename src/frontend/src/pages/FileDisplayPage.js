import React, { useEffect } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PDFPageViewer from '../components/PDFPageViewer'
import { useLocation, useNavigate } from 'react-router-dom'

const FileDisplayPage = ({ className }) => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // Redirect user with no uploaded resume back to resume upload
        if (!location.state) {
            navigate('/')
        }
    }, [location, navigate])

    // Block Page render if no resume has been uploaded
    if (!location.state) {
        return null
    }

    return (
        <div className={classnames(className)}>
            <div className='columns box-grid'>
                <div className="column">
                    stuff
                </div>
                <div className="column is-two-fifths view-container">
                    <PDFPageViewer pages={location.state.Resume.content}/>
                </div>
            </div>
        </div>
    )
}

export default styled(FileDisplayPage)`
height: 100%;
width: 100%;

.box-grid{
    padding-top:110px;

    .view-container{
        height:90vh;
    }
}
`
