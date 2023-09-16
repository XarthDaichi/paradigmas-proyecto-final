import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container d-flex align-items-center">
        <Link to="/" className="navbar-brand text-white d-flex align-items-center">
          <img
            src="/images/info.jpg"
            alt="Logo"
            width="50"
            height="50"
            style={{ marginRight: '10px', borderRadius: '50%' }}
          />
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>One Flow Stream</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                <i className="fas fa-info-circle" style={{ fontSize: '24px', marginRight: '5px' }}></i>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
