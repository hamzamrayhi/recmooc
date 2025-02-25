import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateAdminAccount.css';
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { Button } from '@mui/material';
import CustomAlerts from '../../../components/CustomAlerts/CustomAlerts'; // Importing CustomAlerts component

function CreateAdminAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false); // State to manage alerts
    const [alertSeverity, setAlertSeverity] = useState(''); // State to manage alert severity
    const user = JSON.parse(localStorage.getItem('user')); // Fetch admin data from localStorage
    const adminid = user?.id; // Extract admin ID

    useEffect(() => {
        // Validate name field
        if (name.trim() !== "" && (name.length < 3 || name.length > 10 || !/^[a-zA-Z ]+$/.test(name))) {
            setNameError("Name must be between 3 and 10 characters and contain only letters.");
        } else {
            setNameError('');
        }

        // Validate email field
        if (email.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError('');
        }

        // Validate password field
        if (password.trim() !== "" && password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
        } else {
            setPasswordError('');
        }
    }, [name, email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any of the fields have errors
        if (nameError || emailError || passwordError) {
            setAlertMessage("Please correct the errors in the form.");
            setAlertSeverity("error");
            setIsAlertOpen(true);
            return;
        }

        // Check if any required fields are empty
        if (
            name.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
        ) {
            setAlertMessage("Please fill in all required fields.");
            setAlertSeverity("error");
            setIsAlertOpen(true);
            return;
        }

        try {
            const response = await axios.post(`http://192.168.100.35/api/createAdmin/${adminid}`, { name, email, password });

            if (response.data.success) {
                console.log(response.data.message);
                setAlertMessage("Admin account created successfully."); // Set success message
                setAlertSeverity("success");
                setIsAlertOpen(true);
                setTimeout(() => {
                    window.location.href = "/Admin";
                }, 2000); // Redirect after 2 seconds
            } else {
                if (response.data.message === 'Admin with this email already exists') {
                    setAlertMessage(response.data.message);
                } else {
                    setAlertMessage(response.data.message);
                }
                setAlertSeverity("error");
                setIsAlertOpen(true);
            }
        } catch (error) {
            if (!error.response) {
                setAlertMessage('Network error occurred. Please try again later.');
            } else {
                setAlertMessage('Error creating admin account:');
            }
            setAlertSeverity("error");
            setIsAlertOpen(true);
            console.error('Error creating admin account:');
        }
    };

    return (
        <AdminNavbar>
            <div className="d-flex">
                <MDBContainer fluid className="my-5">
                    <MDBRow className="justify-content-center align-items-center">
                        <MDBCol md="6">
                            <div className="create-admin-card">
                                <h5 className="fw-normal my-1 pb-3">Create Admin Account</h5>
                                {/* Render CustomAlerts component */}
                                <CustomAlerts
                                    isOpen={isAlertOpen}
                                    onClose={() => setIsAlertOpen(false)}
                                    message={alertMessage}
                                    severity={alertSeverity}
                                />
                                <form onSubmit={handleSubmit}>
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Name"
                                        id="name"
                                        value={name}
                                        type="text"
                                        style={{ fontSize: "15px" }}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {nameError && <div className="text-danger">{nameError}</div>}
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Email address"
                                        id="email"
                                        type="email"
                                        style={{ fontSize: "15px" }}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {emailError && <div className="text-danger">{emailError}</div>}
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Password"
                                        id="password"
                                        type="password"
                                        style={{ fontSize: "15px" }}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {passwordError && <div className="text-danger">{passwordError}</div>}
                                    
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        style={{
                                            fontSize: "14px",
                                            backgroundColor: "#005387",
                                            border: "1px solid transparent",
                                            color: "#ffffff",
                                            textTransform: "none",
                                            padding: "8px 16px",
                                            width: "150px",
                                            height: "30px",
                                        }}
                                    >
                                        Create Account
                                    </Button>
                                </form>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </AdminNavbar>
    );
}

export default CreateAdminAccount;
