import React from "react";
import styles from "../../css/MealPreference.module.css";

const ThankYou = () => {
  return (
    <div className={styles.thankyouBox}>
      <h2 className={styles.title}>Thank You!</h2>
      <p>
        We’ve noted your changes in meal preference.
        <br />
        You’ll receive an email confirmation soon.
      </p>
    </div>
  );
};

export default ThankYou;
