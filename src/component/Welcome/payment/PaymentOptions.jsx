import React from "react";
import "../../../css/Paycash.css";

export default function PaymentOptions({ payByQR, setPayByQR, payByCash, setPayByCash, onNext }) {
  return (
    <div className="mymeals-payment-container">
      <h2 className="mymeals-payment-title">Choose Payment Method</h2>

      <div className="mymeals-option-row">
        <input
          type="checkbox"
          checked={payByQR}
          onChange={(e) => {
            setPayByQR(e.target.checked);
            if (e.target.checked) setPayByCash(false);
          }}
        />
        <span className="mymeals-option-text">Pay through QR Code</span>
      </div>

      <div className="mymeals-option-row">
        <input
          type="checkbox"
          checked={payByCash}
          onChange={(e) => {
            setPayByCash(e.target.checked);
            if (e.target.checked) setPayByQR(false);
          }}
        />
        <span className="mymeals-option-text">Pay Cash</span>
      </div>

      {(payByQR || payByCash) && (
        <button className="mymeals-btn" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  );
}
