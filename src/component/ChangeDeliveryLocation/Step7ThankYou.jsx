import React from "react";
import styles from "../../css/Changedeliverylocation.module.css";

const Step7ThankYou = ({ handleNewSubmission }) => {
  return (
    <div className={styles.thankYou}>
      <h2>🎉 Thank You!</h2>
      <p>Your response has been submitted successfully.</p>
      <button onClick={handleNewSubmission} className={`${styles.btn} ${styles.primaryBtn}`}>
        Submit another response
      </button>
    </div>
  );
};

export default Step7ThankYou;
