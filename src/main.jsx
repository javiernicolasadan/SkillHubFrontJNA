import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import SessionContextProvider from './contexts/SessionContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Router>
    <SessionContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </SessionContextProvider>
    </Router>
)
