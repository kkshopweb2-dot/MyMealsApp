import React from "react";

export default function Step4ThankYou() {
  return (
    <div className="thank-you-message">
      <h2>Thank you!</h2>
      <p>We have noted your request.</p>
      <div className="button-group">
        <button className="submit-btn" onClick={() => window.location.reload()}>Make another request</button>
      </div>
    </div>
  );
}
