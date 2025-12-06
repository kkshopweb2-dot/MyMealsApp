import React from 'react';
import { NavLink } from "react-router-dom";
import { FaBars, FaBell, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import '../css/header.css';
import { imageBaseURL } from '../api/baseURL';

const Header = ({ toggleSidebar, onLogout, username = "User", userImage }) => {
  return (
    <header className="dashboard-header">
      <div className="left-section">
        <button
          type="button"
          title="menu"
          className="menu-toggle"
          style={{ color: 'black' }}
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        {/* Search Bar */}
        <div className="header-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        {/* Hello User */}
        <div className="hello-user">
          Hello, <strong>{username}</strong>
        </div>

        {/* Notification */}
        <div className="notification-bell">
          <FaBell />
          <span className="badge">0</span>
        </div>

        {/* Profile */}
        <NavLink to="/Profile" className="profile-avatar">
          <img src={userImage ? `${imageBaseURL}${userImage}` : "https://i.pravatar.cc/40"} alt="User Avatar" />
        </NavLink>


        {/* Logout */}
        <button className="logout-btn" onClick={onLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
