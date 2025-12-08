import React from 'react';
import { store } from '../redux/store';
import { logout } from '../redux/authSlice';
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaSignOutAlt } from 'react-icons/fa';
import '../css/header.css';
import { imageBaseURL } from '../api/baseURL';

const Header = ({ toggleSidebar, username = "User", userImage }) => {
  const navigate = useNavigate();

  const onLogout = () => {
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
      </div>

      <div className="header-right">
        {/* Hello User */}
        <div className="hello-user">
          Hello, <strong>{username}</strong>
        </div>

        {/* Profile */}
        <NavLink to="/Profile" className="profile-avatar">
          <img
            src={userImage ? `${imageBaseURL}${userImage}` : "https://i.pravatar.cc/40"}
            alt="User Avatar"
          />
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
