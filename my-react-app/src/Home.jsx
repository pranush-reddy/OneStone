import React, { useState } from "react";
import { useLocation, NavLink, useParams } from "react-router-dom";
import Nav from "./Nav";
import "./Home.css";
import App from "./App";
import Invoices from "./invoices/Invoices";
import Front from "./Front";
import InvoiceOverview from "./invoices/InvoiceOverview";

function Home() {
  const location = useLocation();
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Check if we're on an invoice overview path
  const isInvoiceOverview = location.pathname.startsWith("/invoices/overview/");
  const invoiceId = isInvoiceOverview
    ? location.pathname.split("/").pop()
    : null;

  // Function to handle invoice selection from Invoices component
  const handleInvoiceSelect = (invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <>
      <Nav />

      <div className="grid">
        <div className="side-bars">
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>- Dashboard</NavLink>
            </li>
            <li>
            <NavLink to ="/"  className={({ isActive, isPending }) => {
                                    const invoicesActive = isActive || window.location.pathname.startsWith('/invoices/overview/')
                                    return invoicesActive ? "active" : ""
                                }} >- Invoices</NavLink>
            </li>
            <li>
              <NavLink to="/createinvoice" className={({ isActive }) => (isActive ? "active" : "")}>- Estimation/Quotation</NavLink>
            </li>
          </ul>
        </div>

        <div className="pages">
          <div className="main-content">
            {/* Invoice Overview */}
            {isInvoiceOverview && (
              <div className="invoice-overview-wrapper">
                <div className="overview-header">
                  <button 
                    onClick={() => {
                      setSelectedInvoice(null);
                      window.history.back();
                    }}
                    className="back-button"
                  >
                    ← Back to Invoices
                  </button>
                  <h2>Invoice Overview #{invoiceId}</h2>
                </div>
                <InvoiceOverview />
              </div>
            )}

            {/* Regular Pages */}
            {!isInvoiceOverview && location.pathname === "/quotation" && (
              <App />
            )}
            {!isInvoiceOverview && location.pathname === "/" && (
              <Invoices onInvoiceSelect={handleInvoiceSelect} />
            )}
            {!isInvoiceOverview && location.pathname === "/createinvoice" && (
              <Front />
            )}
            {!isInvoiceOverview && location.pathname === "/dashboard" && (
              <div>
                <h2>Dashboard</h2>
                <p>Welcome to your dashboard!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
