import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import CustomAlerts from '../../components/CustomAlerts/CustomAlerts'; // Update the path accordingly

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


function Forgotpassword() {
  const [email, setEmail] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const [alertSeverity, setAlertSeverity] = useState('info');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://192.168.100.35/api/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json(); // Ensure this is inside try-catch and properly awaited
    if (response.ok) {
      setAlertMessage('Password reset email sent successfully!');
      setAlertSeverity('success');
      setAlertOpen(true);
    } else {
      setAlertMessage(`Error: ${data.error}`);
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  } catch (error) {
    setAlertMessage('Error: Network error');
    setAlertSeverity('error');
    setAlertOpen(true);
  }
};

 

  return (
    <>
  <Navigation />
  <div className='test'>
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100' />
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <form onSubmit={handleSubmit}>
                <div className='d-flex flex-row mt-2'>
                  <img src='images/advertisement/recmoocLogo.png' alt='Your Icon' style={{ width: '12rem', height: '10rem', marginRight: '1rem' }} />
                </div>
                <h5 className="fw-normal my-1 pb-3" style={{ letterSpacing: '1px', fontSize: '25px' }}>Forgot Password</h5>
                <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' style={{ fontSize: '25px' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="btn btn-primary" style={{ fontSize: '18px', backgroundColor: '#005387', border: '1px solid transparent',marginBottom:"10px" }}>Submit</button>
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

export default Forgotpassword;
