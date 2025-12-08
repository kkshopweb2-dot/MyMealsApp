import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import styles from "../../css/MealPreference.module.css";

const Step1UserInfo = ({ formData, handleChange, handleNext }) => {
  return (
    <form onSubmit={handleNext} className={styles.formStep}>
      {["orderNo", "name", "email", "phone"].map((field) => (
        <div className={styles.inputGroup} key={field}>
          <label>
            {field === "orderNo" && "Order No *"}
            {field === "name" && "Name *"}
            {field === "email" && "Email *"}
            {field === "phone" && "Phone *"}
          </label>
          <div className={field === "email" || field === "phone" ? styles.iconInput : ""}>
            {field === "email" && <FaEnvelope className={styles.icon} />}
            {field === "phone" && <FaPhoneAlt className={styles.icon} />}
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      ))}

      <div className={styles.inputGroup}>
        <label>Plan *</label>
        <select name="plan" value={formData.plan} onChange={handleChange} required>
          <option value="">Select your plan</option>
          <option value="Combo Lunch & Dinner">Combo Lunch & Dinner</option>
          <option value="Lunch Only">Lunch Only</option>
          <option value="Dinner Only">Dinner Only</option>
          <option value="Breakfast Only">Breakfast Only</option>
          <option value="Combo Lunch,Breakfast & Dinner">Combo Lunch, Breakfast & Dinner</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label>Effective From *</label>
        <input
          type="date"
          name="effectiveFrom"
          value={formData.effectiveFrom}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className={styles.primaryBtn}>
        Next →
      </button>
    </form>
  );
};

export default Step1UserInfo;
