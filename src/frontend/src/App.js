import React, { useEffect, useReducer, useState, useMemo } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import FileUploadPage from './pages/FileUploadPage'
import ResumeAnalysisPage from './pages/ResumeAnalysisPage'
import ReportsPage from './pages/ReportsPage'
import TreePage from './pages/TreePage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

export const AppContext = React.createContext()

const initialState = {
    resume: null,
    role: 'all skills',
    resultsData: null,
    reportsData: null,
    treeData: null,
}

const reducer = (state, action) => {
    switch(action.type) {
    case 'SET_RESUME':
        return { ...state, resume: action.payload }
    case 'SET_ROLE':
        return { ...state, role: action.payload}
    case 'SET_RESULTS_DATA':
        return { ...state, resultsData: action.payload }
    case 'SET_REPORTS_DATA':
        return { ...state, reportsData: action.payload }
    case 'SET_TREE_DATA':
        return { ...state, treeData: action.payload }
    }
    
}

const App = ({ className }) => {
    const [page, setPage] = useState('home')
    const [appState, dispatch] = useReducer(reducer, initialState)
    const store = useMemo(() => ({ appState, dispatch }), [appState])

    return (
        <div className={className}>
            <Router>
                <AppContext.Provider value={store}>
                    <Header page={page} />
                    <Sidebar page={page} setPage={setPage} />
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/home' />} />
                        <Route path='/home' element={<FileUploadPage setPage={setPage} />} />
                        <Route path='/results' element={<ResumeAnalysisPage />} />
                        <Route path='/reports' element={<ReportsPage />} />
                        <Route path='/tree' element={<TreePage />} />
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
