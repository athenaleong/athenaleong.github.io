import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Desktop from './container/Desktop'
import './index.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Provider } from 'react-redux'
import store from './slices'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Desktop />
      </DndProvider>
    </Provider>
  </React.StrictMode>,
)
