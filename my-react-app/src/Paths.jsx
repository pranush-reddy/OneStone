import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import PartA from './invioices/PartA'
import PartB from './invioices/PartB'

function Paths() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<App />} />
    <Route path="/customer-invoice" element={<PartA />} />
     <Route path="/admin-invoice" element={<PartB />} />
</Routes>
</BrowserRouter>
  )
}

export default Paths