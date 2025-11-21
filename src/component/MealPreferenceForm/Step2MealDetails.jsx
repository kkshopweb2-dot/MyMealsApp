import React from "react";
import styles from "../../css/MealPreference.module.css";

const Step2MealDetails = ({ formData, toggles, handleChange, toggleSwitch, handleFinalSubmit, setStep }) => {
  return (
    <form onSubmit={handleFinalSubmit} className={styles.formStep}>
      <h3 className={styles.subtitle}>Effective From</h3>
      <div className={styles.inputGroup}>
        <label>Date *</label>
        <input
          type="date"
          name="effectiveFrom"
          value={formData.effectiveFrom}
          onChange={handleChange}
          required
        />
        <p className={styles.helperText}>Meals will be served as per changes from this date.</p>
      </div>

      <div className={styles.toggleRow}>
        <span>Veg or Non-Veg</span>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={toggles.vegNonveg}
            onChange={() => toggleSwitch("vegNonveg")}
          />
          <span className={styles.slider}></span>
        </label>
      </div>

      {toggles.vegNonveg && (
        <div className={styles.fadeIn}>
          <div className={styles.inputGroup}>
            <label>Meal Type</label>
            <div className={styles.radioGroup}>
              {["Veg", "Non Veg", "Both"].map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="mealType"
                    value={option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Any Non-Veg Item you would not prefer</label>
            <input
              type="text"
              name="avoidNonVeg"
              value={formData.avoidNonVeg}
              onChange={handleChange}
              placeholder="e.g. All dishes of Prawn or Egg tadka"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Any Veg Item you would not prefer</label>
            <input
              type="text"
              name="avoidVeg"
              value={formData.avoidVeg}
              onChange={handleChange}
              placeholder="e.g. Lauki or Tinda"
            />
          </div>
        </div>
      )}

      {["lunch", "dinner", "dishChoice"].map((key) => (
        <div key={key} className={styles.toggleRow}>
          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          <label className={styles.toggleSwitch}>
            <input type="checkbox" checked={toggles[key]} onChange={() => toggleSwitch(key)} />
            <span className={styles.slider}></span>
          </label>
        </div>
      ))}

      {toggles.dishChoice && (
        <div className={`${styles.inputGroup} ${styles.fadeIn}`}>
          <label>Dish Choice</label>
          <input
            type="text"
            name="dishChoice"
            value={formData.dishChoice}
            onChange={handleChange}
            placeholder="Please specify the dish name"
          />
        </div>
      )}

      <div className={styles.buttonRow}>
        <button type="button" className={styles.secondaryBtn} onClick={() => setStep(1)}>
          ← Back
        </button>
        <button type="submit" className={styles.primaryBtn}>
          Submit →
        </button>
      </div>
    </form>
  );
};

export default Step2MealDetails;
