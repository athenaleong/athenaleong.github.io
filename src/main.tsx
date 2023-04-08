import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './slices'
import DeviceRouter from './container/DeviceRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
        <DeviceRouter />
    </Provider>
  </React.StrictMode>,
)
