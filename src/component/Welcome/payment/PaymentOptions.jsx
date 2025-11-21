import React from "react";
import "../../../css/Paycash.css";

export default function PaymentOptions({ payByQR, setPayByQR, payByCash, setPayByCash, onNext }) {
  return (
    <div className="mymeals-payment-container">
      <h2 className="mymeals-payment-title">Choose Payment Method</h2>

      <div className="mymeals-option-row">
        <input id="payByQR"
          type="checkbox" onClick={onNext}
          checked={payByQR}
          onChange={(e) => {
            setPayByQR(e.target.checked);
            if (e.target.checked) setPayByCash(false);
          }}
        />
        <label htmlFor="payByQR" className="mymeals-option-text">Pay through QR Code</label>
      </div>

      <div className="mymeals-option-row">
        <input  id="payByCash"
          type="checkbox"
          checked={payByCash} 
          onClick={onNext}
          onChange={(e) => {
            setPayByCash(e.target.checked);
            if (e.target.checked) setPayByQR(false);
          }}
        />
        <label htmlFor="payByCash" className="mymeals-option-text">Pay Cash</label>
      </div>

       {(payByQR || payByCash) && (
        <button className="mymeals-btn" onClick={onNext}>
          Next
        </button>
      )} 
    </div>
  );
}
