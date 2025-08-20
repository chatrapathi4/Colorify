import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'hex-finder', label: 'HEX Finder' },
    { id: 'templates', label: 'Templates' },
    { id: 'suggestions', label: 'Suggestions' }
  ];

  const handleLinkClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Mobile menu button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Left side navigation - Desktop */}
          <div className="navbar-links">
            {navItems.slice(0, 2).map((item) => (
              <button
                key={item.id}
                className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Center - Colorify title */}
          <div className="flex-1 flex justify-center">
            <button className="navbar-logo" onClick={() => handleLinkClick('home')}>
              Colorify
            </button>
          </div>

          {/* Right side navigation - Desktop */}
          <div className="navbar-links">
            {navItems.slice(2).map((item) => (
              <button
                key={item.id}
                className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile placeholder for spacing */}
          <div className="w-8 md:hidden"></div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-menu-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;