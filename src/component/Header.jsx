import React, { useState } from 'react';
import { store } from '../redux/store';
import { logout } from '../redux/authSlice';
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import '../css/header.css';
import { imageBaseURL } from '../api/baseURL';

const Header = ({ toggleSidebar, username = "User", userImage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };
  const onLogout = ()=>{
     store.dispatch(logout());
     window.location.reload();
  };
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            type="button"
            className="search-button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="header-right">
        {/* Hello User */}
        <div className="hello-user">
          Hello, <strong>{username}</strong>
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

