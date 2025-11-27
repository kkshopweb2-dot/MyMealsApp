import React from "react";
import logo from "../../assets/images/logo.png";

const ThankYou = ({ setPaymentConfirmed }) => (
  <div className="thank-you-content">
    
    <h2 className="thank-you-title">Thank You! 🎉</h2>
    <p className="thank-you-text">Your payment has been received successfully.</p>
    <div className="reminder">
      <strong>Important Reminder 🔔</strong>
      <p>Partial payments may result in non-activation of your subscription.</p>
      <p>Ensure that the amount paid matches the total to avoid issues.</p>
      <p>We will review your payment and contact you via email shortly.</p>
    </div>
    <div className="button-group">
      <button className="back-btn" onClick={() => setPaymentConfirmed(false)}>
        Back
      </button>
    </div>
  </div>
);

export default ThankYou;
