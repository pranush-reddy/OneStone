import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import './App.css';
import PartA from './invoices/PartA';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if state exists, if not navigate to /create
  React.useEffect(() => {
    if (!location.state) {
      navigate('/createinvoice');
    }
  }, [location.state, navigate]);
  
  // If no state, don't render anything (will redirect)
  if (!location.state) {
    return null; // or a loading spinner
  }
  
  return (
    <>
        <PartA {...location.state} />
    </>
  );
}

export default App;