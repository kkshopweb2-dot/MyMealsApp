import React from "react";
import { Controller } from "react-hook-form";

const StepThree = ({ control, watch, handleNext, handleBack }) => {
  const watchPlan = watch("plan");

  return (
    <>
      <label>Select Plan *</label>
      <p className="subtext">
        Select your existing plan or the one you wish to continue with.
      </p>

      <Controller
        name="plan"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <select {...field}>
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
          <label>Renewal Info *</label>
          <p className="subtext">
            Example: 2nd month = 1st renewal, 3rd month = 2nd renewal, etc.
          </p>
          <Controller
            name="renewalMonth"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input {...field} type="text" placeholder="e.g., 2nd Month" required />
            )}
          />
        </>
      )}

      <div className="button-group">
        <button type="button" className="back-btn" onClick={handleBack}>
          Back
        </button>
        {watchPlan && (
          <button type="button" className="submit-btn" onClick={handleNext}>
            Proceed to Payment
          </button>
        )}
      </div>
    </>
  );
};

export default StepThree;
