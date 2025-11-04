import React from "react";

const FeedbackSection = ({ section, ratings, setRatings, ratingOptions }) => {
  const key = section.toLowerCase();

  return (
    <div className="sectionCard">
      <h3 className="sectionTitle">{section} Feedback</h3>
      <select
        className="input"
        value={ratings[key]?.rating || ""}
        onChange={(e) =>
          setRatings({
            ...ratings,
            [key]: { ...ratings[key], rating: e.target.value },
          })
        }
      >
        <option value="">Rate {section}</option>
        {ratingOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <textarea
        className="textArea"
        placeholder={`Write about ${section.toLowerCase()}...`}
        value={ratings[key]?.feedback || ""}
        onChange={(e) =>
          setRatings({
            ...ratings,
            [key]: { ...ratings[key], feedback: e.target.value },
          })
        }
      />
    </div>
  );
};

export default FeedbackSection;
