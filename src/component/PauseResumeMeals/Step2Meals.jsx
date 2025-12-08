import React from "react";
import { planToMeals } from "./PauseResumeMeals";

export default function Step2Meals({
  plan,
  meals,
  setMealField,
  setMealDate,
  handleSubmit,
  handleBack,
}) {
  const handlePauseToggle = (meal, isChecked) => {
    setMealField(meal, "pause", isChecked);

    if (isChecked) {
      // Set today's date in YYYY-MM-DD format
      setMealDate(meal, "pause", new Date().toISOString().slice(0, 10));
    } else {
      setMealDate(meal, "pause", null);
    }
  };

  return (
    <>
      <h3>Select Meals to Pause / Resume</h3>

      {["Breakfast", "Lunch", "Dinner"].map((meal) => {
        const m = meals[meal];

        if (!planToMeals(plan).includes(meal) && !m.checked) return null;

        return (
          <div key={meal} className="meal-section">
            <label>
              <input
                type="checkbox"
                checked={m.checked}
                onChange={() => setMealField(meal, "checked", !m.checked)}
              />
              {meal}
            </label>

            {m.checked && (
              <div className="switches">
                <label>
                  <input
                    type="checkbox"
                    checked={m.pause}
                    onChange={(e) => handlePauseToggle(meal, e.target.checked)}
                  />
                  Pause
                </label>

                {m.pause && (
                  <input
                    type="date"
                    value={m.dates.pause || ""}
                    onChange={(e) => setMealDate(meal, "pause", e.target.value)}
                  />
                )}

                <label>
                  <input
                    type="checkbox"
                    checked={m.resume}
                    onChange={(e) =>
                      setMealField(meal, "resume", e.target.checked)
                    }
                  />
                  Resume
                </label>

                {m.resume && (
                  <input
                    type="date"
                    value={m.dates.resume || ""}
                    onChange={(e) =>
                      setMealDate(meal, "resume", e.target.value)
                    }
                  />
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="button-group">
        <button className="back-btn" onClick={handleBack}>
          Back to Info
        </button>
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </>
  );
}
