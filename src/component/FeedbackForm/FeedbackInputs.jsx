import React from "react";

const FeedbackInputs = ({ formData, handleChange, errors, plans }) => (
  <div className="form-grid">
    <div>
      <input
        type="text"
        placeholder="Order No.*"
        value={formData.orderNo}
        onChange={(e) => handleChange("orderNo", e.target.value)}
        className="input"
      />
      {errors.orderNo && <p className="errorText">{errors.orderNo}</p>}
    </div>

    <div>
      <input
        type="text"
        placeholder="Name*"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="input"
      />
      {errors.name && <p className="errorText">{errors.name}</p>}
    </div>

    <div>
      <input
        type="tel"
        placeholder="Phone Number*"
        value={formData.phoneNumber}
        onChange={(e) => handleChange("phoneNumber", e.target.value)}
        className="input"
      />
      {errors.phoneNumber && <p className="errorText">{errors.phoneNumber}</p>}
    </div>

    <div>
      <select
        className="input"
        value={formData.plan}
        onChange={(e) => handleChange("plan", e.target.value)}
      >
        <option value="">Select Plan*</option>
        {plans.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      {errors.plan && <p className="errorText">{errors.plan}</p>}
    </div>
  </div>
);

export default FeedbackInputs;
