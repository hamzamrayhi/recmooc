import React, { useState } from "react";
import "./InstructorDetails.css"; // Import CSS file for styling

function InstructorDetails() {
  const [category, setCategory] = useState("");
  const [instructor, setInstructor] = useState(null);

  const fetchHighestRatedInstructor = (category) => {
    fetch(
      `${process.env.REACT_APP_API_KEY}/highest-rated-instructor/${encodeURIComponent(
        category
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update state with instructor details
        setInstructor(data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(
          "Error fetching highest-rated instructor:",
          error.message
        );
      });
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    // Fetch instructor details when a category is selected
    fetchHighestRatedInstructor(selectedCategory);
  };

  return (
    <div className="instructor-details-container">
      <h1>Highest-rated Instructor</h1>
      <div className="category-dropdown">
        <label htmlFor="category">Select a category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          <option value="Programming & Technology">
            Programming & Technology
          </option>
          <option value="Design & Arts">Design & Arts</option>
          <option value="Business & Management">Business & Management</option>
          <option value="Health & Wellness">Health & Wellness</option>
          <option value="Education & Learning">Education & Learning</option>
          <option value="Science & Engineering">Science & Engineering</option>
          <option value="Humanities & Social Sciences">
            Humanities & Social Sciences
          </option>
          <option value="Mindfulness & Spirituality">
            Mindfulness & Spirituality
          </option>
          <option value="Language & Communication">
            Language & Communication
          </option>
          <option value="Miscellaneous & Other">Miscellaneous & Other</option>
          {/* Add other categories here */}
        </select>
      </div>
      {instructor && (
        <div className="instructor-card">
          <div className="instructor-info">
            <h2 className="instructor-name">{instructor.mooc_instructor}</h2>
            <p>
              <strong>Total Courses:</strong> {instructor.total_courses}
            </p>
            <p>
              <strong>Average Rating:</strong> {instructor.average_rating}
            </p>
            <div className="course-list">
              <strong>Course Names:</strong>
              <ul>
                {instructor.course_names.split(";").map((course, index) => (
                  <li key={index}>
                    <a href="#">{course.trim()}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstructorDetails;
