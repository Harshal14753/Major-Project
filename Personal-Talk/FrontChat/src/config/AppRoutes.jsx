import React from 'react'
import {Routes, Route } from "react-router";
import App from "../App"
import ChatPage from '../components/ChatPage';

function AppRoutes() {
  return (
    <>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={ <h1>This is about page</h1>} />
      <Route path="/chat" element={ <ChatPage />} />
      <Route path="*" element={ <h1>Page not found 404 error</h1>} />
    </Routes>
    </>
  )
}

export default AppRoutes