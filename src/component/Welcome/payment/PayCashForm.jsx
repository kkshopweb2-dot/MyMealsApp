import React, { useState } from "react";
import "../../../css/Paycash.css";

export default function PayCashForm({ onSubmit }) {
  const [amountPaid, setAmountPaid] = useState("");
  const [cashPaidOption, setCashPaidOption] = useState("");
  const [deliveryBoyName, setDeliveryBoyName] = useState("");
  const [deliveryBoyMobile, setDeliveryBoyMobile] = useState("");
  const [cashDate, setCashDate] = useState("");
  const [cashTime, setCashTime] = useState("");
  const [cashNote, setCashNote] = useState("");

  const handleSubmit = () => {
    if (!amountPaid || !cashPaidOption) {
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
        <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} />
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
            <input value={deliveryBoyName} onChange={(e) => setDeliveryBoyName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Delivery Boy Mobile *</label>
            <input value={deliveryBoyMobile} onChange={(e) => setDeliveryBoyMobile(e.target.value)} />
          </div>
        </>
      )}

      <div className="form-group">
        <label>Select Date</label>
        <input type="date" value={cashDate} onChange={(e) => setCashDate(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Select Time</label>
        <input type="time" value={cashTime} onChange={(e) => setCashTime(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Note</label>
        <textarea value={cashNote} onChange={(e) => setCashNote(e.target.value)} />
      </div>

      <button className="mymeals-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
