import React, { useState } from "react";
import "../../../css/Paycash.css";

export default function PayCashForm({ formDataRef, handleChange, onSubmit, }) {
  
  const [cashPaidOption, setCashPaidOption] = useState("");

  const handleSubmit = () => {
    formDataRef.current.set("cashPaidOption",cashPaidOption);
    if ( !cashPaidOption) {
      alert("Please fill all required fields.");
      return;
    }
    onSubmit();
  };

  return (
    <div className="paycash-card">
      <h1 className="paycash-title">Pay Cash</h1>

      <div className="form-group">
        <label>Amount Paid *</label>
        <input type="number" value={formDataRef.current.get("amount")} readOnly />
      </div>

      <div className="form-group">
        <label>Cash Paid</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="cashPaidOption"
              value="deliveryBoy"
              checked={cashPaidOption === "deliveryBoy"}
              onChange={(e) => setCashPaidOption(e.target.value)}
            />
            Delivery Boy
          </label>
          <label>
            <input
              type="radio"
              name="cashPaidOption"
              value="office"
              checked={cashPaidOption === "office"}
              onChange={(e) => setCashPaidOption(e.target.value)}
            />
            At Office
          </label>
        </div>
      </div>

      {cashPaidOption === "deliveryBoy" && (
        <>
          <div className="form-group">
            <label>Delivery Boy Name *</label>
            <input name="deliveryBoyName" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Delivery Boy Mobile *</label>
            <input typr="number" name="deliveryBoyMobile" onChange={handleChange} />
          </div>
        </>
      )}

      <div className="form-group">
        <label>Select Date</label>
        <input type="date" name="cashDate" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Select Time</label>
        <input type="time" name="cashTime" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Note</label>
        <textarea name="cashNote" onChange={handleChange} />
      </div>

      <button className="mymeals-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
