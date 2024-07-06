import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './components/navbar/Navbar.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Páginas 

import PrecoTeto from './components/pages/PrecoTeto.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
  <BrowserRouter>
  <Navbar />
    <Routes>
        <Route exact path='/' element={ <App />}/>
        <Route path='/calculadora/precoteto' element={ <PrecoTeto />}/>     
    </Routes>
  </BrowserRouter>


 
   
  </React.StrictMode>,
)
