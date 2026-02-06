import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Invoices.css'

const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  // Load invoices from sessionStorage
  useEffect(() => {
    loadInvoices()
  }, [])
  
  const loadInvoices = () => {
    try {
      const storedInvoices = sessionStorage.getItem("InvoiceDetails")
      
      if (storedInvoices) {
        const invoicesObj = JSON.parse(storedInvoices)
        
        // Check if invoicesObj is an object, not an array
        if (invoicesObj && typeof invoicesObj === 'object') {
          // Convert object to array
          const invoiceList = Object.entries(invoicesObj).map(([invoiceNo, data]) => ({
            invoiceNo,
            ...data
          }))
          setInvoices(invoiceList)
        } else if (Array.isArray(invoicesObj)) {
          // If it's already an array, use it directly
          setInvoices(invoicesObj)
        } else {
          // Handle unexpected format
          console.warn('Unexpected invoices format:', invoicesObj)
          setInvoices([])
        }
      } else {
        setInvoices([])
      }
    } catch (error) {
      console.error('Error parsing invoices:', error)
      setInvoices([])
    } finally {
      setLoading(false)
    }
  }
  
  const handleOverview = (invoice) => {
    navigate(`/invoices/overview/${invoice.invoiceNo}`, { 
      state: invoice 
    })
  }

  const formatForDisplay = (yyyymmdd) => {
    if (!yyyymmdd) return 'N/A'
    const [yyyy, mm, dd] = yyyymmdd.split("-")
    return `${dd}-${mm}-${yyyy}`
  }
  
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'N/A'
    return `₹${amount.toLocaleString('en-IN')}`
  }
  
  if (loading) {
    return (
      <div className="invoices-container">
        <h2>Invoices</h2>
        <div className="loading">
          <p>Loading invoices...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="invoices-container">
      <h2>Invoices</h2>
      
      {invoices.length === 0 ? (
        <div className="no-invoices">
          <p>No invoices created yet.</p>
        </div>
      ) : (
        <div className="invoices-list">
          <table className="invoices-table">
            <thead>
              <tr>
                <th>Invoice No.</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Dispatch 1</th>
                <th>Dispatch 2</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.invoiceNo}>
                  <td  onClick={() => handleOverview(invoice)}
                    style={{cursor: 'pointer',color:'#8f50ee', fontWeight:'600', textDecoration: 'underline'}}>
                    {invoice.invoiceNo}
                  </td>
                  <td>
                    {invoice.Name || 'N/A'}
                  </td>
                  <td>{formatForDisplay(invoice.Date)}</td>
                  <td>{formatCurrency(invoice.Grand)}</td>
                  <td>{formatCurrency(invoice.Dispatch1)}</td>
                  <td>{formatCurrency(invoice.Dispatch2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Invoices