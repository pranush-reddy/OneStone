import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import InvoiceOverview from './invoices/InvoiceOverview'

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