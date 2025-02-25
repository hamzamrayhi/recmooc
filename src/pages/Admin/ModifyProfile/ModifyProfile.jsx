import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './ModifyProfile.css'; // Import CSS file for styling
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar';
import CustomAlerts from '../../../components/CustomAlerts/CustomAlerts'; // Replace '<path to CustomAlerts>' with the actual path

function ModifyProfile() {
  const [initialName, setInitialName] = useState(''); // State to store initial name
  const [initialEmail, setInitialEmail] = useState(''); // State to store initial email
  const [initialPassword, setInitialPassword] = useState(''); // State to store initial password

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const admin = JSON.parse(localStorage.getItem("user"));
        const adminId = admin.id;
        const response = await axios.get(`http://192.168.100.35/api/admin/${adminId}`);
        const adminData = response.data.admin; // Access admin data from responseData.admin

        setInitialName(adminData.name);
        setInitialEmail(adminData.email);
        // Password should not be retrieved and displayed in this context for security reasons

        setName(adminData.name);
        setEmail(adminData.email);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        showAlert('Error fetching admin data', 'error');
      }
    };

    fetchAdminData();
  }, []);

  const validateName = () => {
    if (!name) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateName();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateName();
    validateEmail();
    validatePassword();

    if (!nameError && !emailError && !passwordError) {
      if (name === initialName && email === initialEmail && !password) {
        showAlert('No changes detected. Please update at least one field.', 'info');
        return;
      }

      try {
        const admin = JSON.parse(localStorage.getItem("user"));
        const adminId = admin.id;
        const response = await axios.put(`http://192.168.100.35/api/admin/${adminId}`, {
          name,
          email,
          password: password || undefined // Only include password if it's changed
        });
        console.log('Response:', response.data);
        showAlert('Profile updated successfully', 'success');
      } catch (error) {
        console.error('Error updating profile:', error);
        showAlert('Error updating profile', 'error');
      }
    } else {
      showAlert('Please fix the validation errors', 'error');
    }
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <AdminNavbar>
      <div className="modify-profile-container">
        <div className="modify-profile-form">
          <h2>Modify Profile</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input type="text" value={name} onChange={handleNameChange} onBlur={validateName} className={nameError ? 'error' : ''} />
              {nameError && <span className="error-message">{nameError}</span>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={handleEmailChange} onBlur={validateEmail} className={emailError ? 'error' : ''} />
              {emailError && <span className="error-message">{emailError}</span>}
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={handlePasswordChange} onBlur={validatePassword} className={passwordError ? 'error' : ''} />
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
        <div className='custom-alerts-container'>
          <CustomAlerts isOpen={alertOpen} onClose={handleAlertClose} message={alertMessage} severity={alertSeverity} />
        </div>
      </div>
    </AdminNavbar>
  );
}

export default ModifyProfile;
