import React from "react";
import { Controller } from "react-hook-form";

const StepOne = ({ control, watch, handleNext }) => {
  const watchLocation = watch("location");

  return (
    <>
      <h2>Renewal Form</h2>

      <label>Order No.</label>
      <Controller
        name="orderNo"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <input
            {...field}
            type="number"
            placeholder="Enter Order Number"
            required
          />
        )}
      />

      <label>Location *</label>
      <p className="subtext">
        Proceed only if continuing with the same location or confirmed new
        location with <span className="brand">MYMEALS Team</span>.
      </p>

      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                value="Old"
                checked={field.value === "Old"}
                onChange={() => field.onChange("Old")}
              />
              <span>Old</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                value="New"
                checked={field.value === "New"}
                onChange={() => field.onChange("New")}
              />
              <span>New</span>
            </label>
          </div>
        )}
      />

      <div className="button-group">
        {watchLocation === "New" ? (
          <Controller
            name="locationConfirmed"
            control={control}
            render={({ field }) => (
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <span>I have confirmed the delivery location</span>
                </label>
                {field.value && (
                  <button type="button" className="submit-btn" onClick={handleNext}>
                    Next
                  </button>
                )}
              </div>
            )}
          />
        ) : (
          <button type="button" className="submit-btn" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default StepOne;

