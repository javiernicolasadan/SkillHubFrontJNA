import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import SessionContextProvider from './contexts/SessionContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
    </Router>
  </React.StrictMode>
)
