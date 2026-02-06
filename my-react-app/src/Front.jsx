import React, { useState } from 'react'
import './Front.css'
import MeasurementTable from './MeasurementTable';
import MultiItemMeasurement from './MultiItemMeasurement';

function Front() {
  const [Name, SetName] = useState("");
  const [Address, SetAddress] = useState("");
  const [Phone, SetPhone] = useState("");
  const [ThisDate, SetDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today; // e.g., "2026-01-25"
  });
  const [Refer, SetRefered] = useState("");
  const [Loaded, SetLoaded] = useState("");
  const [Approved, SetApproved] = useState("");
  const [SalesMan, SetSalesMan] = useState("");
  const [Vehicle, SetVehicle] = useState("");

  return (
    <div>
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Customer Information</h2>
        </div>
        
        <form 
          id="demo-form2" 
          data-parsley-validate="" 
          className="form-horizontal form-label-left"
          noValidate
        >
          <div className="form-grid">
            {/* Row 1: Name and Address */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name <span className="required">*</span>
              </label>
              <input 
                value={Name} 
                onChange={(e) => SetName(e.target.value)}
                type="text" 
                id="name" 
                required 
                className="form-control"
                placeholder="Enter full name"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <input 
                value={Address} 
                onChange={(e) => SetAddress(e.target.value)}
                id="address" 
                className="form-control" 
                type="text" 
                name="address"
                placeholder="Enter complete address"
              />
            </div>

            {/* Row 2: Phone and Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Phone Number
              </label>
              <input 
                value={Phone} 
                onChange={(e) => SetPhone(e.target.value)}
                id="phone" 
                className="form-control" 
                type="tel" 
                name="phone"
                placeholder="Enter phone number"
                pattern="[0-9]*"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="date">
                Date <span className="required">*</span>
              </label>
              <input 
                id="date" 
                value={ThisDate} 
                onChange={(e) => SetDate(e.target.value)}
                className="form-control date-picker" 
                required 
                type="date"
              />
            </div>

            {/* Row 3: Referred By and Loaded By */}
            <div className="form-group">
              <label className="form-label" htmlFor="refer">
                Referred By <span className="required">*</span>
              </label>
              <input 
                id="refer" 
                value={Refer} 
                onChange={(e) => SetRefered(e.target.value)}
                className="form-control" 
                type="text" 
                name="refer"
                placeholder="Enter referrer name"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="load">
                Loaded By <span className="required">*</span>
              </label>
              <input 
                id="load" 
                value={Loaded} 
                onChange={(e) => SetLoaded(e.target.value)}
                className="form-control" 
                type="text" 
                name="load"
                placeholder="Enter loader name"
                required
              />
            </div>

            {/* Row 4: Approved By and Sales Man */}
            <div className="form-group">
              <label className="form-label" htmlFor="aprvd">
                Approved By <span className="required">*</span>
              </label>
              <input 
                id="aprvd" 
                value={Approved} 
                onChange={(e) => SetApproved(e.target.value)}
                className="form-control" 
                type="text" 
                name="approved"
                placeholder="Enter approver name"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="sales">
                Sales Man <span className="required">*</span>
              </label>
              <input 
                id="sales" 
                value={SalesMan} 
                onChange={(e) => SetSalesMan(e.target.value)}
                className="form-control" 
                type="text" 
                name="sales"
                placeholder="Enter sales person name"
                required
              />
            </div>

            {/* Row 5: Vehicle No (Full Width) */}
            <div className="form-group full-width">
              <label className="form-label" htmlFor="vehicle">
                Vehicle Number
              </label>
              <input 
                id="vehicle" 
                value={Vehicle} 
                onChange={(e) => SetVehicle(e.target.value)}
                className="form-control" 
                type="text" 
                name="vehicle"
                placeholder="Enter vehicle registration number"
                style={{ maxWidth: '400px' }}
              />
            </div>

            <div className="ln_solid"></div>

            
          </div>
        </form>
      </div>
    </div>
   <MultiItemMeasurement
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
  )
}
 
export default Front