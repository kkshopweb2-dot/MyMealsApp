import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserAlt,
  FaRedoAlt,
  FaUtensils,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaExclamationCircle,
  FaCommentDots,
} from "react-icons/fa";
import "../css/Sidebar.css";
import logo from "../assets/images/logo.png";   


const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* LOGO IMAGE */}
      <div className="logo">
        <img src={logo} alt="MyMeal Logo" className="logo-img" />
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/PauseResumeMeals" className="menu-link">
              <FaUserAlt /> Pause and Resume
            </NavLink>
          </li>

          <li>
            <NavLink to="/RenewalPayment" className="menu-link">
              <FaRedoAlt /> Renewal
            </NavLink>
          </li>

          <li>
            <NavLink to="/MealPreferenceForm" className="menu-link">
              <FaUtensils /> Change Your Meal Preference
            </NavLink>
          </li>

          <li>
            <NavLink to="/Changedeliverylocation" className="menu-link">
              <FaMapMarkerAlt /> Change Your Delivery Location
            </NavLink>
          </li>

          <li>
            <NavLink to="/UpdateContactForm" className="menu-link">
              <FaPhoneAlt /> Update Contact No.
            </NavLink>
          </li>

          <li>
            <NavLink to="/Complaint" className="menu-link">
              <FaExclamationCircle /> Raise a Complaint
            </NavLink>
          </li>

          <li>
            <NavLink to="/FeedbackForm" className="menu-link">
              <FaCommentDots /> Feedback
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
