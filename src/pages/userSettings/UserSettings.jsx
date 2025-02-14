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
import NavigationUser from "../../components/Navigation/Navigationuser";
import FooterContainer from "../../container/FooterContainer";
import axios from "axios";
import "./userSettings.css";
import { Box } from "@mui/material"; // Import Box component from @mui/material
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"; // Import PhotoCameraIcon from Material-UI
import CustomAlerts from "../../components/CustomAlerts/CustomAlerts";
import Chatbot from "../../components/Chatbot/chatbot";
import AccessibilitybarContainer from "../../container/AccessibilitybarContainer";

function UserSettings() {
  console.log("Rendering UserSettings...");

  const userDataString = window.localStorage.getItem("user");
  const data = userDataString ? JSON.parse(userDataString) : null;
  const [user, setUser] = useState(data || {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    age: "",
    location: "",
    user_picture: "",
    educational_qualification: "",
    field_of_study: "",
    areas_of_interest: "",
    career_goals: "",
    accessibility_features: "",
    preferred_languages: "",
    preferred_learning_style: "",
    course_format: "",
  });

  const [enumErrors, setEnumErrors] = useState({});
  const [enumValues, setEnumValues] = useState([]);
  const [userId, setUserId] = useState(null);

  // State for managing alerts
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    console.log("Fetching user data...");
    const userData = JSON.parse(localStorage.getItem("user"));
    const userIdFromLocalStorage = userData ? userData.id : null;
    setUserId(userIdFromLocalStorage);
    setUser(userData || {});
    fetchEnumValues();
    console.log(user.user_picture);
  }, []);

  const fetchEnumValues = async () => {
    console.log("Fetching enum values...");
    try {
      const response = await axios.get("http://localhost:5000/api/enums");
      setEnumValues(response.data);
    } catch (error) {
      console.error("Error fetching enum values:", error);
    }
  };

  const handleInputChange = (e) => {
    console.log("Input changed:", e.target.id, e.target.value);
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUser({
        ...user,
        user_picture: file,
      });
    } else {
      alert("Please select a valid image file.");
      e.target.value = null;
    }
  };

  const handleEnumChange = (e, enumName) => {
    console.log("Enum changed:", enumName, e.target.value);
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

    setUser({
      ...user,
      [enumName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
  
    // Check if any editable field (excluding user_picture) has changed
    const isFormChanged = Object.keys(user).some((key) => {
      if (key === "user_picture") {
        // Check if user_picture is a file (new image uploaded)
        return user.user_picture instanceof File;
      } else {
        // Check if any other field has changed
        return user[key] !== data[key];
      }
    });
  
    if (!isFormChanged) {
      // If form is not changed, show an alert or message to the user
      setAlertSeverity("info");
      setAlertMessage("No changes detected. Please update at least one field.");
      setAlertOpen(true);
      return;
    }
  
    try {
      const formData = new FormData();
      Object.entries(user).forEach(([key, value]) => {
        if (key === "user_picture" && value instanceof File) {
          // Append the new image file to formData
          formData.append(key, value);
        } else if (key !== "user_picture") {
          // Append other fields to formData
          formData.append(key, value);
        }
      });
  
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}/settings`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Response data:", response.data);
      const { updatedUser } = response.data;
      if (updatedUser && Object.keys(updatedUser).length > 0) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        // Set alert state
        setAlertSeverity("success");
        setAlertMessage("User has been successfully updated");
        setAlertOpen(true);
      } else {
        console.error("Updated user data is empty:", updatedUser);
        // Handle this case gracefully, such as showing an error message to the user
        setAlertSeverity("error");
        setAlertMessage("Failed to update user information");
        setAlertOpen(true);
      }
      // Optionally redirect user
      // window.location.href = "http://localhost:3000/userindex";
      
    } catch (error) {
      console.error("Error updating user settings:", error);
      // Handle error
      setAlertSeverity("error");
      setAlertMessage("Failed to update user information");
      setAlertOpen(true);
    }
  };
  

  const getImageSource = () => {
    if (typeof user.user_picture === "string") {
      return `http://localhost:5000/api/${user.user_picture.replace(/\//g, "/")}`;
    } else {
      return URL.createObjectURL(user.user_picture);
    }
  };

  return (
    <>
      <NavigationUser />
      <CustomAlerts
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        message={alertMessage}
        severity={alertSeverity}
      />
      <div className="test">
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <label htmlFor="user_picture_input">
                  <Box
                    sx={{
                      width: "400px",
                      height: "400px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "130px",
                      marginTop: "70px",
                      position: "relative",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="user_picture_input"
                    />
                    <img
                      src={getImageSource()}
                      alt="User Picture"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                  <PhotoCameraIcon
                    style={{
                      position: "absolute",
                      bottom: "470px",
                      right: "850px",
                      fontSize: "48px",
                      color: "white",
                      cursor: "pointer",
                      backgroundColor: "gray",
                      borderRadius: "50%",
                      padding: "10px",
                      zIndex: "1",
                    }}
                  />
                </label>
              </MDBCol>
              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center mt-2">
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
                      Change Your Information
                    </h5>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Name"
                      id="name"
                      value={user.name}
                      type="text"
                      style={{ fontSize: "15px" }}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email"
                      id="email"
                      value={user.email}
                      type="email"
                      style={{ fontSize: "15px" }}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Password"
                      id="password"
                      value={user.password}
                      type="password"
                      style={{ fontSize: "15px" }}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Repeat Password"
                      id="repeatPassword"
                      value={user.repeatPassword}
                      type="password"
                      style={{ fontSize: "15px" }}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Age"
                      id="age"
                      value={user.age}
                      type="number"
                      style={{ fontSize: "15px" }}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Location"
                      id="location"
                      value={user.location}
                      type="text"
                      style={{ fontSize: "15px" }}
                      onChange={handleInputChange}
                    />

                    {enumValues.length > 0 &&
                      enumValues.map((enumColumn, index) => (
                        <div key={index}>
                          <select
                            className="form-select custom-select mb-4"
                            style={{ fontSize: "12px" }}
                            value={user[enumColumn.name]}
                            onChange={(e) =>
                              handleEnumChange(e, enumColumn.name)
                            }
                          >
                            <option value="">
                              Select {enumColumn.name.replace(/_/g, " ")}
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          fontSize: "18px",
                          backgroundColor: "#005387",
                          border: "1px solid transparent",
                        }}
                      >
                        Update Information
                      </button>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
      <AccessibilitybarContainer/>
      <Chatbot/>
      <FooterContainer />
    </>
  );
}

export default UserSettings;
