import React, { useState } from 'react';
import Nav from './Nav';
import './App.css';
import { useNavigate } from 'react-router-dom'

function App() {
  const [Name, SetName] = useState("");
  const [Item,SetItem]=useState("");
  const [Quantity, SetQuantity] = useState(0)
  const [Rate, SetRate] = useState(0);
  const [Transport, SetTransport] = useState(0);
  const [Labour, SetLabour] = useState(0);
  const [StandAdv, SetStandAdv] = useState(0);
  const navigate = useNavigate()


  const SendData=(e)=>{
    e.preventDefault();
   
    if(Name!="" && Item!="" && Quantity!=0 && Rate!=0){
       if(sessionStorage.getItem("data")){
      sessionStorage.removeItem("data");
    }
      sessionStorage.setItem("data", JSON.stringify({
  Name,
  Item,
  Quantity: Number(Quantity),
  Rate:Number(Rate),
  Labour:Number(Labour),
  StandAdv:Number(StandAdv),
  Transport:Number(Transport)
}))

    navigate("/customer-invoice")}else{
      alert("Please fill all the fields")
    }

  }

  return (
    <>
     <Nav/>
      <div id='form'>
        <form onSubmit={SendData}>
          <div className="form-group">
            <label htmlFor="name">Party Name</label>
            <input required id="name" type='text' placeholder="Enter Party name"
              value={Name} onChange={(e) => {SetName(e.target.value)}}/>
              
              
          </div>

          <div className="form-group">Item Name
             <input type='text' placeholder="Enter product name"
              value={Item} onChange={(e) => {SetItem(e.target.value)}}/>
            <label htmlFor="quantity">Quantity</label>
            <input required
              id="quantity"
              type='number' 
              placeholder="Enter quantity"
              min="0" step="any"
              value={Quantity} 
              onChange={(e) => {
                SetQuantity(e.target.value)
              }}
            />
          </div>

          {/* Rate */}
          <div className="form-group">
            <label htmlFor="rate">Rate (per unit)</label>
            <input required
              id="rate" 
              type='number' 
              placeholder="Enter rate per unit"
              min="0"
              step="any"
              value={Rate} 
              onChange={(e) => {
                SetRate(e.target.value)
              }}
            />
          </div>

          {/* Transport Cost */}
          <div className="form-group">
            <label htmlFor="transport">Transport Cost</label>
            <input required
              id="transport" step="any"
              type='number' 
              placeholder="Enter transport cost"
              min="0"
              value={Transport} 
              onChange={(e) => {
                SetTransport(e.target.value)
              }}
            />
          </div>

          {/* Labour Cost */}
          <div className="form-group">
            <label htmlFor="labour">Labour Cost</label>
            <input required
              id="labour"
              type='number' 
              placeholder="Enter labour cost"
              min="0" step={1}
              value={Labour} 
              onChange={(e) => {
                SetLabour(e.target.value)
              }}
            />
          </div>

          {/* Standard Advance */}
          <div className="form-group">
            <label htmlFor="standAdv">Standard Advance</label>
            <input required
              id="standAdv"
              type='number' 
              placeholder="Enter standard advance"
              min="0" step="any"
              value={StandAdv} 
              onChange={(e) => {
                SetStandAdv(e.target.value)
              }}
            />
          </div>
          <button id='submit-btn' type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default App