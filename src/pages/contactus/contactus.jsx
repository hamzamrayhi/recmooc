import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import NavigationUser from "../../components/Navigation/Navigationuser";
import Footer from "../../components/Footer/Footer";
import CustomAlerts from "../../components/CustomAlerts/CustomAlerts";
import "./contactus.css";
import Chatbot from "../../components/Chatbot/chatbot";
import AccessibilitybarContainer from "../../container/AccessibilitybarContainer";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    about: "",
    text: "",
    username: "",
    email: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, message: "", severity: "" });

  useEffect(() => {
    // Check if user is logged in based on localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      const userData = JSON.parse(user);
      // Populate username and email from localStorage
      setFormData({
        ...formData,
        username: userData.name,
        email: userData.email,
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the text field is empty
    if (formData.text.trim() === "") {
      setAlert({ isOpen: true, message: "Please enter a message before submitting.", severity: "error" });
      return;
    }
  
    try {
      // Send form data to backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/contactus`,
        formData
      );
      // Handle success (e.g., show success message to user)
      setAlert({ isOpen: true, message: "Your message has been submitted successfully!", severity: "success" });
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message to user)
      setAlert({ isOpen: true, message: "An error occurred while submitting your message. Please try again later.", severity: "error" });
    }
  };
  

  const handleCloseAlert = () => {
    setAlert({ isOpen: false, message: "", severity: "" });
  };

  return (
    <div>
      {isLoggedIn ? <NavigationUser /> : <Navigation />}
      <h2>Contact Us</h2>
      <CustomAlerts
        isOpen={alert.isOpen}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
      <div className="contact-form-container">
        <form onSubmit={handleSubmit}> {/* Form submission */}
          <div className="form-section">
            <label htmlFor="username">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <br />
          </div>

          <div className="form-section">
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
          </div>
          <div className="form-section">
            <label htmlFor="subject">Subject:</label>
            <br />
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <br />
          </div>

          <div className="form-section">
            <label htmlFor="about">About:</label>
            <br />
            <select
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="General Feedback">General Feedback</option>
              <option value="Website Functionality">Website Functionality</option>
              <option value="Chatbot Feedback">Chatbot Feedback</option>
              <option value="Recommender System Feedback">
                Recommender System Feedback
              </option>
              <option value="Accessibility Feedback">
                Accessibility Feedback
              </option>
              <option value="Course Feedback">Course Feedback</option>
              <option value="Business">Business</option>
            </select>
            <br />
          </div>

          <div className="form-section">
            <label htmlFor="text">Text:</label>
            <br />
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows="4"
              required
            />
            <br />
          </div>

          <div className="form-section">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <AccessibilitybarContainer />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default ContactForm;
