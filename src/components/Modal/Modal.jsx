import React, { useState } from "react";
import axios from "axios";
import "./Modal.css"; // Import CSS file for styling
import ClickableStarRating from "../../components/StarRating/ClickableStarRating";
import AddReviewConfirmation from "../AddReviewConfirmation/AddReviewConfirmation";

const Modal = ({ show, onClose, courseId, userId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [error, setError] = useState(""); // State to manage error message

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  // Function to handle review submission
  const handleReviewSubmission = async () => {
    // Check if the review is empty
    if (!review.trim()) {
      setError("Review cannot be empty");
      return; // Exit function early if review is empty
    }

    try {
      await axios.post(
        `http://localhost:5000/api/${courseId}/add-review`,
        {
          userid: userId,
          review,
          rating,
        }
      );
      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle error if needed
    }
  };

  // Function to open the confirmation dialog
  const openConfirmationDialog = () => {
    setShowConfirmationDialog(true);
  };

  // Function to close the confirmation dialog
  const closeConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };

  return (
    <>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
            <h2>Add Review</h2>
            <form>
              <div>
                <label>Rating:</label>
                <ClickableStarRating rating={rating} onChange={handleRatingChange} />
              </div>
              <div>
                <label htmlFor="review">Review:</label>
                <textarea
                  id="review"
                  value={review}
                  onChange={handleReviewChange}
                  rows="4"
                />
              </div>
              {/* Display error message if review is empty */}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div>
                <button type="button" onClick={openConfirmationDialog}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Show the AddReviewConfirmation dialog if showConfirmationDialog is true */}
      {showConfirmationDialog && (
        <AddReviewConfirmation
          open={showConfirmationDialog}
          onClose={closeConfirmationDialog}
          onConfirm={handleReviewSubmission}
        />
      )}
    </>
  );
};

export default Modal;
