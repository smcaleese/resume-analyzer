import {useEffect, useState} from 'react'
import './App.scss'

function App() {
  const testServer = () => {
    fetch('http://localhost:8000/status')
      .then(response => response.json())
      .then(json => alert(json.message))
  }

  return (
    <div className="App center">
      <div className="box main-box">
        <div className="box-content center">
          <p className="font-bold">Click this button to test the server</p>
          <button className="button is-primary" onClick={testServer}>button</button>
        </div>
      </div>
    </div>
  )
}

export default App
