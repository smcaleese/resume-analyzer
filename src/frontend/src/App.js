import React, { useState } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FileUploadPage from './pages/FileUploadPage'
import FileDisplayPage from './pages/FileDisplayPage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

export const NavContext = React.createContext()

const App = ({ className }) => {

    const [navState, setNavState] = useState('home')

    return (
        <div className={className}>
            <Router>
                <Header />
                <Sidebar page={navState} setPage={setNavState} />
                <NavContext.Provider value={setNavState}>
                    <Routes>
                        <Route path='/' element={<FileUploadPage />} />
                        <Route path='/results' element={<FileDisplayPage />} />
                    </Routes>
                </NavContext.Provider>
            </Router>
        </div>
    )
}

export default styled(App)`
    height: 100vh;
    width: 100vw;
    position: relative;
`