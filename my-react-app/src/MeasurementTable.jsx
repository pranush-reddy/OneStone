import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from './Table';
import './Measurement.css';

function MeasurementTable({ 
  itemId,
  unit,
  setUnit,
  ColorSelect,
  SetColorSelect,
  LotID,
  SetLotId,
  rows,
  setRows,
  totalArea,
  setTotalArea,
  removeItem,
  
  // Customer data
  Name, Address, Refer, Phone, ThisDate,
  Loaded, Approved, SalesMan, Vehicle
}) {
  const navigate = useNavigate();

  // Calculate area for a single row
  const calculateArea = (row, unitType) => {
    const mainArea = (parseFloat(row.length) || 0) * (parseFloat(row.width) || 0);
    
    const deductions = [
      (parseFloat(row.less1Length) || 0) * (parseFloat(row.less1Width) || 0),
      (parseFloat(row.less2Length) || 0) * (parseFloat(row.less2Width) || 0),
      (parseFloat(row.less3Length) || 0) * (parseFloat(row.less3Width) || 0),
      (parseFloat(row.less4Length) || 0) * (parseFloat(row.less4Width) || 0),
      (parseFloat(row.less5Length) || 0) * (parseFloat(row.less5Width) || 0),
      (parseFloat(row.less6Length) || 0) * (parseFloat(row.less6Width) || 0)
    ];
    
    const totalDeductions = deductions.reduce((sum, deduction) => sum + deduction, 0);
    
    // Calculate net area (convert based on unit)
    let netArea = mainArea - totalDeductions;
    
    // Convert based on selected unit
    if (unitType === 'inch to feet') {
      netArea = netArea / 144; // Square inches to square feet
    } else if (unitType === 'cm to meter') {
      netArea = netArea / 10000; // Square cm to square meters
    }
    
    return parseFloat(netArea.toFixed(3)) || 0;
  };

  // Update a specific row
  const updateRow = (id, field, value) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        updatedRow.area = calculateArea(updatedRow, unit);
        return updatedRow;
      }
      return row;
    });
    
    setRows(updatedRows);
  };

  // Recalculate total area whenever rows or unit changes
// In MeasurementTable.js - FIXED VERSION
useEffect(() => {
  const newTotal = rows.reduce((sum, row) => sum + row.area, 0);
  setTotalArea(parseFloat(newTotal.toFixed(2)));
}, [rows, unit]); // Remove setTotalArea from dependencies
  // Add a new row to the table
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
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
    };
    
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
  };

  // Remove a specific row
  const removeRow = (id) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter(row => row.id !== id);
      // Reassign IDs to maintain sequence
      const reindexedRows = updatedRows.map((row, index) => ({
        ...row,
        id: index + 1
      }));
      setRows(reindexedRows);
    }
  };

  // Clear all rows (reset table)
  const clearAllRows = () => {
    if (window.confirm('Are you sure you want to clear all rows?')) {
      const resetRows = [{
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
        rate:0,
        less6Width: '',
        area: 0
      }];
      setRows(resetRows);
    }
  };

  // Render input field for table cells
  const renderInput = (rowId, fieldName, value) => (
    <input style={{height:'2.2em'}}
      type="number"
      step="0.1"
      value={value}
      onChange={(e) => updateRow(rowId, fieldName, e.target.value)}
    
      className="table-input"
    />
  );

  // Render row with remove button
  const renderRow = (row, index) => (
    <tr key={row.id}>
      <td style={{ width: '1%' }} className="row-number">
        {row.id}
        {rows.length > 1 && (
          <button 
            className="remove-row-btn"
            onClick={() => removeRow(row.id)}
            title="Remove this row"
          >
            ×
          </button>
        )}
      </td>
      
      {/* Main Size */}
      <td className='sizes' style={{padding:'0px'}}>{renderInput(row.id, 'length', row.length)}</td>
      <td className="multiplier" style={{padding:'0px'}}>×</td>
      <td className='sizes' style={{padding:'0px'}}>{renderInput(row.id, 'width', row.width)}</td>
      
      {/* Less 1 */}
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less1Length', row.less1Length)}</td>
      <td className="multiplier" style={{padding:'0px'}}>×</td>
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less1Width', row.less1Width)}</td>
      
      {/* Less 2 */}
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less2Length', row.less2Length)}</td>
      <td className="multiplier">×</td>
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less2Width', row.less2Width)}</td>
      
      {/* Less 3 */}
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less3Length', row.less3Length)}</td>
      <td className="multiplier">×</td>
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less3Width', row.less3Width)}</td>
      
      {/* Less 4 */}
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less4Length', row.less4Length)}</td>
      <td className="multiplier">×</td>
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less4Width', row.less4Width)}</td>
      
      {/* Less 5 */}
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less5Length', row.less5Length)}</td>
      <td className="multiplier">×</td>
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less5Width', row.less5Width)}</td>
      
      {/* Less 6 */}
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less6Length', row.less6Length)}</td>
      <td className="multiplier">×</td>
      <td style={{padding:'0px'}}>{renderInput(row.id, 'less6Width', row.less6Width)}</td>
      
      {/* Area */}
      <td className="area-cell" style={{ width: '8%',padding:'0px' }}>
        <span className="area-value">{row.area.toFixed(2)}</span>
      </td>
    </tr>
  );

  return (
    <div className="measurement-container">
      <div className="item-header">
        
        {itemId > 1 && (
          <div 
            className="remove">
          <button 
            onClick={removeItem}
          >
            Remove 
          </button></div>
        )}
      </div>
      
      <div className="form-content">
        {/* Table Component */}
        <Table
          rows={rows}
          unit={unit}
          updateRow={updateRow}
          renderInput={renderInput}
          ColorSelect={ColorSelect}
          SetColorSelect={SetColorSelect}
          LotID={LotID}
          SetLotId={SetLotId}
          renderRow={renderRow}
          itemId={itemId}
        />
        
        <div className='total-area-each'>
          <div className="total-display">
            <span className="total-label">Item Total Area:</span>
            <span className="total-value">
              {totalArea.toFixed(2)} {unit === 'inch to feet' ? 'sq ft' : 'sq m'}
            </span>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button 
              className="btn btn-secondary"
              onClick={addRow}
            >
              + Add Row
            </button>
            <button 
              className="btn btn-warning"
              onClick={clearAllRows}
              disabled={rows.length <= 1}
            >
              Clear All Rows
            </button>
          </div>
        </div>
        

      </div>
    </div>
  );
}

export default MeasurementTable;