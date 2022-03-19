import React, { useEffect, useReducer, useState, useMemo } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import FileUploadPage from './pages/FileUploadPage'
import FileDisplayPage from './pages/FileDisplayPage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Tree from './components/Tree'

export const AppContext = React.createContext()

const initialState = {
    resume: null,
    resultsData: null,
}

const reducer = (state, action) => {
    switch(action.type) {
    case 'SET_RESUME':
        return {...state, resume: action.payload}
    case 'SET_RESULTS_DATA':
        return {...state, resultsData: action.payload}
    }
}

const App = ({ className }) => {
    const [page, setPage] = useState('home')
    const [appState, dispatch] = useReducer(reducer, initialState)
    const store = useMemo(() => ({ appState, dispatch }), [appState])

    return (
        <div className={className}>
            <Header />
            <Router>
                <Sidebar page={page} setPage={setPage} />
                <AppContext.Provider value={store}>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/home' />} />
                        <Route path='/home' element={<FileUploadPage setPage={setPage} />} />
                        <Route path='/results' element={<FileDisplayPage />} />
                        <Route path='/tree' element={<Tree />} />
                        <Route path='*' element={<Navigate to='/home' />} />
                    </Routes>
                </AppContext.Provider>
            </Router>
        </div>
    )
}

export default styled(App)`
    width: 100vw;
    position: relative;
`
