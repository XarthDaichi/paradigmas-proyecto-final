import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black" style={{ fontFamily: "'Baloo 2', cursive" }}>
      <div className="container">
        <Link to="/" className="navbar-brand text-white d-flex align-items-center">
          <img
            src="/images/info.jpg"
            alt="Logo"
            width="50"
            height="50"
            className="me-2 rounded-circle"
          />
          <span className="fs-4 fw-bold">One Flow Stream</span>
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                <i className="fas fa-info-circle me-2" style={{ fontSize: '1.5rem' }}></i>
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
