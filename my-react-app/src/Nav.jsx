import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

function Nav() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className='navbar'>
        <div className='nav-brand'>
          <h2>One Stone MRM</h2>
        </div>
        
      
        
        {/* Mobile Menu Button */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>One Stone MRM</h3>
          <button className="close-menu" onClick={closeMenu}>✕</button>
        </div>
        
        <div className="sidebar-links">
          <Link 
            to='/' 
            className={location.pathname === '/' ? 'active' : ''}
            onClick={closeMenu}
          >
            Home
          </Link>
         
          
      
        </div>
        
      </div>
    </>
  )
}

export default Nav