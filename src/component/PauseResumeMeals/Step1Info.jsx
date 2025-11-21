import React from "react";

export default function Step1Info({ orderNo, setOrderNo, name, setName, phone, setPhone, email, setEmail, plan, setPlan, handleNext }) {
  return (
    <div className="pause-card col-md-4">
      <h2>PAUSE AND RESUME YOUR MEAL</h2>
      <input type="text" placeholder="Order No. *" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
      <input type="text" placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="tel" placeholder="Phone Number *" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Select Plan *</label>
      <select value={plan} onChange={(e) => setPlan(e.target.value)} required>
        <option value="" disabled hidden>Select a plan</option>
        <option value="1">Combo Lunch & Dinner</option>
        <option value="2">Combo Lunch, Dinner & Breakfast</option>
        <option value="3">Monthly Lunch</option>
        <option value="4">Monthly Dinner</option>
        <option value="5">Monthly Breakfast</option>
      </select>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
