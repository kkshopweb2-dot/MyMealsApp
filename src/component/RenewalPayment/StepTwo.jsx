import React from "react";
import { Controller } from "react-hook-form";
import style from "../../css/Renewal.module.css";

const StepTwo = ({ control, handleNext, handleBack }) => (
  <form className={style.formBox} onSubmit={(e) => e.preventDefault()}>
    {["name", "email", "phone", "address"].map((fieldName, idx) => (
      <Controller
        key={idx}
        name={fieldName}
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          fieldName === "address" ? (
            <textarea {...field} className={style.input} placeholder="Address *" required />
          ) : (
            <input
              {...field}
              type={fieldName === "email" ? "email" : fieldName === "phone" ? "tel" : "text"}
              className={style.input}
              placeholder={`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} *`}
              required
            />
          )
        }
      />
    ))}

    <div className={style.stepBtns}>
      <button type="button" className={style.backBtn} onClick={handleBack}>
        Back
      </button>
      <button type="button" className={style.nextBtn} onClick={handleNext}>
        Next
      </button>
    </div>
  </form>
);

export default StepTwo;
