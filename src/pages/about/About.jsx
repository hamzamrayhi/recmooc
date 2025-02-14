import React, { useState, useEffect } from 'react';
import './About.css'; // Importing CSS file for styling
import Navigation from '../../components/Navigation/Navigation';
import NavigationUser from '../../components/Navigation/Navigationuser';
import AccessibilitybarContainer from '../../container/AccessibilitybarContainer';
import FooterContainer from '../../container/FooterContainer';
import FAQSection from '../../components/FAQ/FAQSection';
import ChatBot from "../../components/Chatbot/chatbot";
const About = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in based on localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      {isLoggedIn ? <NavigationUser /> : <Navigation />}
      <div className="about-us-container">
        <h1>About Us</h1>
        <video controls>
          <source src={`${process.env.PUBLIC_URL}/videos/RecMooc4All.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At RecMooc4All, our mission is to make learning accessible to everyone, regardless of their abilities or disabilities. We believe that education is a fundamental human right, and it should be inclusive and accommodating to all individuals.
          </p>
        </div>
        <div className="what-we-do-section">
          <h2>What We Do</h2>
          <p>
            We are a MOOC aggregator, dedicated to bringing together courses from various MOOC providers to create a diverse and enriching learning experience. Our platform serves as a centralized hub where learners can discover, access, and engage with high-quality educational content from around the world.
          </p>
        </div>
        <div className="accessibility-commitment-section">
          <h2>Accessibility Commitment</h2>
          <p>
            Accessibility lies at the heart of everything we do. We are committed to ensuring that our platform is fully accessible to people with disabilities. From design and development to content delivery, we strive to adhere to the highest standards of accessibility to provide an inclusive learning environment for all.
          </p>
          <div className="how-we-achieve-accessibility-section">
            <h3>How We Achieve Accessibility</h3>
            <ul>
              <li>User-Centric Design: Our platform is designed with accessibility in mind from the ground up. We prioritize intuitive navigation, clear layout, and compatibility with assistive technologies to enhance usability for all users.</li>
              <li>Comprehensive Accessibility Guidelines: We follow established accessibility guidelines such as the Web Content Accessibility Guidelines (WCAG) to ensure that our platform meets the needs of users with diverse abilities.</li>
              <li>Assistive Technology Compatibility: We work to ensure compatibility with a wide range of assistive technologies, including screen readers, magnifiers, and voice recognition software, to facilitate seamless access to our platform for individuals with disabilities.</li>
              <li>Continuous Improvement: We are dedicated to ongoing evaluation and improvement of our accessibility features. We actively seek feedback from users and experts in accessibility to identify areas for enhancement and implement necessary updates.</li>
            </ul>
          </div>
        </div>
        <div className="team-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of passionate individuals with expertise in education, technology, and accessibility. Together, we are committed to advancing our mission of making learning accessible to all.
          </p>
        </div>
        <div className="get-involved-section">
          <h2>Get Involved</h2>
          <p>
            Join us in our mission to create a more inclusive learning experience for everyone. Whether you're a learner, educator, or advocate for accessibility, there are many ways to get involved and support our cause.
          </p>
        </div>
        <FAQSection />
      </div>
      <AccessibilitybarContainer />
      <ChatBot />
      <FooterContainer />
    </div>
    
  );
};

export default About;
