import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import Login from './Pages/Login/Login.jsx';
import Video from './Pages/VideoPage/VideoPage.jsx';
// import { BrowserRouter, Route, Routes } from "react-router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Details from './Pages/Details/Details.jsx';
import User from './Pages/Users/Users.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastContainer />
    <Routes>
     <Route path='/' element={<App/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/details/:id' element={<Details/>}/>
     <Route path='/video/:id' element={<Video/>}/>
     <Route path='/users' element={<User/>}/>
     
    </Routes>
  </BrowserRouter>
)
