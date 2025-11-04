import React from "react";
import styles from "../../css/Changedeliverylocation.module.css";

const Step4ChangeFor = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div className={styles.step}>
      <h3>For</h3>
      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="changeFor"
            value="1-meal"
            checked={formData.changeFor === "1-meal"}
            onChange={handleChange}
          />
          Change for 1 meal
        </label>
        <label>
          <input
            type="radio"
            name="changeFor"
            value="all-meals"
            checked={formData.changeFor === "all-meals"}
            onChange={handleChange}
          />
          Change for all meals
        </label>
      </div>
      <div className={styles.btnGroup}>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default Step4ChangeFor;
