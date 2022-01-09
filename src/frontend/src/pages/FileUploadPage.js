import { useState, useCallback } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { useDropzone } from "react-dropzone";

const postResume = async (file) => {
    const formData = new FormData()
    formData.append(
        'file',
        file,
    )

    const response = await fetch('http://localhost:8000/resume-upload', {
        method: 'POST',
        mode: 'cors',
        body: formData,
    })
    const json = await response.json()
    console.log('resume content:\n', json.content)
}

const FileUploadPage = ({ className }) => {
    const [file, setFile] = useState('')

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

    const handleFileUpload = (e) => {
        e.preventDefault()
        const file = e.target.files[0]

        if (checkFileValidity(file)) {
            console.log('upload successful')
            setFile(file)
        }
    }

    const uploadResume = async (e) => {
        e.preventDefault()
        console.log('file to upload:', file)
        postResume(file)
    }

    const onDrop = useCallback((acceptedFile, rejectedFile) => {
        const file = acceptedFile[0]

        if (checkFileValidity(file)) {
            console.log('upload successful')
            setFile(file)
        }
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className={classnames(className, 'App', 'center')}>
            <form className='box upload-form center'>
                <h1 className='title'>Upload a resume</h1>
                <div {...getRootProps()} className='drag-drop-box'>
                    <input {...getInputProps()} />
                </div>
                <div className='drag-drop-box-content'>
                        <p className='drag-drop-box-text'>{file ? file.name : "Drag and Drop a File"}</p>
                        <p>{file ? "" : "or"}</p>
                        <div className='upload-button'>
                            <label htmlFor='file-upload' className='file-upload-label button is-primary'>
                                File Upload (PDF)
                            </label>
                            <input type="file" id='file-upload' className='upload-input' onChange={handleFileUpload} />
                        </div>
                    </div>
                {file ?
                    <button type="submit" className='button submit-button' onClick={uploadResume}><strong>submit</strong></button>
                    :
                    null
                }
            </form>
        </div>
    )
}

export default styled(FileUploadPage)`
height: 100vh;
  width: 100vw;
  position:relative;

  .upload-form {
    width: 50rem;
    padding: 2rem;
    z-index: 100;
    
    button {
      width: 10rem;
    }

    .drag-drop-box {
      height:400px;
      width:100%;
      border-radius: 20px;
      border: 4px dashed grey;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .drag-drop-box-content{
        position:absolute;
        width:100%;
        p{
            text-align: center
          }

        .drag-drop-box-text{
            font-size:1.2rem;
            font-weight:bold;
          }
        
        .upload-button{
            display: table;
            margin: 0 auto;
            .file-upload-label {
                font-weight: bold;
                width: 10rem;
              }
        
              input[type='file'] {
                display: none;
              }
          }
      


    }

    .submit-button {
      color: white;
      background-color: var(--button-blue);
    }
  }
`