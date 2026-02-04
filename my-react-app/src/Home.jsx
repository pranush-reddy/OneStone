import React from 'react'
import {useLocation,NavLink} from 'react-router-dom'
import Nav from './Nav'
import './Home.css'
import App from './App';
import Invoices from './invioices/Invoices';
import Front from './Front';
function Home() {
    const location = useLocation();
  return (
    <>
    <Nav/>
   
    <div className='grid'>
        <div className='side-bars'>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Invoices</NavLink></li>
                <li><NavLink to="/quotation" className={({ isActive }) => isActive ? "active" : ""}>Quotation</NavLink></li>
                <li><NavLink to="/createinvoice" className={({ isActive }) => isActive ? "active" : ""}>Create</NavLink></li>
            </ul>
        </div>
        <div className='pages'> 
            <div className='main-content'>  
                {location.pathname==="/quotation" && (<App/>)}
                {location.pathname==="/" && (<Invoices/>)}
                {location.pathname==="/createinvoice" && (<Front/>)}
            </div>
          
        </div>
    </div>
    </>
  )
}

export default Home