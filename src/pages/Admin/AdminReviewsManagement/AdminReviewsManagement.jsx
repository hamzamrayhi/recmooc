import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import "./AdminReviewsManagement.css";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
 // Import CSS file for custom styles

export default function AdminReviewsManagement() {
  const [reviews, setReviews] = useState([]);
  const [reviewToDelete, setReviewToDelete] = useState(null); // State to store the ID of the review to delete
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State to control the confirm delete modal
  const [showDeletedModal, setShowDeletedModal] = useState(false); // State to control the review deleted modal
  const adminId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;

  useEffect(() => {
    // Fetch reviews when component mounts
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDeleteReview = (reviewId) => {
    // Set the ID of the review to delete
    setReviewToDelete(reviewId);
    // Show the confirm delete modal
    setShowConfirmModal(true);
  };

  const confirmDeleteReview = async () => {
    try {
      // Call the delete review API with the review ID to delete
      await axios.delete(`http://localhost:5000/api/reviews/${reviewToDelete}/${adminId}`);
      // If delete is successful, fetch reviews again to update the list
      fetchReviews();
      // Show the review deleted modal
      setShowDeletedModal(true);
      // Close the confirm delete modal
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <AdminNavbar>
      <div className="admin-reviews-container">
        <div className="admin-reviews-dashboard">
          <h1 className="admin-reviews-title">Admin Reviews Management</h1>
          <div className="admin-reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="admin-review-item">
                <p className="admin-review-text">
                  <strong>Review:</strong> {review.review}
                </p>
                <p className="admin-review-user">
                  <strong>User:</strong> {review.userid}
                </p>
                <p className="admin-review-rating">
                  <strong>Rating:</strong> {review.rating}
                </p>
                <p className="admin-review-timestamp">
                  <strong>Timestamp:</strong> {new Date(review.timestamp).toLocaleString()}
                </p>
                <Button
  variant="outlined"
  startIcon={<DeleteIcon />}
  onClick={(e) => {
    e.stopPropagation();
    handleDeleteReview(review.id);
  }}
  style={{
    color: "red",
    borderColor: "black"
  }}
>
  Delete
</Button>
                <hr className="admin-review-divider" />
              </div>
            ))}
          </div>
        </div>

        {/* Confirm delete modal */}
        {showConfirmModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this review?</p>
              <div>
                <button onClick={confirmDeleteReview}>Yes</button>
                <button onClick={() => setShowConfirmModal(false)}>No</button>
              </div>
            </div>
          </div>
        )}

        {/* Review deleted modal */}
        {showDeletedModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Review Deleted</h2>
              <p>The review has been successfully deleted.</p>
              <button onClick={() => setShowDeletedModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </AdminNavbar>
  );
}
