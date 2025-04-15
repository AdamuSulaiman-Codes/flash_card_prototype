import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FileContextProvider from './FileContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FileContextProvider>
      <App />
    </FileContextProvider>
  </StrictMode>,
)
