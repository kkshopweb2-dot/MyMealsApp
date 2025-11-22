import React from "react";
import { Controller } from "react-hook-form";

const StepTwo = ({ control, handleNext, handleBack }) => (
  <>
    {["name", "email", "phone", "address"].map((fieldName, idx) => (
      <React.Fragment key={idx}>
        <label>{`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} *`}</label>
        <Controller
          name={fieldName}
          control={control}
          rules={{ required: true }}
          render={({ field }) =>
            fieldName === "address" ? (
              <textarea {...field} placeholder="Address *" required />
            ) : (
              <input
                {...field}
                type={fieldName === "email" ? "email" : fieldName === "phone" ? "tel" : "text"}
                placeholder={`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} *`}
                required
              />
            )
          }
        />
      </React.Fragment>
    ))}

    <div className="button-group">
      <button type="button" className="back-btn" onClick={handleBack}>
        Back
      </button>
      <button type="button" className="submit-btn" onClick={handleNext}>
        Next
      </button>
    </div>
  </>
);

export default StepTwo;
