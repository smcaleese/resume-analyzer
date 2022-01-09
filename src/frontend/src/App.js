import styled from 'styled-components'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import FileUploadPage from './pages/FileUploadPage';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FileUploadPage />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default styled(App)`

`;