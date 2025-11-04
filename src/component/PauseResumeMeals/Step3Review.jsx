import React from "react";

export default function Step3Review({ orderNo, name, phone, email, plan, meals, handleFinalSubmit, handleBack }) {
  return (
    <div className="pause-card">
      <h3>Review Your Submission</h3>
      <p><b>Order No:</b> {orderNo}</p>
      <p><b>Name:</b> {name}</p>
      <p><b>Phone:</b> {phone}</p>
      <p><b>Email:</b> {email}</p>
      <p><b>Plan:</b> {plan}</p>

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

      <button onClick={handleFinalSubmit}>Submit Final Request</button>
      <button className="back-btn" onClick={handleBack}>Back & Edit Meals</button>
    </div>
  );
}
