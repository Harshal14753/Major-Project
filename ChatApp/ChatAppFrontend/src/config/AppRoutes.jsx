import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'

function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={ <App/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/register' element={ <h1>Register page</h1> } />
        <Route path='/chat' element={ <h1>Chat Page</h1> } />
    </Routes>
  )
}

export default AppRoutes