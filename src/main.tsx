import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Desktop from './container/Desktop'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Desktop />
  </React.StrictMode>,
)
