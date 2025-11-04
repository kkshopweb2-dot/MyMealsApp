import React from "react";
import styles from "../../css/Changedeliverylocation.module.css";

const Step1UserInfo = ({
  formData,
  handleChange,
  confirmed,
  setConfirmed,
  nextStep,
}) => {
  const plans = [
    "Combo (Lunch, Dinner & Breakfast)",
    "Combo (Lunch & Dinner)",
    "Monthly Lunch",
    "Monthly Dinner",
    "Monthly Breakfast",
  ];

  return (
    <div className={styles.step}>
      <h2 className={styles.formTitle}>Change Delivery Location</h2>
      <p className={styles.infoText}>
        Please share your location through WhatsApp for confirmation before proceeding.
      </p>

      {["orderNo", "name", "email", "phone"].map((field) => (
        <label key={field}>
          {field === "orderNo" && "Order No *"}
          {field === "name" && "Name *"}
          {field === "email" && "Email *"}
          {field === "phone" && "Phone *"}
          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={`Enter ${field}`}
            value={formData[field]}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </label>
      ))}

      <label>
        Plan *
        <select
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          className={styles.inputField}
          required
        >
          <option value="">-- Select Plan --</option>
          {plans.map((p, i) => (
            <option key={i} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
        />
        Yes, I have confirmed the location from the official team.
      </label>

      {confirmed && (
        <button onClick={nextStep} className={styles.nextBtn}>
          Next
        </button>
      )}
    </div>
  );
};

export default Step1UserInfo;
