import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import PartA from './invioices/PartA'
import PartB from './invioices/PartB'
import Home from './Home'

function Paths() {
  return (
   <BrowserRouter>
   <Routes>
  <Route path="/*" element={<Home />} />
</Routes>
</BrowserRouter>
  )
}

export default Paths