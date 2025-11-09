import React from "react";
import "../../../css/Paycash.css";

export default function QRPaymentForm({
  formDataRef,
  handleChange,
  onSubmit,
}) {
  const handlePick = (e) => {
    const file = e.target.files[0];
    if (file) formDataRef.current.set("screenshot", file);
    console.log(formDataRef.current.get("screenshot").name);
  };

  const handleSubmit = () => {
    if (!formDataRef.current.get("screenshot") || !formDataRef.current.get("transactionId") ) {
      console.log(formDataRef.current.get("screenshot"));
      console.log(formDataRef.current.get("transactionId"));
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
        <label>Amount To Pay</label>
        <input type="number" value={formDataRef.current.get("amount")}  readOnly />
      </div>

      <div>
        <label>Share Screenshot *</label>
        <input type="file" className="uploadBox" onChange={handlePick} accept="image/*" />
        {formDataRef.current.get("screenshot") && (
          <img
            src={URL.createObjectURL(formDataRef.current.get("screenshot"))}
            alt="Uploaded"
            className="uploadedPreview"
            style={{ maxWidth: "100%", marginTop: "8px" }}
          />
        )}
      </div>

      <div className="mymeals-input-group">
        <label>Transaction ID *</label>
        <input name="transactionId" onChange={handleChange} />
      </div>

      <div className="mymeals-input-group">
        <label>Note</label>
        <input name="note" onChange={handleChange} />
      </div>

      <button className="submitBtn" onClick={handleSubmit}>Submit</button>
    </div>
  );
}
