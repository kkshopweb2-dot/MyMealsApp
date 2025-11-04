import React from "react";
import styles from "../../css/MealPreference.module.css";

const Step3Preview = ({ formData, toggles, handleFinalConfirm, setStep }) => {
  return (
    <div className={styles.formStep}>
      <h3 className={styles.subtitle}>Your Preferences</h3>
      <div className={styles.summaryBox}>
        {Object.entries({
          "Order No.": formData.orderNo,
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Plan: formData.plan,
          "Effective From": formData.effectiveFrom,
          "Meal Type": formData.mealType || "—",
          Lunch: toggles.lunch ? "Yes" : "No",
          Dinner: toggles.dinner ? "Yes" : "No",
          "Dish Choice": toggles.dishChoice ? formData.dishChoice || "Yes" : "No",
          "Avoid Veg Items": formData.avoidVeg || "—",
          "Avoid Non-Veg Items": formData.avoidNonVeg || "—",
        }).map(([label, value]) => (
          <div key={label} className={styles.summaryItem}>
            <span className={styles.summaryLabel}>{label}</span>
            <span className={styles.summaryValue}>{value}</span>
          </div>
        ))}
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.secondaryBtn} onClick={() => setStep(1)}>
          Edit Again
        </button>
        <button className={styles.primaryBtn} onClick={handleFinalConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Step3Preview;
