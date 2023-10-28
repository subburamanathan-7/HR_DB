import React, { createContext, useState } from 'react'
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import DBHome from './screens/DBHome'
import MainDashboard from './screens/MainDashboard'

import LoginForm from './components/LoginForm'
import AdminLoginForm from './components/AdminLoginForm'
import GlobalHR from './screens/GlobalHR'
import DirectorsDashboard from './screens/DirectorsDashboard'
import { Spinner } from './components/Spinner'
import FileUploadForm from './components/FileUploadForm'

export const currentUserContext = createContext(null)

export function App() {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <>
      <currentUserContext.Provider
      value={{currentUser,setCurrentUser}}>
        <Router>
        <Routes>
            <Route path="/" element={<DBHome/>}/>  
            <Route path="/login" element={<LoginForm/>}/>  
            <Route path="/admin" element={<AdminLoginForm/>}/>  
            <Route path="/dashboard" element={<MainDashboard/>}/>  
            <Route path="/ddashboard" element={<DirectorsDashboard/>}/>  
            <Route path="/globalHR" element={<GlobalHR/>}/>  
            <Route path="/upload" element={<FileUploadForm/>}/>  


            
        </Routes>

        </Router>
    </currentUserContext.Provider>
    </>
  )
}
