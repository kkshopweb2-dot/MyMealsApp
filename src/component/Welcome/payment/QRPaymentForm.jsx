import React from "react";
import "../../../css/Paycash.css";

export default function QRPaymentForm({
  amount,
  setAmount,
  planName,
  setPlanName,
  transactionId,
  setTransactionId,
  note,
  setNote,
  screenshot,
  setScreenshot,
  onSubmit,
}) {
  const handlePick = (e) => {
    const file = e.target.files[0];
    if (file) setScreenshot(file);
  };

  const handleSubmit = () => {
    if (!screenshot || !transactionId || !planName) {
      alert("Please fill all required fields and upload a screenshot.");
      return;
    }
    onSubmit();
  };

  return (
    <div className="formContainer">
      <h3 className="subTitle">PATRI FOOD AND BEVERAGES</h3>
      <h4 className="subTitle">36152201</h4>

      <img
        src="https://api.qrserver.com/v1/create-qr-code/?data=36152201&size=200x200"
        alt="QR Code"
        className="qr"
      />

      <div className="mymeals-input-group">
        <label>Amount Paid</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div className="mymeals-input-group">
        <label>Plan Name</label>
        <input value={planName} onChange={(e) => setPlanName(e.target.value)} />
      </div>

      <div>
        <label>Share Screenshot *</label>
        <input type="file" className="uploadBox" onChange={handlePick} />
        {screenshot && <p>{screenshot.name}</p>}
      </div>

      <div className="mymeals-input-group">
        <label>Transaction ID *</label>
        <input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
      </div>

      <div className="mymeals-input-group">
        <label>Note</label>
        <input value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <button className="submitBtn" onClick={handleSubmit}>Submit</button>
    </div>
  );
}
