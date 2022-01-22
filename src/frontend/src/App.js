import React from 'react'
import styled from 'styled-components'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import FileUploadPage from './pages/FileUploadPage'
import FileDisplayPage from './pages/FileDisplayPage'
import Header from './components/Header'

const App = ({className}) => {
    return (
        <div className={className}>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<FileUploadPage />}/>
                    <Route path='/results' element={<FileDisplayPage />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default styled(App)`
    height: 100vh;
    width: 100vw;
    position: relative;
`