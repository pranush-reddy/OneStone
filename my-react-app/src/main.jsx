import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Paths  from './Paths.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Paths />
  </StrictMode>,
)
