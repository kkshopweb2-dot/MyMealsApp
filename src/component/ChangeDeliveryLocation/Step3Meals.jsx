import React from "react";
import styles from "../../css/Changedeliverylocation.module.css";

const Step3Meals = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div className={styles.step}>
      <h3>Select Meal(s)</h3>
      <div className={styles.checkboxGroup}>
        {["Lunch", "Dinner", "Breakfast"].map((meal) => (
          <label key={meal} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="meals"
              value={meal}
              checked={formData.meals.includes(meal)}
              onChange={handleChange}
            />
            {meal}
          </label>
        ))}
      </div>
      <div className={styles.btnGroup}>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default Step3Meals;
