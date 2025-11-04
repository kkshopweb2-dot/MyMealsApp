import React from "react";
import styles from "../../css/Changedeliverylocation.module.css";

const Step6Preview = ({ formData, handleSubmit, prevStep }) => {
  return (
    <div className={styles.step}>
      <h3>Preview</h3>
      <pre className={styles.previewBox}>
        {JSON.stringify(formData, null, 2)}
      </pre>
      <div className={styles.btnGroup}>
        <button onClick={prevStep}>Back</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Step6Preview;
