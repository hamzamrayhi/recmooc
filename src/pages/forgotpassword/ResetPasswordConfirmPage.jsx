import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import CustomAlerts from '../../components/CustomAlerts/CustomAlerts'; 
import axios from 'axios';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import recMooc from "./images/recmoocLogo.png";

function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      setAlertMessage("Passwords don't match. Please make sure the passwords match.");
      setAlertSeverity('error');
      setAlertOpen(true);
      return;
    }

    try {
      // Call your backend API to confirm and reset the password
      const response = await axios.post('http://192.168.100.35/api/reset-password-confirm', {
        token,
        newPassword,
      });

      // Handle the response accordingly
      if (response.status === 200) {
        // Password reset successful
        setAlertMessage('Password reset successful!');
        setAlertSeverity('success');
        setAlertOpen(true);
      } else {
        // Handle error responses
        const data = response.data;
        setAlertMessage(`Error: ${data.error}`);
        setAlertSeverity('error');
        setAlertOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred. Please try again.');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  };

  return (
    <>
      <Navigation />
      <div className='test'>
        <MDBContainer className='my-5'>
          <MDBCard>
            <MDBRow className='g-0'>
              <MDBCol md='6'>
                <MDBCardImage
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp'
                  alt='login form'
                  className='rounded-start w-100'
                />
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={recMooc}
                      alt='Your Icon'
                      style={{ width: '12rem', height: '10rem', marginRight: '1rem' }}
                    />
                  </div>
                  <h5 className='fw-normal my-1 pb-3' style={{ letterSpacing: '1px', fontSize: '25px' }}>
                    Reset Your Password
                  </h5>
                  <form onSubmit={handleSubmit}>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='New Password'
                      id='newPassword'
                      type='password'
                      style={{ fontSize: '20px' }}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Confirm Password'
                      id='confirmPassword'
                      type='password'
                      style={{ fontSize: '24px' }}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button
                        type='submit'
                        className='btn btn-primary'
                        style={{ fontSize: '18px', backgroundColor: '#005387', border: '1px solid transparent' }}
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                  <CustomAlerts isOpen={alertOpen} onClose={() => setAlertOpen(false)} message={alertMessage} severity={alertSeverity} />
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
      <Footer />
    </>
  );
}

export default ResetPasswordPage;
