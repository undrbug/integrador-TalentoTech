import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './components/AuthContext.jsx';


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
      <AuthProvider>
        <>
        <App />
        <ToastContainer />
        </>
      </AuthProvider>
)
