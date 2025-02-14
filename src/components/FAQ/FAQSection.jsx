import React from 'react';
import "./FAQSection.css"

const FAQSection = () => {
  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>How do I enroll in a course?</h3>
        <p>To enroll in a course, simply click on the “ENROLL Now” button on the course page. This will redirect you to the course website, where you can proceed with the registration process according to the provider's instructions.</p>
      </div>
      <div className="faq-item">
        <h3>How much do MOOCs cost?</h3>
        <p>MOOCs are free of charge. However, some providers may offer optional paid features such as graded assignments, course completion certificates, or exams.</p>
      </div>
      <div className="faq-item">
        <h3>How do I get more information about a course?</h3>
        <p>To obtain more details about a course, simply click on the “ENROLL Now” button. This will direct you to the course website where you can find comprehensive information. If you require additional assistance, you can contact the course provider directly.</p>
      </div>
      <div className="faq-item">
        <h3>Why should I register in RecMooc4All?</h3>
        <p>Registering on RecMooc4All enables you to evaluate courses, share reviews, and gain access to “My Bookmarks”, a feature that allows you to save your favorite courses for future reference.</p>
      </div>
      <div className="faq-item">
        <h3>How do I register in RecMooc4All?</h3>
        <p>To register on RecMooc4All, simply navigate to the “Sign up” page and complete the required fields. Upon submission, you will receive a confirmation email. Click the link in the email to verify your account and access the login page.</p>
      </div>
      <div className="faq-item">
        <h3>What is “My Bookmarks”?</h3>
        <p>“My Bookmarks” is a feature on RecMooc4All that allows you to save your favorite MOOCs for easy access. To utilize this feature, you must be logged in to your account. Rest assured, your bookmarks are kept private and accessible only to you.</p>
      </div>
      <div className="faq-item">
        <h3>How do I contact the team from RecMooc4All?</h3>
        <p>If you need to get in touch with us, please use our <a href='/contactus'>contact form</a>. We are here to assist you!</p>
      </div>
    </div>
  );
};

export default FAQSection;
