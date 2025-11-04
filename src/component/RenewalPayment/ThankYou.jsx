import React from "react";
import style from "../../css/Renewal.module.css";
import logo from "../../assets/images/logo.png";

const ThankYou = ({ setPaymentConfirmed }) => (
  <div className={style.thankYouContainer}>
    <div className={style.thankYouBox}>
      <img src={logo} alt="MYMEALS Logo" className={style.logo} />
      <h2 className={style.thankYouTitle}>Thank You! 🎉</h2>
      <p className={style.thankYouText}>Your payment has been received successfully.</p>
      <div className={style.reminder}>
        <strong>Important Reminder 🔔</strong>
        <p>Partial payments may result in non-activation of your subscription.</p>
        <p>Ensure that the amount paid matches the total to avoid issues.</p>
        <p>We will review your payment and contact you via email shortly.</p>
      </div>
      <button className={style.backBtn} onClick={() => setPaymentConfirmed(false)}>
        Back
      </button>
    </div>
  </div>
);

export default ThankYou;
