import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import AddNotes from './pages/AddNotes.jsx';
import ViewNotes from './pages/ViewNotes.jsx';
import About from './pages/About.jsx';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext.jsx';
import PrivateRoute from './routes/PrivateRoutes.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import ViewUser from './pages/ViewUser.jsx';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Toaster position='top-center' />
      {/* <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> */}
      <UserProvider >
        <Routes>
          <Route path="/" element={<App />} >
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route path='profile' element={<Profile />} roles={["ROLE_USER", "ROLE_ADMIN"]} />
            <Route path='about' element={<About />} />
            <Route path='unauthorized' element={<Unauthorized />} />
          </Route>

          <Route path='/auth/' element={<App />}>
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<Register/>} />
          </Route>

          <Route path='/user/' element={<App />}>
            <Route path='addNotes' element={<PrivateRoute element={<AddNotes />} roles={"ROLE_USER"} />}/>
            <Route path='viewNotes' element={<PrivateRoute element={<ViewNotes />} roles={"ROLE_USER"} />} />
            <Route path='editNotes/:id' element={<PrivateRoute element={<AddNotes />} roles={"ROLE_USER"} />}/>
          </Route>

          <Route path='/admin/' element={<App />}>
            <Route path='viewUser' element={<PrivateRoute element={<ViewUser />} roles={"ROLE_ADMIN"} />}/>
          </Route>
        </Routes>
      </UserProvider>
      {/* </GoogleOAuthProvider> */}
    </BrowserRouter>
)
