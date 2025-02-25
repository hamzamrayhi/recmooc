import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Navigation from "../../container/NavigationContainer";
import FooterContainer from "../../container/FooterContainer";
import axios from "axios";
import "./register.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box } from "@mui/system"; // Import Box component from Material-UI
import { Button } from "@mui/material";
import DefaultImage from "./images/default.jpg";
import CustomAlerts from "../../components/CustomAlerts/CustomAlerts";
import Chatbot from "../../components/Chatbot/chatbot";

function Register() {
  const [enumValues, setEnumValues] = useState([]);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [enumErrors, setEnumErrors] = useState({});
  const [showRequiredFieldsError, setShowRequiredFieldsError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    age: "",
    location: "",
    user_picture: "", // Default value for user picture
    educational_qualification: "",
    field_of_study: "",
    areas_of_interest: "",
    career_goals: "",
    accessibility_features: "",
    preferred_languages: "",
    preferred_learning_style: "",
    course_format: "",
  });

  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorSeverity, setErrorSeverity] = useState("error");
  const [step, setStep] = useState(1); // New state for form step

  // Function to handle file input change
  const handleFileChange = (e) => {
    console.log("Selected file:", e.target.files[0]);
    setFormData({
      ...formData,
      user_picture: e.target.files[0], // Store the file object
    });
  };

  useEffect(() => {
    const fetchEnumValues = async () => {
      try {
        const response = await axios.get("http://192.168.100.35/api/enums");
        setEnumValues(response.data);
      } catch (error) {
        console.error("Error fetching enum values:", error);
      }
    };

    fetchEnumValues();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Validate name field
    if (id === "name") {
      if (value.length < 3 || !isNaN(value) || value.length > 10) {
        setNameError(
          "Name must be between 3 and 10 characters and cannot be only numbers."
        );
      } else {
        setNameError("");
      }
    }

    // Validate email field
    if (id === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/; // Simplified email regex
      if (!emailPattern.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }

    // Validate password field
    if (id === "password") {
      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters long.");
      } else {
        setPasswordError("");
      }
    }

    // Validate repeated password field
    if (id === "repeatPassword") {
      if (value !== formData.password) {
        setRepeatPasswordError("Passwords do not match.");
      } else {
        setRepeatPasswordError("");
      }
    }

    // Validate age field
    if (id === "age") {
      const age = parseInt(value);
      if (age <= 0 || age > 100 || isNaN(age)) {
        setAgeError("Age must be a number between 1 and 100.");
      } else {
        setAgeError("");
      }
    }

    // Validate location field
    if (id === "location") {
      if (/\d/.test(value)) {
        setLocationError("Location cannot contain numbers.");
      } else {
        setLocationError("");
      }
    }

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleEnumChange = (e, enumName) => {
    const { value } = e.target;
    if (!value) {
      setEnumErrors({
        ...enumErrors,
        [enumName]: `Please select a value for ${enumName}.`,
      });
    } else {
      setEnumErrors({
        ...enumErrors,
        [enumName]: "",
      });
    }

    setFormData({
      ...formData,
      [enumName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.repeatPassword.trim() === "" ||
      formData.age.trim() === "" ||
      formData.location.trim() === ""
    ) {
      setErrorMessage("Please fill in all required fields.");
      setErrorSeverity("error");
      setIsErrorAlertOpen(true);
      return;
    }
 // Check if there is no user picture uploaded
 if (!formData.user_picture) {
  setErrorMessage("Please upload a user picture.");
  setErrorSeverity("error");
  setIsErrorAlertOpen(true);
  return;
}
    // Check if there are any errors before moving to the next step
    if (
      nameError ||
      emailError ||
      passwordError ||
      repeatPasswordError ||
      ageError ||
      locationError
    ) {
      setErrorMessage("Please fix errors in the form before proceeding.");
      setErrorSeverity("error");
      setIsErrorAlertOpen(true);
      return;
    }

    // If validation is successful, move to the next step
    setStep(2);
  };

  const handleEnumSubmit = async (e) => {
    e.preventDefault();

    // Check if enum fields are not empty
    for (const enumColumn of enumValues) {
      if (!formData[enumColumn.name]) {
        setErrorMessage(`Please select a value for ${enumColumn.name}.`);
        setErrorSeverity("error");
        setIsErrorAlertOpen(true);
        return;
      }
    }

    // Check if there are any errors before submitting
    if (Object.values(enumErrors).some((error) => error !== "")) {
      setErrorMessage("Please fix errors in the form before submitting.");
      setErrorSeverity("error");
      setIsErrorAlertOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.100.35/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setErrorMessage(
        "To complete the registration process please verify your email"
      );
      setErrorSeverity("success");
      setIsErrorAlertOpen(true);
     // Redirect to '/login' after a delay of 3000 milliseconds (3 seconds)
setTimeout(() => {
  window.location.href = '/login';
}, 3000);

    } catch (error) {
      console.error("Error registering user:", error.response.data); // Log error response from server
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Email already exists"
      ) {
        // Email already exists error
        setErrorMessage("Email already exists");
        setErrorSeverity("error");
        setIsErrorAlertOpen(true);
      } else {
        // Handle other errors: display error message to the user, etc.
        setErrorMessage(
          "An error occurred during registration. Please try again later."
        );
        setErrorSeverity("error");
        setIsErrorAlertOpen(true);
      }
    }
  };

  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  useEffect(() => {
    console.log("enumValues:", enumValues);
  }, [enumValues]);

  return (
    <>
      <Navigation />



      <div className="test">
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <Box
                  sx={{
                    width: "400px", // Adjust the size of the circular container
                    height: "400px", // Adjust the size of the circular container
                    borderRadius: "50%", // Make the container circular
                    overflow: "hidden", // Hide any overflowing content
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto", // Center horizontally
                    marginTop: "70px", // Adjust vertical margin
                    position: "relative", // Position the button relative to the box
                  }}
                >
                  <img
                    src={
                      formData.user_picture
                        ? URL.createObjectURL(formData.user_picture)
                        : DefaultImage
                    }
                    alt="user picture"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "pointer", // Change cursor to pointer to indicate clickability
                    }}
                  />
                </Box>
              </MDBCol>
              <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column" style={{ padding: "25px", margin: "10px" }}>
       
                  {step === 1 && (
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex flex-row mt-2">
                        <img
                          src="images/advertisement/recmoocLogo.png"
                          alt="Your Icon"
                          style={{
                            width: "12rem",
                            height: "10rem",
                            marginRight: "1rem",
                          }}
                        />
                      </div>
                      <h5
                        className="fw-normal my-1 pb-3"
                        style={{ letterSpacing: "1px", fontSize: "25px" }}
                      >
                        Create your account
                      </h5>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Name"
                        id="name"
                        value={formData.name}
                        type="text"
                        className="custom-input"
                        onChange={handleInputChange}
                      />
                      {nameError && (
                        <div className="text-danger">{nameError}</div>
                      )}
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email address"
                        id="email"
                        type="email"
                        className="custom-input"
                        onChange={handleInputChange}
                      />
                      {emailError && (
                        <div className="text-danger">{emailError}</div>
                      )}
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        id="password"
                        type="password"
                        className="custom-input"
                        onChange={handleInputChange}
                      />
                      {passwordError && (
                        <div className="text-danger">{passwordError}</div>
                      )}
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Repeat Password"
                        id="repeatPassword"
                        type="password"
                        className="custom-input"
                        onChange={handleInputChange}
                      />
                      {repeatPasswordError && (
                        <div className="text-danger">
                          {repeatPasswordError}
                        </div>
                      )}
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Age"
                        id="age"
                        type="number"
                        className="custom-input"
                        onChange={handleInputChange}
                      />
                      {ageError && (
                        <div className="text-danger">{ageError}</div>
                      )}
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Location"
                        id="location"
                        type="text"
                        className="custom-input"
                        onChange={handleInputChange}
                      />
                      {locationError && (
                        <div className="text-danger">{locationError}</div>
                      )}
                  <label htmlFor="imageInput" style={{ display: "block", textAlign: "center" }}>
  <input
    type="file"
    id="imageInput"
    accept=".jpg,.jpeg,.png"
    onChange={handleFileChange}
    style={{ display: "none" }}
  />
  <Button
    variant="contained"
    component="span"
    startIcon={<CloudUploadIcon />}
    style={{ margin: "10px 0" }}
  >
    Upload User Picture
  </Button>
</label>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "center" }}>
  <div className="register-btn-container">
    <button type="submit" className="register-btn-content" style={{height:"40px"}}>
      <span className="register-btn-title">NEXT</span>
      <span className="register-icon-arrow">
        <svg
          width="66px"
          height="43px"
          viewBox="0 0 66 43"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path
              id="arrow-icon-one"
              d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
              fill="#FFFFFF"
            ></path>
            <path
              id="arrow-icon-two"
              d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
              fill="#FFFFFF"
            ></path>
            <path
              id="arrow-icon-three"
              d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
              fill="#FFFFFF"
            ></path>
          </g>
        </svg>
      </span>
    </button>
  </div>
</div>

                      </div>
                    </form>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleEnumSubmit}>
                      {/* Dynamically generate select dropdowns for each enum type */}
                      {enumValues.length > 0 &&
                        enumValues.map((enumColumn, index) => (
                          <div key={index}>
                            <select
                              className="form-select custom-select mb-4"
                              style={{ fontSize: "12px" }}
                              onChange={(e) =>
                                handleEnumChange(e, enumColumn.name)
                              }
                            >
                              <option value="">
                                Select {enumColumn.name}
                              </option>
                              {enumColumn.values.map((value, idx) => (
                                <option key={idx} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                            {enumErrors[enumColumn.name] && (
                              <div className="text-danger">
                                {enumErrors[enumColumn.name]}
                              </div>
                            )}
                          </div>
                        ))}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setStep(1)}
                          style={{
                            fontSize: "18px",
                            backgroundColor: "#005387",
                            border: "1px solid transparent",
                          }}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{
                            fontSize: "18px",
                            backgroundColor: "#005387",
                            border: "1px solid transparent",
                          }}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  )}
                           <CustomAlerts
  isOpen={isErrorAlertOpen}
  onClose={() => setIsErrorAlertOpen(false)}
  message={errorMessage}
  severity={errorSeverity}
  style={{ padding: '10%', margin: '10px' }} // Inline styles for padding and margin
/>

                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
      <Chatbot/>
      <FooterContainer />
    </>
  );
}

export default Register;
