import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Navigation from '../../container/NavigationContainer';
import FooterContainer from '../../container/FooterContainer';
import CustomAlerts from '../../components/CustomAlerts/CustomAlerts';
import EmailImage from '../../share/images/email.svg';
import PasswordImage from '../../share/images/password.svg';
import loginImage from '../../share/images/login.png';
import Chatbot from '../../components/Chatbot/chatbot';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const openAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email and password
    if (!email || !password) {
      openAlert('error', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_KEY}/login`, {
        email,
        password
      });

      const { token, userData, isAdmin } = response.data;

      // Add role information to userData
      userData.role = isAdmin ? 'admin' : 'user';

      // Store the token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      if (userData.email_verified === 0) {
        openAlert('warning', 'Please activate your account by verifying your email.');
      } else {
        // If the user is an admin, redirect to the admin panel
        if (isAdmin) {
          openAlert('success', 'Admin login successful!');
          window.location.href = '/Admin';
        } else {
          // If the user is not an admin, redirect to the user index
          openAlert('success', 'User login successful!');
          window.location.href = '/userindex';
        }
      }
    } catch (error) {
      openAlert('error', 'Invalid credentials. Verify your information.');
    }
  };

  useEffect(() => {
    // Clear localStorage here
    localStorage.clear();
  }, []);

  return (
    <>
      <Navigation />
      <div className='test' style={{ position: 'relative' }}>
        <CustomAlerts isOpen={showAlert} onClose={closeAlert} message={alertMessage} severity={alertSeverity} />
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className='g-0'>
              <MDBCol md='6'>
                <Box
                  component="img"
                  src={loginImage}
                  alt="login form"
                  sx={{
                    width: '300px',
                    height: '650px',
                    borderRadius: '4px', // To match the 'rounded-start' class
                    display: 'block', // Ensures the image is treated as a block element
                    width: '100%',
                    marginTop: '-40px', // Ensure the image takes the full width of its container
                  }}
                />
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column align-items-center'>
                  <div className='d-flex flex-row mt-2'>
                    <img src='images/advertisement/recmoocLogo.png' alt='Your Icon' style={{ width: '12rem', height: '10rem', marginRight: '1rem' }} />
                  </div>
                  <h5 className="fw-normal my-1 pb-3" style={{ letterSpacing: '1px', fontSize: '25px' }}>Sign into your account</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-4">
                      <MDBInput 
                        wrapperClass='w-100' 
                        label='Email address' 
                        id='formControlLg' 
                        type='email' 
                        style={{ fontSize: '16px' }} 
                        value={email} 
                        onChange={handleEmailChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <img src={EmailImage} alt="Email Icon" style={{width:"30px"}}/>
                            </InputAdornment>
                          ),
                        }} 
                      />
                    </div>
                    <div className="input-group mb-4">
                      <MDBInput 
                        wrapperClass='w-100' 
                        label='Password' 
                        id='formControlLg' 
                        type='password' 
                        style={{ fontSize: '16px' }} 
                        value={password} 
                        onChange={handlePasswordChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <img src={PasswordImage} alt="Password Icon" style={{width:"30px"}} />
                            </InputAdornment>
                          ),
                        }} 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ fontSize: '15px', marginLeft:"20px", width: '350px', marginTop:"17px" }}>Login</button>
                  </form>
                  <a className="small text-muted" href="/forgotpassword" style={{ fontSize: '15px', marginTop: '10px' }}>Forgot password?</a>
                  <p className="mb-5 pb-lg-2" style={{ color: '#393f81', fontSize: '15px' }}>Don't have an account? <a href="/register" style={{ color: '#393f81', fontSize: '100%' }}>Register here</a></p>
                  <div className='d-flex flex-row justify-content-start'>
                    <a href="#!" className="small text-muted me-1" style={{ fontSize: '15px' }}>Terms of use.</a>
                    <a href="#!" className="small text-muted" style={{ fontSize: '15px' }}>Privacy policy</a>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
      <Chatbot />
      <FooterContainer />
    </>
  );
}

export default Login;
