import React from "react";
import styles from "../../css/Changedeliverylocation.module.css";

const Step2EffectiveDate = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div className={styles.step}>
      <h3>Effective Date</h3>
      <input
        type="date"
        name="effectiveDate"
        value={formData.effectiveDate}
        onChange={handleChange}
        className={styles.inputField}
        required
      />
      <div className={styles.btnGroup}>
        <button onClick={prevStep} className={`${styles.btn} ${styles.secondaryBtn}`}>Back</button>
        <button onClick={nextStep} className={`${styles.btn} ${styles.primaryBtn}`}>Next</button>
      </div>
    </div>
  );
};

export default Step2EffectiveDate;
