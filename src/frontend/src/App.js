import {useEffect, useState} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

/*
DONE:

TODO:

*/

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

const App = ({className}) => {
  const [file, setFile] = useState('')

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const notPDF = file.type !== 'application/pdf'
    const fileGreaterThan5MB = file.size >= 5000000

    if(notPDF) {
      alert('File must have the PDF format')
    } else if(fileGreaterThan5MB) {
      alert('File max size is 5MB')
    } else {
      console.log('upload successful')
      setFile(file)
    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    console.log('file to upload:', file)
    postResume(file)
  }

  return (
    <div className={classnames(className, 'App', 'center')}>
      <form className='box upload-form center'>
        <h1 className='title'>Upload a resume</h1>
        <div className='upload-button'>
          <label htmlFor='file-upload' className='file-upload-label button is-primary'>
            File Upload (PDF)
          </label>
          <input type="file" id='file-upload' className='upload-input' onChange={handleFileUpload} />
        </div>
        <button type="submit" className='button submit-button' onClick={uploadResume}><strong>submit</strong></button>
      </form>
    </div>
  )
}

export default styled(App)`
  height: 100vh;
  width: 100vw;

  .upload-form {
    width: 50rem;
    padding: 2rem;

    .upload-button {
      .file-upload-label {
        font-weight: bold;
        margin: 1rem;
        width: 10rem;
      }

      input[type='file'] {
        display: none;
      }
    }

    button {
      width: 10rem;
    }

    .submit-button {
      color: white;
      background-color: var(--button-blue);
    }
  }
`;