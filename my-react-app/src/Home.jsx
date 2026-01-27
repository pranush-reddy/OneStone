import React from 'react'
import {useLocation,NavLink} from 'react-router-dom'
import Nav from './Nav'
import './Home.css'
import App from './App';
import Invoices from './invioices/Invoices';
function Home() {
    const location = useLocation();
  return (
    <>
    <Nav/>
    <div className='grid'>
        <div className='side-bars'>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Invoices</NavLink></li>
                <li><NavLink to="/create" className={({ isActive }) => isActive ? "active" : ""}>Create</NavLink></li>
            </ul>
        </div>
        <div className='pages'> 
            <div className='main-content'>  
                {location.pathname==="/create" && (<App/>)}
                {location.pathname==="/" && (<Invoices/>)}
            </div>
          
        </div>
    </div>
    </>
  )
}

export default Home