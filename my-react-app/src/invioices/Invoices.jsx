// Invoices.js
import React, { useState, useEffect } from 'react'
import './Invoices.css'

const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  
  // Load invoices from sessionStorage
  useEffect(() => {
    const storedInvoices = sessionStorage.getItem("InvoiceDetails")
    if (storedInvoices) {
      const invoicesObj = JSON.parse(storedInvoices)
      const invoiceList = Object.entries(invoicesObj).map(([invoiceNo, data]) => ({
        invoiceNo,
        ...data
      }))
      setInvoices(invoiceList)
    }
  }, [])
  

  const formatForDisplay = (yyyymmdd) => {
  const [yyyy, mm, dd] = yyyymmdd.split("-");
  return `${dd}-${mm}-${yyyy}`; 
};
  
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
                  <td>{invoice.invoiceNo}</td>
                  <td>{invoice.Name || 'N/A'}</td>
                  <td>{formatForDisplay(invoice.Date) || 'N/A'}</td>
                  <td>₹{invoice.Grand || 'N/A'}</td>
                  <td>₹{invoice.Dispatch1 || 'N/A'}</td>
                 <td>₹{invoice.Dispatch2 || 'N/A'}</td>
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