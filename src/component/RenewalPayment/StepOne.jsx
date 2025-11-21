import React from "react";
import { Controller } from "react-hook-form";
import style from "../../css/Renewal.module.css";
// import logo from "../../assets/images/logo.png";

const StepOne = ({ control, watch, handleNext }) => {
  const watchLocation = watch("location");

  return (
    <form className={style.formBox} onSubmit={(e) => e.preventDefault()}>
      {/* <div className={style.logoContainer}>
        <img src={logo} alt="MYMEALS Logo" className={style.logo} />
      </div> */}
      <h2 className={style.heading}>Renewal Form</h2>

      <label className={style.label}>Order No.</label>
      <Controller
        name="orderNo"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <input
            {...field}
            type="number"
            className={style.input}
            placeholder="Enter Order Number"
            required
          />
        )}
      />

      <label className={style.label}>Location *</label>
      <p className={style.subtext}>
        Proceed only if continuing with the same location or confirmed new
        location with <span className={style.brand}>MYMEALS Team</span>.
      </p>

      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <div className={style.radioGroup}>
            <label className={style.radioOption}>
              <input
                type="radio"
                value="Old"
                checked={field.value === "Old"}
                onChange={() => field.onChange("Old")}
              />
              Old
            </label>
            <label className={style.radioOption}>
              <input
                type="radio"
                value="New"
                checked={field.value === "New"}
                onChange={() => field.onChange("New")}
              />
              New
            </label>
          </div>
        )}
      />

      {watchLocation === "New" ? (
        <Controller
          name="locationConfirmed"
          control={control}
          render={({ field }) => (
            <div className={style.checkboxGroup}>
              <label className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                I have confirmed the delivery location
              </label>
              {field.value && (
                <button type="button" className={style.nextBtn} onClick={handleNext}>
                  Next
                </button>
              )}
            </div>
          )}
        />
      ) : (
        <button type="button" className={style.nextBtn} onClick={handleNext}>
          Next
        </button>
      )}
    </form>
  );
};

export default StepOne;
