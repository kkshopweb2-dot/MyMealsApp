import React from "react";

export default function Step3Review({ orderNo, name, phone, email, plan, meals, reason, setReason, handleFinalSubmit, handleBack }) {
  return (
    <>
      <h3>Review Your Submission</h3>
      <p style={{ color: "#333" }}><b>Order No:</b> {orderNo}</p>
<p style={{ color: "#333" }}><b>Name:</b> {name}</p>
<p style={{ color: "#333" }}><b>Phone:</b> {phone}</p>
<p style={{ color: "#333" }}><b>Email:</b> {email}</p>
<p style={{ color: "#333" }}><b>Plan:</b> {plan}</p>


      <h4>Meals & Dates</h4>
      {["Breakfast", "Lunch", "Dinner"].map((meal) => {
        const m = meals[meal];
        if (!m.checked) return null;
        return (
          <div key={meal} className="review-box">
            <strong>{meal}</strong>
            <p>Action: {m.pause ? "Pause" : m.resume ? "Resume" : "No Change"}</p>
            <p>Pause Date: {m.dates.pause || "N/A"}</p>
            <p>Resume Date: {m.dates.resume || "N/A"}</p>
          </div>
        );
      })}
      
      <div className="form-group">
          <label>Reason for submission</label>
          <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
              className="form-control"
          ></textarea>
      </div>

      <div className="button-group">
        <button className="back-btn" onClick={handleBack}>Back & Edit Meals</button>
        <button onClick={handleFinalSubmit} className="submit-btn">Submit Final Request</button>
      </div>
    </>
  );
}
