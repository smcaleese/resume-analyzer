import React, { useEffect } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

const FileDisplayPage = ({ className }) =>  {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // Redirect user with no uploaded resume back to resume upload
        if(!location.state){
            navigate('/')
        }
    }, [location, navigate])

    // Block Page render if no resume has been uploaded
    if (!location.state){
        return null
    }
    let text = location.state.Resume.content[0].split("\n").join("<br />");
    return (
        <div className={classnames(className, 'App', 'center')}>
           <div>{text}</div>
        </div>
    )
}

export default styled(FileDisplayPage)`
height: 100%;
width: 100%;
`
