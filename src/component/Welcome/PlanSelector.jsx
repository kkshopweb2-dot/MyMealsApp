import React from "react";

export default function PlanSelector({ plan, setPlan }) {
  return (
    <div className="mymeals-input-group">
      <label>Select Plan *</label>
      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="">Select Plan</option>
        <option value="combo-lunch-dinner">Combo Lunch and Dinner</option>
        <option value="monthly-lunch">Monthly Lunch</option>
        <option value="monthly-dinner">Monthly Dinner</option>
        <option value="combo-all">Combo Lunch, Dinner, Breakfast</option>
      </select>
    </div>
  );
}
