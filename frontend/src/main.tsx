import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider} from './context/AuthContext.tsx'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'


axios.defaults.baseURL='http://localhost:8080/api/v1'
axios.defaults.withCredentials=true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Toaster position='top-right'/>
    <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
