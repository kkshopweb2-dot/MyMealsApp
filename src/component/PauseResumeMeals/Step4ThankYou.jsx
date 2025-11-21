import React from "react";

export default function Step4ThankYou() {
  return (
    <div className="pause-card thankyou">
      <h2>Thank you!</h2>
      <p>We have noted your request.</p>
      <button onClick={() => window.location.reload()}>Make another request</button>
    </div>
  );
}
