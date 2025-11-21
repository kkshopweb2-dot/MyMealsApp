import React from "react";
import styles from "../../css/Changedeliverylocation.module.css";

const Step5Address = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div className={styles.step}>
      <h3>Address Section</h3>

      {formData.changeFor === "1-meal" && (
        <>
          <input
            type="text"
            name="primaryAddress"
            placeholder="Address"
            value={formData.primaryAddress}
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="primaryCity"
            placeholder="City"
            value={formData.primaryCity}
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="primaryLandmark"
            placeholder="Landmark"
            value={formData.primaryLandmark}
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="primaryState"
            placeholder="State"
            value={formData.primaryState}
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="primaryZip"
            placeholder="ZIP Code"
            value={formData.primaryZip}
            onChange={handleChange}
            className={styles.inputField}
          />
        </>
      )}

      {formData.changeFor === "all-meals" && (
        <>
          <div className={styles.radioGroup}>
            {["primary", "secondary", "both"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={formData.addressType === type}
                  onChange={handleChange}
                />
                {type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </label>
            ))}
          </div>

          {["primary", "both"].includes(formData.addressType) && (
            <>
              <input
                type="text"
                name="primaryAddress"
                placeholder="Primary Address"
                value={formData.primaryAddress}
                onChange={handleChange}
                className={styles.inputField}
              />
              <input
                type="text"
                name="primaryCity"
                placeholder="Primary City"
                value={formData.primaryCity}
                onChange={handleChange}
                className={styles.inputField}
              />
              <input
                type="text"
                name="primaryLandmark"
                placeholder="Primary Landmark"
                value={formData.primaryLandmark}
                onChange={handleChange}
                className={styles.inputField}
              />
              <input
                type="text"
                name="primaryState"
                placeholder="Primary State"
                value={formData.primaryState}
                onChange={handleChange}
                className={styles.inputField}
              />
              <input
                type="text"
                name="primaryZip"
                placeholder="Primary ZIP"
                value={formData.primaryZip}
                onChange={handleChange}
                className={styles.inputField}
              />
            </>
          )}

          {["secondary", "both"].includes(formData.addressType) && (
            <>
              <input
                type="text"
                name="secondaryAddress"
                placeholder="Secondary Address"
                value={formData.secondaryAddress}
                onChange={handleChange}
                className={styles.inputField}
              />
              <input
                type="text"
                name="secondaryCity"
                placeholder="Secondary City"
                value={formData.secondaryCity}
                onChange={handleChange}
                className={styles.inputField}
              />
              <input
                type="text"
                name="secondaryLandmark"
                placeholder="Secondary Landmark"
                value={formData.secondaryLandmark}
                onChange={handleChange}
                className={styles.inputField}
              />
              <input
                type="text"
                name="secondaryState"
                placeholder="Secondary State"
                value={formData.secondaryState}
                onChange={handleChange}
                className={styles.inputField}
              />
              <input
                type="text"
                name="secondaryZip"
                placeholder="Secondary ZIP"
                value={formData.secondaryZip}
                onChange={handleChange}
                className={styles.inputField}
              />
            </>
          )}
        </>
      )}

      <div className={styles.btnGroup}>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default Step5Address;
