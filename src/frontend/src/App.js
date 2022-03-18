import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import FileUploadPage from './pages/FileUploadPage'
import FileDisplayPage from './pages/FileDisplayPage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Tree from './components/Tree'

export const AppContext = React.createContext()

const initialState = {
    navState: 'home',
    resume: null,
    resultsData: null,
}

const reducer = (state, action) => {
    switch(action.type) {
    case 'SET_PAGE':
        return {...state, navState: action.payload}
    case 'SET_RESUME':
        return {...state, resume: action.payload}
    case 'SET_RESULTS_DATA':
        return {...state, resultsData: action.payload}
    }
}

const App = ({ className }) => {
    const [appState, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        console.log('rerendering app')
    })

    return (
        <AppContext.Provider value={{appState, dispatch}}>
            <div className={className}>
                <Router>
                    <Header />
                    <Sidebar />
                    <Routes>
                        <Route path='/' element={<Navigate to='/home' />} />
                        <Route path='/home' element={<FileUploadPage />} />
                        <Route path='/results' element={<FileDisplayPage />} />
                        <Route path='/tree' element={<Tree />} />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </Router>
            </div>
        </AppContext.Provider>
    )
}

export default styled(App)`
    width: 100vw;
    position: relative;
`
