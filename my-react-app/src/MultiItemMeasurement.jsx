import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MeasurementTable from './MeasurementTable';
import './MultiItemMeasurement.css';

function MultiItemMeasurement({ 
  Name, Address, Refer, Phone, ThisDate,
  Loaded, Approved, SalesMan, Vehicle 
}) {
  const navigate = useNavigate();
  
  const [items, setItems] = useState([
    {
      id: 1,
      unit: 'inch to feet',
      ColorSelect: '',
      LotID: '',
      rows: [
        {
          id: 1,
          length: '',
          width: '',
          rate:0,
          less1Length: '',
          less1Width: '',
          less2Length: '',
          less2Width: '',
          less3Length: '',
          less3Width: '',
          less4Length: '',
          less4Width: '',
          less5Length: '',
          less5Width: '',
          less6Length: '',
          less6Width: '',
          area: 0
        }
      ],
      totalArea: 0
    }
  ]);

  // Add a new item/table
  const addItem = () => {
    const newItemId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    const newItem = {
      id: newItemId,
      unit: 'inch to feet',
      ColorSelect: '',
      LotID: '',
      rows: [
        {
          id: 1,
          length: '',
          width: '',
          less1Length: '',
          less1Width: '',
          less2Length: '',
          less2Width: '',
          less3Length: '',
          less3Width: '',
          less4Length: '',
          less4Width: '',
          less5Length: '',
          less5Width: '',
          less6Length: '',
          less6Width: '',
          area: 0
        }
      ],
      totalArea: 0
    };
    setItems([...items, newItem]);
  };

  // Update an item's data
  const updateItem = (itemId, updates) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  // Remove an item
  const removeItem = (itemId) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  // BACK BUTTON: Go back to previous page
  const handleBack = () => {
    navigate(-1);
  };

  // CANCEL BUTTON: Reset form to initial state
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
      setItems([
        {
          id: 1,
          unit: 'inch to feet',
          ColorSelect: '',
          LotID: '',
          rows: [
            {
              id: 1,
              length: '',
              width: '',
              less1Length: '',
              less1Width: '',
              less2Length: '',
              less2Width: '',
              less3Length: '',
              less3Width: '',
              less4Length: '',
              less4Width: '',
              less5Length: '',
              less5Width: '',
              less6Length: '',
              less6Width: '',
              area: 0
            }
          ],
          totalArea: 0
        }
      ]);
    }
  };

  // Handle final submission
  const handleSubmit = () => {
    const allData = {
      // Customer details
      Name, Address, Refer, Phone, ThisDate,
      Loaded, Approved, SalesMan, Vehicle,
      
      // All items data
      items: items.map(item => ({
        id: item.id,
        ColorSelect: item.ColorSelect,
        LotID: item.LotID,
        unit: item.unit,
        totalArea: item.totalArea,
        rows: item.rows
      })),
      
      // Grand total
      grandTotal: parseFloat(grandTotal.toFixed(2))
    };
    
    console.log("Data being sent to quotation:");
    console.log(allData);

    // Navigate to quotation with all data
    navigate("/quotation", { state: allData });
  };

  // Calculate grand total across all items
  const grandTotal = items.reduce((sum, item) => sum + item.totalArea, 0);

  return (
    <div className="multi-item-container">
      {/* Header */}
      <div className="form-header">
        <h2 className="form-title">Measurement List</h2>
        <select disabled className="unit-select" value="inch to feet">
          <option value="inch to feet">Inch to Feet</option>
          <option value="cm to meter">CM to Meter</option>
        </select>
      </div>
      
      {/* Display each item as a separate table */}
      {items.map((item) => (
        <div key={item.id} className="item-section">
          <MeasurementTable
            // Pass item-specific data as props
            itemId={item.id}
            unit={item.unit}
            setUnit={(newUnit) => updateItem(item.id, { unit: newUnit })}
            ColorSelect={item.ColorSelect}
            SetColorSelect={(value) => updateItem(item.id, { ColorSelect: value })}
            LotID={item.LotID}
            SetLotId={(value) => updateItem(item.id, { LotID: value })}
            rows={item.rows}
            setRows={(newRows) => updateItem(item.id, { rows: newRows })}
            totalArea={item.totalArea}
            setTotalArea={(area) => updateItem(item.id, { totalArea: area })}
            
            // Pass functions to remove item
            removeItem={() => removeItem(item.id)}
            
            // Customer data
            Name={Name}
            Address={Address}
            Refer={Refer}
            Phone={Phone}
            ThisDate={ThisDate}
            Loaded={Loaded}
            Approved={Approved}
            SalesMan={SalesMan}
            Vehicle={Vehicle}
          />
        </div>
      ))}
      
      {/* Add Item Button */}
      <div className="add-item-section">
        <button className="btn btn-primary add-item-btn" onClick={addItem}>
          <span className="btn-icon">+</span> Add New Item
        </button>
        <p className="add-item-hint">Click to add another measurement table</p>
      </div>
      
      {/* Grand Total */}
      <div className="grand-total-section">
        <div className="grand-total-card">
          <div className="grand-total-label">Grand Total (All Items)</div>
          <div className="grand-total-value">
            {grandTotal.toFixed(2)} sq ft
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="action-buttons">
        <div className="left-buttons">
          <button className="btn btn-outline-danger cancel-btn" onClick={handleCancel}>
            Cancel & Reset
          </button>
          <button className="btn btn-outline-secondary back-btn" onClick={handleBack}>
            ← Go Back
          </button>
        </div>
        <div className="right-buttons">
          <button className="btn btn-success btn-lg submit-btn" onClick={handleSubmit}>
            <span className="btn-icon">✓</span> Generate Invoice (All Items)
          </button>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="footer-info">
        <p>
          <strong>Items Added:</strong> {items.length} | 
          <strong> Total Items Area:</strong> {grandTotal.toFixed(2)} sq ft | 
          <strong> Status:</strong> Ready to Submit
        </p>
      </div>
    </div>
  );
}

export default MultiItemMeasurement;