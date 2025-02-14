import React from 'react';

const StarRating = ({ rating }) => {
  // Determine the number of filled stars
  const filledStars = Math.round(rating);
  // Create an array of stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    // If the index is less than the number of filled stars, render a filled star
    if (index < filledStars) {
      return <span key={index}>&#9733;</span>; // Filled star (★)
    } else {
      return <span key={index}>&#9734;</span>; // Empty star (☆)
    }
  });

  return <div>{stars}</div>;
};

export default StarRating;
