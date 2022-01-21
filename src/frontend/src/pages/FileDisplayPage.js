import React, { useEffect } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PDFPageViewer from '../components/PDFPageViewer'
import { useLocation, useNavigate } from 'react-router-dom'
import SkillsDisplayPanel from '../components/SkillsDisplayPanel'

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
    console.log(location)
    return (
        <div className={classnames(className)}>
            <div className='columns box-grid'>
                <div className="column">
                    <SkillsDisplayPanel skills={location.state.results.skills}/>
                </div>
                <div className='column'></div>
                <div className="column is-one-third view-container">
                    <PDFPageViewer file={location.state.resume}/>
                </div>
            </div>
        </div>
    )
}

export default styled(FileDisplayPage)`
height: 100%;
width: 100%;

.box-grid{
    padding:110px 20px 0px 20px;

    .view-container{
        height:90vh;
    }
}
`
