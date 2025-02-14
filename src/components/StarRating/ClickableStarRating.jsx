import React from "react";
import "./ClickableStarRating.css"

const ClickableStarRating = ({ rating, onChange }) => {
  const handleClick = (newRating) => {
    // Call the onChange function with the new rating
    onChange(newRating);
  };

  return (
    <div className="clickable-star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={starValue <= rating ? "star-filled" : "star-empty"}
            onClick={() => handleClick(starValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default ClickableStarRating;
