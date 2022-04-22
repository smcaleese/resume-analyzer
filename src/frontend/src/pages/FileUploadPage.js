import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import LoadingSpinner from '../components/LoadingSpinner'
import {apiUrl} from '../config.js'

const postResume = async (file, role) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${apiUrl}/resume-upload/${role}`, {
        method: 'POST',
        mode: 'cors',
        body: formData,
    })
    const json = await response.json()
    console.log('json response:')
    console.log(json)
    return json
}

const FileUploadPage = ({ className, setPage }) => {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const { dispatch, appState } = useContext(AppContext)
    const navigate = useNavigate()

    const checkFileValidity = (file) => {
        const notPDF = file.type !== 'application/pdf'
        const fileGreaterThan5MB = file.size >= 5000000
        if (notPDF) {
            alert('File must have the PDF format')
            return false
        } else if (fileGreaterThan5MB) {
            alert('File max size is 5MB')
            return false
        } else {
            console.log('File is valid')
            return true
        }
    }

    const uploadResume = async (e) => {
        e.preventDefault()
        console.log('file to upload:', file)

        setLoading(true)
        const timeoutCountdown = setTimeout(() => {
            setLoading(false)
            setError(true)
        }, 10000)
        let data = await postResume(file, appState.role)
        setLoading(false)
        clearInterval(timeoutCountdown)

        console.log(data)
        dispatch({type: 'SET_RESULTS_DATA', payload: data})
        setPage('results')
        navigate('/results')
    }

    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0]

        if (checkFileValidity(file)) {
            console.log('upload successful')
            setFile(file)
            dispatch({type: 'SET_RESUME', payload: file})
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return (
            <div className={classnames('error-page', 'center')}>
                <h1>Error</h1>
                <p>Server timeout. Please reload the page and try again.</p>
            </div>
        )
    }

    return (
        <div className={classnames(className, 'center')}>
            <form className='card upload-form center'>
                <h1 className='title'>Upload a resume (PDF)</h1>
                <div {...getRootProps()} className='drag-drop-box center'>
                    <input {...getInputProps()} alt='file upload' />
                    <div className='drag-drop-box-content center'>
                        <p className='drag-drop-box-text'>{file ? file.name : 'Drag and Drop a File'}</p>
                        <p style={{'padding': '0.5rem'}}>{file ? '' : 'or'}</p>
                        {file ? null : <div className='upload-button button is-primary'>Click Here to Upload</div>}
                    </div>
                </div>
                {file ?
                    <button type='submit' className='button submit-button' onClick={uploadResume}><strong>submit</strong></button>
                    :
                    null
                }
            </form>
        </div>
    )
}

export default styled(FileUploadPage)`
    height: 90vh;
    width: 100%;

    .upload-form {
        width: 50rem;
        padding: 2rem;
        z-index: 100;

        .title {
            margin: 1rem;
        }
    }
    
    button {
        width: 10rem;
    }

    .drag-drop-box {
        height: 400px;
        width: 100%;
        border-radius: 20px;
        border: 4px dashed grey;
    }

    .drag-drop-box-content {
        position: absolute;
        width: 100%;

        p {
            text-align: center;
        }

        .drag-drop-box-text {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .upload-button {
            font-weight: bold;
        }
    }

    .submit-button {
        margin-top: 2rem;
        color: white;
        background-color: var(--button-blue);
    }

    .error-page {
        h1 {
            font-size: 1.5rem;
        }
        p {
            font-size: 1.2rem;
        }
    }
`