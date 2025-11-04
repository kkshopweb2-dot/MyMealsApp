import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const ThankYouMessage = () => {
  return (
    <div className="update-thank-container">
      <IoCheckmarkCircle className="update-thank-icon" />
      <h2 className="update-thank-title">Thank You!</h2>
      <p className="update-thank-message">
        Thank you for showing concern, it will be updated and you will get
        confirmation via email shortly.
      </p>
    </div>
  );
};

export default ThankYouMessage;
