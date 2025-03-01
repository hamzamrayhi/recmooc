import React, { useState, useEffect } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import "./AdminUsersManagement.css"; // Import CSS file for custom styles
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';






function AdminUsersManagement() {
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false); // State to control the add user modal
  const [showEditUserModal, setShowEditUserModal] = useState(false); // State to control the edit user modal
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", age: "", location: "", educational_qualification: "", field_of_study: "", areas_of_interest: "", career_goals: "", accessibility_features: "", preferred_languages: "", preferred_learning_style: "", course_format: "" }); // State to store the new user data
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for editing
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false); // State to control the add success modal
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false); // State to control the edit success modal
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control the delete success modal
  const adminId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
  const [EducationalQualification, setEducationalQualification] = useState('');
  const [FieldOfStudy, setFieldOfStudy] = useState('');
  const [AreasOfInterest, setAreasOfIntrest] = useState('');
  const [CareerGoals, setCareerGoals] = useState('');
  const [AccessibilityFeatures, setAccessibilityFeatures] = useState('');
  const [PreferredLanguages, setPreferredLanguages] = useState('');
  const [PreferredLearningStyle, setPreferredLearningStyle] = useState('');
  const [CourseFormat, setCourseFormat] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // you can set this to whatever number you prefer
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const handleEducationalQualificationChange = (event) => {
    setEducationalQualification(event.target.value);
  };

  const handleDeleteUserClick = (userId) => {
    setUserToDelete(userId);
    setShowConfirmModal(true);
  };

  const handleFieldOfStudyChange = (event) => {
    setFieldOfStudy(event.target.value);
  };

  const handleAreasOfInterestChange = (event) => {
    setAreasOfIntrest(event.target.value);
  };

  const handleCarrerGoalsChange = (event) => {
    setCareerGoals(event.target.value);
  };

  const handleAccessibilityFeaturesChange = (event) => {
    setAccessibilityFeatures(event.target.value);
  };

  const handlePreferredLanguagesChange = (event) => {
    setPreferredLanguages(event.target.value);
  };

  const handlePreferredLearningStyleChange = (event) => {
    setPreferredLearningStyle(event.target.value);
  };

  const handleCourseFormatChange = (event) => {
    setCourseFormat(event.target.value);
  };

  const fetchUsers = () => {
    const url = new URL(`${process.env.REACT_APP_API_KEY}/usersSearchbar`);
    const params = { user_name: searchTerm, page: currentPage, limit: usersPerPage };
    url.search = new URLSearchParams(params).toString();

    fetch(url)
      .then(response => response.json())
      .then(data => setUsers(data.slice(0, usersPerPage))) // assuming backend handles pagination
      .catch(error => console.error("Error fetching users:", error));
  };

  const handleAddUser = () => {
    // Reset the state variables for selects
    setEducationalQualification('');
    setFieldOfStudy('');
    setAreasOfIntrest('');
    setCareerGoals('');
    setAccessibilityFeatures('');
    setPreferredLanguages('');
    setPreferredLearningStyle('');
    setCourseFormat('');

    // Reset other state variables if needed
    setNewUser({
      name: "",
      email: "",
      password: "",
      age: "",
      location: "",
      educational_qualification: "",
      field_of_study: "",
      areas_of_interest: "",
      career_goals: "",
      accessibility_features: "",
      preferred_languages: "",
      preferred_learning_style: "",
      course_format: "",
    });

    setShowAddUserModal(true);
  };

  const handleEditUser = (user) => {
    console.log("Selected User:", user); // Log the selected user
    setSelectedUser(user);
    setShowEditUserModal(true);
  };
  const validateUser = (user) => {
    const { name, email, password, age, location } = user;
  
    // Trim whitespace and check if required fields are present and not empty
    if (!name.trim() || !email.trim() || !password.trim() || !age || !location.trim()) {
      return { valid: false, message: 'Please fill in all required fields.' };
    }
  
    // Additional validation logic can be added here if needed
  
    return { valid: true };
  };
  
  

  useEffect(() => {
    if (selectedUser) {
      setNewUser({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        password: selectedUser.password || "",
        age: selectedUser.age || "",
        location: selectedUser.location || "",
        educational_qualification: selectedUser.educational_qualification || "",
        field_of_study: selectedUser.field_of_study || "",
        areas_of_interest: selectedUser.areas_of_interest || "",
        career_goals: selectedUser.career_goals || "",
        accessibility_features: selectedUser.accessibility_features || "",
        preferred_languages: selectedUser.preferred_languages || "",
        preferred_learning_style: selectedUser.preferred_learning_style || "",
        course_format: selectedUser.course_format || ""
      });
      setEducationalQualification(selectedUser.educational_qualification || '');
      setFieldOfStudy(selectedUser.field_of_study || '');
      setAreasOfIntrest(selectedUser.areas_of_interest || '');
      setCareerGoals(selectedUser.career_goals || '');
      setAccessibilityFeatures(selectedUser.accessibility_features || '');
      setPreferredLanguages(selectedUser.preferred_languages || '');
      setPreferredLearningStyle(selectedUser.preferred_learning_style || '');
      setCourseFormat(selectedUser.course_format || '');
    } else {
      // If no user is selected, reset all the values to empty strings
      setNewUser({
        name: "",
        email: "",
        password: "",
        age: "",
        location: "",
        educational_qualification: "",
        field_of_study: "",
        areas_of_interest: "",
        career_goals: "",
        accessibility_features: "",
        preferred_languages: "",
        preferred_learning_style: "",
        course_format: ""
      });
      setEducationalQualification('');
      setFieldOfStudy('');
      setAreasOfIntrest('');
      setCareerGoals('');
      setAccessibilityFeatures('');
      setPreferredLanguages('');
      setPreferredLearningStyle('');
      setCourseFormat('');
    }
  }, [selectedUser]);

  const handleSaveUser = () => {
    let validation;
    if (selectedUser) {
      // Edit existing user
      validation = validateUser(selectedUser);
      if (!validation.valid) {
        alert(validation.message);
        return;
      }
  
      fetch(`${process.env.REACT_APP_API_KEY}/users/${selectedUser.id}/${adminId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedUser),
      })
        .then((response) => response.json())
        .then(() => {
          fetchUsers();
          setShowEditUserModal(false);
          setSelectedUser(null);
          setShowEditSuccessModal(true); // Show edit success modal
        })
        .catch((error) => console.error("Error updating user:", error));
    } else {
      // Add new user
      validation = validateUser(newUser);
      if (!validation.valid) {
        alert(validation.message);
        return;
      }
  
      fetch(`${process.env.REACT_APP_API_KEY}/users/${adminId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newUser,
          educational_qualification: EducationalQualification,
          field_of_study: FieldOfStudy,
          areas_of_interest: AreasOfInterest,
          career_goals: CareerGoals,
          accessibility_features: AccessibilityFeatures,
          preferred_languages: PreferredLanguages,
          preferred_learning_style: PreferredLearningStyle,
          course_format: CourseFormat,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          fetchUsers();
          setShowAddUserModal(false);
          setNewUser({
            name: "",
            email: "",
            password: "",
            age: "",
            location: "",
            educational_qualification: "",
            field_of_study: "",
            areas_of_interest: "",
            career_goals: "",
            accessibility_features: "",
            preferred_languages: "",
            preferred_learning_style: "",
            course_format: "",
          });
          setShowAddSuccessModal(true); // Show add success modal
          console.log("User added successfully with ID:", data.id);
        })
        .catch((error) => console.error("Error adding user:", error));
    }
  };
  
  

  const confirmDeleteUser = () => {
    fetch(`${process.env.REACT_APP_API_KEY}/users/${userToDelete}/${adminId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchUsers();  // Re-fetch users to update the list
        setShowDeleteSuccessModal(true); // Optionally show a success modal
        setShowConfirmModal(false); // Close the confirmation modal
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <AdminNavbar>
      <div className="admin-users-container">
        <div className="admin-users-dashboard">
          <h1 className="admin-users-title">Admin Users Management</h1>
          <div className="search-bar-container">
      <TextField
        variant="outlined"
        label="Search by user name"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          // Reset to first page with new search (if applicable)
        }}
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "20px 0",
          backgroundColor: "white",
          borderRadius: "4px",
        }}
        InputLabelProps={{
          style: { fontSize: '1.15rem' }, // Change the font size as needed
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
          <div className="admin-users-list">
            {users.map((user) => (
              <div key={user.id} className="admin-user-item">
                <p className="admin-user-name">
                  <strong>Name:</strong> {user.name}
                </p>
                <p className="admin-user-email">
                  <strong>Email:</strong> {user.email}
                </p>
                <div className="admin-course-actions">
                <Button
  variant="outlined"
  startIcon={<EditIcon />}
  onClick={(e) => {
    e.stopPropagation();
    handleEditUser(user);
  }}
  style={{
    color: "black",
    borderColor: "black",
    marginRight:"20px",
  }}
>
  Edit
</Button>
                <Button
  variant="outlined"
  startIcon={<DeleteIcon />}
  onClick={(e) => {
    e.stopPropagation();
    handleDeleteUserClick(user.id);
  }}
  style={{
    color: "red",
    borderColor: "black"
  }}
>
  Delete
</Button>
</div>
                <hr className="admin-user-divider" />
              </div>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddUser}
              style={{
                backgroundColor: "white",
                color: "black",
                marginTop: "10px",
                borderColor:"black",
              }}
            >
              Add User
            </Button>
          </div>
          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={users.length < usersPerPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add user modal */}
      {showAddUserModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add User</h2>
            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="name"
              value={newUser.name}
              type="text"
              style={{ fontSize: "12px" }}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="email"
              value={newUser.email}
              type="email"
              style={{ fontSize: "12px" }}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
              value={newUser.password}
              type="password"
              style={{ fontSize: "12px" }}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Age"
              id="age"
              value={newUser.age}
              type="number"
              style={{ fontSize: "12px" }}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Location"
              id="location"
              value={newUser.location}
              type="text"
              style={{ fontSize: "12px" }}
              onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
            />
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="educational_qualification-label">Educational Qualification</InputLabel>
              <Select
                labelId="educational_qualification-label"
                id="Education_Qualification-select"
                value={EducationalQualification}
                label="Educational Qualification"
                onChange={handleEducationalQualificationChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>High School</MenuItem>
                <MenuItem value={2}>Associate Degree</MenuItem>
                <MenuItem value={3}>Bachelor's Degree</MenuItem>
                <MenuItem value={4}>Master's Degree</MenuItem>
                <MenuItem value={5}>Doctoral Degree</MenuItem>
                <MenuItem value={6}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="Field_Of_Study-label">FieldOfStudy</InputLabel>
              <Select
                labelId="Field_Of_Study-label"
                id="Field_Of_Study-select"
                value={FieldOfStudy}
                label="Field Of Study"
                onChange={handleFieldOfStudyChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Computer Science</MenuItem>
                <MenuItem value={2}>Engineering</MenuItem>
                <MenuItem value={3}>Mathematics</MenuItem>
                <MenuItem value={4}>Physics</MenuItem>
                <MenuItem value={5}>Biology</MenuItem>
                <MenuItem value={6}>Business</MenuItem>
                <MenuItem value={7}>Arts</MenuItem>
                <MenuItem value={8}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="Areas Of Interest-label">Areas Of Interest</InputLabel>
              <Select
                labelId="Areas Of Interest-label"
                id="Areas Of Interest-select"
                value={AreasOfInterest}
                label="Areas Of Interest"
                onChange={handleAreasOfInterestChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Technology</MenuItem>
                <MenuItem value={2}>Science</MenuItem>
                <MenuItem value={3}>Business</MenuItem>
                <MenuItem value={4}>Arts</MenuItem>
                <MenuItem value={5}>Language</MenuItem>
                <MenuItem value={6}>Healthcare</MenuItem>
                <MenuItem value={7}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="career_goals-label">Carreer Goals</InputLabel>
              <Select
                labelId="career_goals-label"
                id="career_goals-select"
                value={CareerGoals}
                label="CareerGoals"
                onChange={handleCarrerGoalsChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Career Advancement</MenuItem>
                <MenuItem value={2}>Skill Development</MenuItem>
                <MenuItem value={3}>Job Change</MenuItem>
                <MenuItem value={4}>Personal Interest</MenuItem>
                <MenuItem value={5}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="accessibility_features-label">Accessibility Features</InputLabel>
              <Select
                labelId="accessibility_features-label"
                id="accessibility_features-select"
                value={AccessibilityFeatures}
                label="Accessibility Features"
                onChange={handleAccessibilityFeaturesChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Visual Accommodations</MenuItem>
                <MenuItem value={2}>Auditory Accommodations</MenuItem>
                <MenuItem value={3}>Mobility Accommodations</MenuItem>
                <MenuItem value={4}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="preferred_languages-label">Preferred Languages</InputLabel>
              <Select
                labelId="preferred_languages-label"
                id="preferred_languages-select"
                value={PreferredLanguages}
                label="Preferred Languages"
                onChange={handlePreferredLanguagesChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>English</MenuItem>
                <MenuItem value={2}>Spanish</MenuItem>
                <MenuItem value={3}>French</MenuItem>
                <MenuItem value={4}>German</MenuItem>
                <MenuItem value={5}>Mandarin</MenuItem>
                <MenuItem value={6}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="preferred_learning_style-label">Preferred Learning Style</InputLabel>
              <Select
                labelId="preferred_learning_style-label"
                id="preferred_learning_style-select"
                value={PreferredLearningStyle}
                label="Preferred Learning Style"
                onChange={handlePreferredLearningStyleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Visual</MenuItem>
                <MenuItem value={2}>Auditory</MenuItem>
                <MenuItem value={3}>Kinesthetic</MenuItem>
                <MenuItem value={4}>Reading/Writing</MenuItem>
                <MenuItem value={5}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="course_format-label">Course Format</InputLabel>
              <Select
                labelId="course_format-label"
                id="course_format-select"
                value={CourseFormat}
                label="Course Format"
                onChange={handleCourseFormatChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Video Lectures</MenuItem>
                <MenuItem value={2}>Text-Based</MenuItem>
                <MenuItem value={3}>Interactive</MenuItem>
                <MenuItem value={4}>Live Sessions</MenuItem>
                <MenuItem value={5}>Other</MenuItem>
              </Select>
            </FormControl>
            <div>
              <button onClick={handleSaveUser}>Add</button>
              <button onClick={() => setShowAddUserModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showEditUserModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="edit-name"
              value={selectedUser ? selectedUser.name : ""}
              type="text"
              style={{ fontSize: "12px" }}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="edit-email"
              value={selectedUser ? selectedUser.email : ""}
              type="email"
              style={{ fontSize: "12px" }}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="edit-password"
              type="password"
              style={{ fontSize: "12px" }}
              onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Age"
              id="edit-age"
              value={selectedUser ? selectedUser.age : ""}
              type="number"
              style={{ fontSize: "12px" }}
              onChange={(e) => setSelectedUser({ ...selectedUser, age: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Location"
              id="edit-location"
              value={selectedUser ? selectedUser.location : ""}
              type="text"
              style={{ fontSize: "12px" }}
              onChange={(e) => setSelectedUser({ ...selectedUser, location: e.target.value })}
            />
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="educational_qualification-label">Educational Qualification</InputLabel>
              <Select
                labelId="educational_qualification-label"
                id="Education_Qualification-select"
                value={selectedUser ? selectedUser.educational_qualification : ""}
                label="Educational Qualification"
                onChange={(e) => setSelectedUser({ ...selectedUser, educational_qualification: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>High School</MenuItem>
                <MenuItem value={2}>Associate Degree</MenuItem>
                <MenuItem value={3}>Bachelor's Degree</MenuItem>
                <MenuItem value={4}>Master's Degree</MenuItem>
                <MenuItem value={5}>Doctoral Degree</MenuItem>
                <MenuItem value={6}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="Field_Of_Study-label">FieldOfStudy</InputLabel>
              <Select
                labelId="Field_Of_Study-label"
                id="Field_Of_Study-select"
                value={selectedUser ? selectedUser.field_of_study : ""}
                label="Field Of Study"
                onChange={(e) => setSelectedUser({ ...selectedUser, field_of_study: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Computer Science</MenuItem>
                <MenuItem value={2}>Engineering</MenuItem>
                <MenuItem value={3}>Mathematics</MenuItem>
                <MenuItem value={4}>Physics</MenuItem>
                <MenuItem value={5}>Biology</MenuItem>
                <MenuItem value={6}>Business</MenuItem>
                <MenuItem value={7}>Arts</MenuItem>
                <MenuItem value={8}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="Areas Of Interest-label">Areas Of Interest</InputLabel>
              <Select
                labelId="Areas Of Interest-label"
                id="Areas Of Interest-select"
                value={selectedUser ? selectedUser.areas_of_interest : ""}
                label="Areas Of Interest"
                onChange={(e) => setSelectedUser({ ...selectedUser, areas_of_interest: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Technology</MenuItem>
                <MenuItem value={2}>Science</MenuItem>
                <MenuItem value={3}>Business</MenuItem>
                <MenuItem value={4}>Arts</MenuItem>
                <MenuItem value={5}>Language</MenuItem>
                <MenuItem value={6}>Healthcare</MenuItem>
                <MenuItem value={7}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="career_goals-label">Career Goals</InputLabel>
              <Select
                labelId="career_goals-label"
                id="career_goals-select"
                value={selectedUser ? selectedUser.career_goals : ""}
                label="Career Goals"
                onChange={(e) => setSelectedUser({ ...selectedUser, career_goals: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Career Advancement</MenuItem>
                <MenuItem value={2}>Skill Development</MenuItem>
                <MenuItem value={3}>Job Change</MenuItem>
                <MenuItem value={4}>Personal Interest</MenuItem>
                <MenuItem value={5}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="accessibility_features-label">Accessibility Features</InputLabel>
              <Select
                labelId="accessibility_features-label"
                id="accessibility_features-select"
                value={selectedUser ? selectedUser.accessibility_features : ""}
                label="Accessibility Features"
                onChange={(e) => setSelectedUser({ ...selectedUser, accessibility_features: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Visual Accommodations</MenuItem>
                <MenuItem value={2}>Auditory Accommodations</MenuItem>
                <MenuItem value={3}>Mobility Accommodations</MenuItem>
                <MenuItem value={4}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="preferred_languages-label">Preferred Languages</InputLabel>
              <Select
                labelId="preferred_languages-label"
                id="preferred_languages-select"
                value={selectedUser ? selectedUser.preferred_languages : ""}
                label="Preferred Languages"
                onChange={(e) => setSelectedUser({ ...selectedUser, preferred_languages: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>English</MenuItem>
                <MenuItem value={2}>Spanish</MenuItem>
                <MenuItem value={3}>French</MenuItem>
                <MenuItem value={4}>German</MenuItem>
                <MenuItem value={5}>Mandarin</MenuItem>
                <MenuItem value={6}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="preferred_learning_style-label">Preferred Learning Style</InputLabel>
              <Select
                labelId="preferred_learning_style-label"
                id="preferred_learning_style-select"
                value={selectedUser ? selectedUser.preferred_learning_style : ""}
                label="Preferred Learning Style"
                onChange={(e) => setSelectedUser({ ...selectedUser, preferred_learning_style: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Visual</MenuItem>
                <MenuItem value={2}>Auditory</MenuItem>
                <MenuItem value={3}>Kinesthetic</MenuItem>
                <MenuItem value={4}>Reading/Writing</MenuItem>
                <MenuItem value={5}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 20, marginTop: 2 }} size="small">
              <InputLabel id="course_format-label">Course Format</InputLabel>
              <Select
                labelId="course_format-label"
                id="course_format-select"
                value={selectedUser ? selectedUser.course_format : ""}
                label="Course Format"
                onChange={(e) => setSelectedUser({ ...selectedUser, course_format: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Video Lectures</MenuItem>
                <MenuItem value={2}>Text-Based</MenuItem>
                <MenuItem value={3}>Interactive</MenuItem>
                <MenuItem value={4}>Live Sessions</MenuItem>
                <MenuItem value={5}>Other</MenuItem>
              </Select>
            </FormControl>
            <div>
              <button onClick={handleSaveUser}>Save</button>
              <button onClick={() => setShowEditUserModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add success modal */}
      {showAddSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>User Added Successfully</h2>
            <button onClick={() => setShowAddSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit success modal */}
      {showEditSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>User Edited Successfully</h2>
            <button onClick={() => setShowEditSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Delete success modal */}
      {showDeleteSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>User Deleted Successfully</h2>
            <button onClick={() => setShowDeleteSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div>
              <button onClick={confirmDeleteUser}>Yes</button>
              <button onClick={() => setShowConfirmModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </AdminNavbar>
  );
}

export default AdminUsersManagement;
