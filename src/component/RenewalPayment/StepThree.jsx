import React from "react";
import { Controller } from "react-hook-form";
import style from "../../css/Renewal.module.css";

const StepThree = ({ control, watch, handleNext, handleBack }) => {
  const watchPlan = watch("plan");

  return (
    <form className={style.formBox} onSubmit={(e) => e.preventDefault()}>
      <label className={style.label}>Select Plan *</label>
      <p className={style.subtext}>
        Select your existing plan or the one you wish to continue with.
      </p>

      <Controller
        name="plan"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <select {...field} className={style.select}>
            <option value="">-- Choose Plan --</option>
            <option value="comboLunchDinnerBreakfast">Combo Lunch, Dinner & Breakfast</option>
            <option value="comboLunchDinner">Combo Lunch & Dinner</option>
            <option value="monthlyLunch">Monthly Lunch</option>
            <option value="monthlyDinner">Monthly Dinner</option>
            <option value="monthlyBreakfast">Monthly Breakfast</option>
          </select>
        )}
      />

      {watchPlan && (
        <>
          <p className={style.subtext}>
            Example: 2nd month = 1st renewal, 3rd month = 2nd renewal, etc.
          </p>
          <Controller
            name="renewalMonth"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input {...field} type="text" className={style.input} placeholder="Renewal Info *" required />
            )}
          />
        </>
      )}

      <div className={style.stepBtns}>
        <button type="button" className={style.backBtn} onClick={handleBack}>
          Back
        </button>
        {watchPlan && (
          <button type="button" className={style.nextBtn} onClick={handleNext}>
            Proceed to Payment
          </button>
        )}
      </div>
    </form>
  );
};

export default StepThree;
