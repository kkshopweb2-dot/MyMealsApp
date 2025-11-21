import React from "react";
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

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="logo">MyMeal</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <FaHome /> Dashboard
          </li>
          <li>
            <FaUserAlt /> <a href="PauseResumeMeals">Pause and Resume</a>
          </li>
          <li>
            <FaRedoAlt /> <a href="RenewalPayment">Renewal</a>
          </li>
          <li>
            <FaUtensils /> <a href="MealPreferenceForm">Change Your Meal Preference</a> 
          </li>
          <li>
            <FaMapMarkerAlt /><a href="Changedeliverylocation">Change Your Delivery Location</a> 
          </li>
          <li>
            <FaPhoneAlt /><a href="UpdateContactForm">Update Contact No.</a> 
          </li>
          <li>
            <FaExclamationCircle /><a href="Complaint"> Raise a Complaint</a>
          </li>
          <li>
            <FaCommentDots /><a href="FeedbackForm">Feedback</a> 
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
