import React, { useState } from "react";
import "../../css/Success.css";
import bg from "../../assets/images/bg.png";
import logo from "../../assets/images/logo.png";

export default function SuccessSection({ onDone }) {
  const [agree, setAgree] = useState(false);
  const [step, setStep] = useState("reminder");

  const handleAgree = () => {
    if (!agree) {
      alert("Please agree before proceeding.");
      return;
    }
    setStep("thankyou");
  };

  return (
    <div className="success-container" style={{ backgroundImage: `url(${bg})` }}>
      {step === "reminder" ? (
        <div className="card">
          <h1 className="title">Thank you for your payment!</h1>
          <p className="subtitle">and for sharing the screenshot 📸</p>

          <h2 className="reminderTitle">Important Reminder ⚠️</h2>

          <p className="paragraph">
            Please note that <span className="bold">not making the full payment</span> or making only a{" "}
            <span className="bold">partial payment</span> will result in <span className="bold">no refund</span> and
            your subscription <span className="bold">will not be activated.</span>
          </p>

          <p className="paragraph">
            Kindly ensure that the amount paid matches the <span className="bold">“Amount Paid”</span> section to avoid
            any issues.
          </p>

          <div className="checkboxContainer">
            <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} id="agree" />
            <label htmlFor="agree" className="agreeText">Yes, I Agree</label>
          </div>

          <button className={`button ${agree ? "active" : ""}`} onClick={handleAgree} disabled={!agree}>
            Continue
          </button>
        </div>
      ) : (
        <div className="thankyou-card">
          <img src={logo} alt="Logo" className="logo" />
          <div className="check">✔</div>
          <h1 className="thankyou">Thank You!</h1>
          <p className="note">We will review your payment and get back to you via email shortly.</p>
          <button className="mymeals-btn" onClick={onDone}>Back to Home</button>
        </div>
      )}
    </div>
  );
}
