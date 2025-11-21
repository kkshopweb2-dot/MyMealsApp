import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const ThankYou = () => (
  <div className="thankyou-container">
    <IoCheckmarkCircle className="thank-icon" />
    <h2 className="thank-title">Thank You!</h2>
    <p className="thank-text">
      We owe you an apology for the issues you faced. <br />
      We will look after it and make sure you won't face it again.
    </p>
  </div>
);

export default ThankYou;
