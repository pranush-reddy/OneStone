import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import OverviewTemplate from './OverviewTemplate'

function InvoiceOverview() {
  const { id } = useParams() // Get invoice ID from URL
  const location = useLocation()
  const [invoiceData, setInvoiceData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadInvoiceData()
  }, [id])
  
  const loadInvoiceData = () => {
    // First, check if data was passed via navigation state
    if (location.state) {
      setInvoiceData(location.state)
      setLoading(false)
      return
    }
    
    // If not, fetch from localStorage/sessionStorage
    try {
      // Try sessionStorage first (or localStorage)
      const storedInvoices = sessionStorage.getItem("InvoiceDetails") || 
                             localStorage.getItem("InvoiceDetails")
      
      if (storedInvoices) {
        const invoicesObj = JSON.parse(storedInvoices)
        
        // Find the specific invoice by ID
        if (invoicesObj[id]) {
          const invoice = {
            invoiceNo: id,
            ...invoicesObj[id]
          }
          setInvoiceData(invoice)
        } else {
          console.error('Invoice not found in storage')
        }
      }
    } catch (error) {
      console.error('Error loading invoice:', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return <div>Loading invoice details...</div>
  }
  
  if (!invoiceData) {
    return <div>Invoice not found</div>
  }
  
  return <OverviewTemplate data={invoiceData} />
}

export default InvoiceOverview