import React, { useState, useEffect, useRef } from 'react';
import StockForm from './components/StockForm';
import './App.css'; // Import the App.css for styling

function App() {
  // Track the active page
  const [currentPage, setCurrentPage] = useState('home');
  // Track whether the sidebar is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // Create refs for sidebar and burger menu
  const sidebarRef = useRef(null);
  const burgerMenuRef = useRef(null);

  // Toggle the sidebar visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Navigate to different pages
  const navigate = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);  // Close the menu when a page is selected
  };

  // Close the sidebar if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current && !sidebarRef.current.contains(event.target) && 
        burgerMenuRef.current && !burgerMenuRef.current.contains(event.target)
      ) {
        setMenuOpen(false); // Close the menu if clicked outside
      }
    };

    // Add event listener for clicking outside
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <div className="header">
        <div ref={burgerMenuRef} className="burger-menu" onClick={toggleMenu}>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </div>        
        <h1>Bubba Bean Counter</h1>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar ${menuOpen ? 'open' : ''}`}
      >
        <ul>
          <li>
            <button onClick={() => navigate('home')}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate('stock-form')}>Stock Form</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {currentPage === 'home' && <h2>Welcome to the Stock Procurement Dashboard</h2>}
        {currentPage === 'stock-form' && <StockForm />}
      </div>
    </div>
  );
}

export default App;
