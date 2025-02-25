import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import "./AdminCoursesManagement.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CustomAlerts from "../../../components/CustomAlerts/CustomAlerts";
 // Import CSS file for custom styles

function AdminCoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  const [newCourse, setNewCourse] = useState({
    mooc_name: "",
    mooc_link: "",
    mooc_provider: "",
    university_related: "",
    estimated_efforts: "",
    mooc_description: "",
    course_levels: "",
    mooc_price: "",
    lengths: "",
    mooc_language: "",
    closed_caption: "",
    mooc_category: "",
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null); // State to control the confirm delete modal
  const navigate = useNavigate();
  const [courseLevel, setCourseLevel] = useState('');
  const [searchTerm, setSearchTerm] = useState("");

  const adminId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;
  console.log(adminId);

  useEffect(() => {
    fetchCourses();
  }, [currentPage, searchTerm]);
  
  const handleCourseLevelChange = (event) => {
    setCourseLevel(event.target.value);
  };
  const fetchCourses = () => {
    const url = new URL("http://192.168.100.35/api/coursesSearchbar");
    const params = { mooc_name: searchTerm, page: currentPage, limit: coursesPerPage };
    url.search = new URLSearchParams(params).toString();
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCourses(data.slice(0, coursesPerPage))) // assuming backend handles pagination
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const handleAddCourse = () => {
    setShowAddCourseModal(true);
  };

  const handleEditCourse = (course) => {
    console.log("Selected Course:", course);
    setSelectedCourse(course);
    setShowEditCourseModal(true);
  };

  const handleDeleteCourse = (courseId) => {
    setCourseToDelete(courseId);
    setShowConfirmModal(true);
  };

  const handleSaveCourse = () => {
    // Check for required fields
    const requiredFields = [
      "mooc_name",
      "mooc_link",
      "mooc_provider",
      "university_related",
      "estimated_efforts",
      "mooc_description",
      "course_levels",
      "mooc_price",
      "lengths",
      "mooc_language",
      "closed_caption",
      "mooc_category",
    ];

    for (let field of requiredFields) {
      if (!newCourse[field] || newCourse[field].trim() === "") {
        setAlertSeverity('error');
        setAlertMessage(`${field.replace('_', ' ')} is required`);
        setShowAlert(true);
        return;
      }
    }

    const courseData = {
      ...newCourse,
      course_levels: courseLevel,
    };

    fetch(`http://192.168.100.35/api/courses/${adminId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
      .then(() => {
        fetchCourses();
        setShowAddCourseModal(false);
        setNewCourse({
          mooc_name: "",
          mooc_link: "",
          mooc_provider: "",
          university_related: "",
          estimated_efforts: "",
          mooc_description: "",
          course_levels: "",
          mooc_price: "",
          lengths: "",
          mooc_language: "",
          closed_caption: "",
          mooc_category: "",
        });
        setAlertSeverity('success');
        setAlertMessage('Course added successfully');
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        setAlertSeverity('error');
        setAlertMessage('Failed to add course');
        setShowAlert(true);
      });
  };
  
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const confirmDeleteCourse = async () => {
    console.log("Deleting Course:", courseToDelete);
    try {
      await axios.delete(
        `http://192.168.100.35/api/courses/${courseToDelete}/${adminId}`
      );
      console.log("Course deleted successfully");
      fetchCourses();
      setShowDeleteSuccessModal(true);
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <AdminNavbar>
    <div className="admin-courses-container">
      <div className="admin-courses-dashboard">
        <h1 className="admin-courses-title">Admin Courses Management</h1>
        <div className="search-bar-container">
      <TextField
        variant="outlined"
        label="Search by course name"
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
        <div className="admin-courses-list">
          {courses.map((course) => (
            <div key={course.id} className="admin-course-item">
              <p className="admin-course-name">
                <strong>Name:</strong> {course.mooc_name}
              </p>
              <p className="admin-course-provider">
                <strong>Provider:</strong> {course.mooc_provider}
              </p>
              <div className="admin-course-actions">
              <Button
  variant="outlined"
  startIcon={<EditIcon />}
  onClick={(e) => {
    e.stopPropagation();
    handleEditCourse(course);
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
    handleDeleteCourse(course.id);
  }}
  style={{
    color: "red",
    borderColor: "black"
  }}
>
  Delete
</Button>
</div>


               
              <hr className="admin-course-divider" />
            </div>
          ))}

<Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddCourse}
              style={{
                backgroundColor: "white",
                color: "black",
                marginTop: "10px",
                borderColor:"black",
              }}
            >
              Add Course
            </Button>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={courses.length < coursesPerPage}
          >
            Next
          </button>
        </div>
      </div>

        {/* Add course modal */}
        {showAddCourseModal && (
          <div className="modal">
            <div className="modal-content">
            <CustomAlerts
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
        severity={alertSeverity}
      />
              <h2>Add Course</h2>
              <label htmlFor="mooc_name">Name:</label>
              <input
                type="text"
                id="mooc_name"
                value={newCourse.mooc_name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, mooc_name: e.target.value })
                }
              />
              <label htmlFor="mooc_link">Link:</label>
              <input
                type="text"
                id="mooc_link"
                value={newCourse.mooc_link}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, mooc_link: e.target.value })
                }
              />
              <label htmlFor="mooc_provider">Provider:</label>
              <input
                type="text"
                id="mooc_provider"
                value={newCourse.mooc_provider}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, mooc_provider: e.target.value })
                }
              />
              <label htmlFor="university_related">University Related:</label>
              <input
                type="text"
                id="university_related"
                value={newCourse.university_related}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    university_related: e.target.value,
                  })
                }
              />
              <label htmlFor="estimated_efforts">Estimated Efforts:</label>
              <input
                type="text"
                id="estimated_efforts"
                value={newCourse.estimated_efforts}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    estimated_efforts: e.target.value,
                  })
                }
              />
              <label htmlFor="mooc_description">Mooc Description :</label>
              <input
                type="text"
                id="mooc_description"
                value={newCourse.mooc_description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, mooc_description: e.target.value })
                }
              />
              <label htmlFor="course-level-select">Course Level :</label>
              <FormControl sx={{ minWidth: 20 }} size="small">
                <InputLabel id="course-level-select-label">Course Level</InputLabel>
                <Select
                  labelId="course-level-select-label"
                  id="course-level-select"
                  value={courseLevel}
                  label="Course Level"
                  onChange={handleCourseLevelChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>

              <label htmlFor="mooc_price">Price:</label>
              <input
                type="text"
                id="mooc_price"
                value={newCourse.mooc_price}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, mooc_price: e.target.value })
                }
              />
              <label htmlFor="lengths">Length:</label>
              <input
                type="text"
                id="lengths"
                value={newCourse.lengths}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, lengths: e.target.value })
                }
              />
              <label htmlFor="mooc_language">Language:</label>
              <input
                type="text"
                id="mooc_language"
                value={newCourse.mooc_language}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, mooc_language: e.target.value })
                }
              />

              <label htmlFor="closed_caption">Captions:</label>
              <input
                type="text"
                id="closed_caption"
                value={newCourse.closed_caption}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, closed_caption: e.target.value })
                }
              />
              <label htmlFor="mooc_category">Category:</label>
              <input
                type="text"
                id="mooc_category"
                value={newCourse.mooc_category}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, mooc_category: e.target.value })
                }
              />
              <div>
                <button onClick={handleSaveCourse}>Add</button>
                <button onClick={() => setShowAddCourseModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit course modal */}
        {showEditCourseModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Course</h2>
              <CustomAlerts
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
        severity={alertSeverity}
      />
              <label htmlFor="edit-course-name">Name:</label>
              <input
                type="text"
                id="edit-course-name"
                value={selectedCourse ? selectedCourse.mooc_name : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    mooc_name: e.target.value,
                  })
                }
              />

              <label htmlFor="edit-course-link">Link:</label>
              <input
                type="text"
                id="edit-course-link"
                value={selectedCourse ? selectedCourse.mooc_link : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    mooc_link: e.target.value,
                  })
                }
              />

              <label htmlFor="edit-course-provider">Provider:</label>
              <input
                type="text"
                id="edit-course-provider"
                value={selectedCourse ? selectedCourse.mooc_provider : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    mooc_provider: e.target.value,
                  })
                }
              />
              <label htmlFor="edit-university_related">University Related:</label>
              <input
                type="text"
                id="edit-university_related"
                value={selectedCourse ? selectedCourse.university_related : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    university_related: e.target.value,
                  })
                }
              />
              <label htmlFor="edit-estimated_efforts">Estimated Efforts:</label>
              <input
                type="text"
                id="edit-estimated_efforts"
                value={selectedCourse ? selectedCourse.estimated_efforts : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    estimated_efforts: e.target.value,
                  })
                }
              />
              <label htmlFor="edit-description">Description:</label>
              <input
                type="text"
                id="edit-description"
                value={selectedCourse ? selectedCourse.mooc_description : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    mooc_description: e.target.value,
                  })
                }
              />

              <label htmlFor="edit-course_levels">Course Level:</label>
              <select
                id="edit-course_levels"
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  background: 'white',
                  color: 'black',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
                value={newCourse.course_levels}
                onChange={(e) => setNewCourse({ ...newCourse, course_levels: e.target.value })}
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <label htmlFor="edit-mooc_price">Price:</label>
              <input
                type="text"
                id="edit-mooc_price"
                value={selectedCourse ? selectedCourse.mooc_price : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    mooc_price: e.target.value,
                  })
                }
              />
              <label htmlFor="edit-lengths">Length:</label>
              <input
                type="text"
                id="edit-lengths"
                value={selectedCourse ? selectedCourse.lengths : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    lengths: e.target.value,
                  })
                }
              />
              <label htmlFor="edit-mooc_language">Language:</label>
              <input
                type="text"
                id="edit-mooc_language"
                value={selectedCourse ? selectedCourse.mooc_language : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    mooc_language: e.target.value,
                  })
                }
              />
              <label htmlFor="edit-closed_caption">Captions:</label>
              <input
                type="text"
                id="edit-closed_caption"
                value={selectedCourse ? selectedCourse.closed_caption : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    closed_caption: e.target.value,
                  })
                }
              />
              <label htmlFor="edit-mooc_category">Category:</label>
              <input
                type="text"
                id="edit-mooc_category"
                value={selectedCourse ? selectedCourse.mooc_category : ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    mooc_category: e.target.value,
                  })
                }
              />

              <div>
                <button onClick={handleSaveCourse}>Save</button>
                <button onClick={() => setShowEditCourseModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add success modal */}
        {showAddSuccessModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Course Added Successfully</h2>
              <button onClick={() => setShowAddSuccessModal(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Edit success modal */}
        {showEditSuccessModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Course Edited Successfully</h2>
              <button onClick={() => setShowEditSuccessModal(false)}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Delete success modal */}
        {showDeleteSuccessModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Course Deleted Successfully</h2>
              <button onClick={() => setShowDeleteSuccessModal(false)}>
                Close
              </button>
            </div>
          </div>
        )}
        {showConfirmModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this course?</p>
              <div>
                <button onClick={confirmDeleteCourse}>Yes</button>
                <button onClick={() => setShowConfirmModal(false)}>No</button>
              </div>
            </div>
          </div>
        )}
        {/* Confirmation dialog for delete success */}
        {showDeletedModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Course Deleted Successfully</h2>
              <button onClick={() => setShowDeletedModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </AdminNavbar>
  );
}

export default AdminCoursesManagement;
