import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/MenuModal.css";
import bgImage from "../assets/images/bg.png"; 

const MenuModal = () => {
  const navigate = useNavigate();

  return (
    <div
      className="menu-modal-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="menu-button-container">
        <button className="menu-button" onClick={() => navigate("/PauseResumeMeals")}>
          Pause and Resume
        </button>

        <button className="menu-button" onClick={() => navigate("/RenewalPayment")}>
          Renewal
        </button>

        <button className="menu-button" onClick={() => navigate("/MealPreferenceForm")}>
          Change Your Meal Preference
        </button>

        <button className="menu-button" onClick={() => navigate("/Changedeliverylocation")}>
          Change Your Delivery Location
        </button>

        <button className="menu-button" onClick={() => navigate("/UpdateContactForm")}>
          Update Contact No.
        </button>

        <button className="menu-button" onClick={() => navigate("/Complaint")}>
          Raise a Complaint
        </button>

        <button className="menu-button" onClick={() => navigate("/FeedbackForm")}>
          Feedback
        </button>
      </div>
    </div>
  );
};

export default MenuModal;
