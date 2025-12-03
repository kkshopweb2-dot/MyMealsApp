import React from "react";

export default function Step4ThankYou({ handleAnotherRequest }) {
  return (
    <div className="thank-you-message">
      <h2>Thank you!</h2>
      <p>We have noted your request.</p>
      <div className="button-group">
        <button className="submit-btn" onClick={handleAnotherRequest}>Make another request</button>
      </div>
    </div>
  );
}
