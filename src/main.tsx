import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Desktop from './container/Desktop'
import './index.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Desktop />
    </DndProvider>
  </React.StrictMode>,
)
