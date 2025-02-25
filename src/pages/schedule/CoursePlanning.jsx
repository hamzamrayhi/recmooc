import React, { useState, useEffect, useCallback } from "react";
import NavigationUser from "../../components/Navigation/Navigationuser";
import axios from "axios";
import styled from "styled-components";
import Footer from "../../components/Footer/Footer";
import { Scheduler } from "@aldabil/react-scheduler";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchBar from "../../components/CoursePlanningSearchBar/CoursePlanningSearchBar"; // Adjust the import path as needed
import "./CoursePlanning.css"; // Import the custom CSS file

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ScheduleTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const StyledDialogContent = styled(DialogContent)`
  width: 600px; /* Adjust the width as needed */
`;

const CoursePlanning = () => {
  const [studySchedules, setStudySchedules] = useState([]);
  const [formData, setFormData] = useState({
    starting_time: "",
    ending_time: "",
    mooc_name: "",
  });
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [deleteMoocName, setDeleteMoocName] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;

  useEffect(() => {
    fetchStudySchedules();
  }, []);

  const fetchStudySchedules = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.35/api/studyschedules/${userId}`
      );
      setStudySchedules(response.data);
    } catch (error) {
      console.error("Error fetching study schedules:", error);
    }
  }, [userId]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleAddSubmit = useCallback(async (e) => {
    e.preventDefault();

    const { starting_time, ending_time, mooc_name } = formData;

    if (!starting_time || !ending_time || !mooc_name) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const newSchedule = {
        starting_time,
        ending_time,
        mooc_name,
        userid: userId,
      };

      const response = await axios.post(
        "http://192.168.100.35/api/createstudyschedule",
        newSchedule
      );
      const createdSchedule = response.data;

      setStudySchedules((prevSchedules) => [...prevSchedules, createdSchedule]);
      setShowAddModal(false);
      setFormData({ starting_time: "", ending_time: "", mooc_name: "" });
      setError("");
    } catch (error) {
      console.error("Error adding course:", error);
      setError("Failed to add course. Please try again.");
    }
  }, [formData, userId]);

  const handleDeleteByMoocName = useCallback(async () => {
    try {
      await axios.delete(
        `http://192.168.100.35/api/deletestudyschedule/${deleteMoocName}`
      );
      setStudySchedules((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule.mooc_name !== deleteMoocName)
      );
      setShowDeleteModal(false);
      setDeleteMoocName("");
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  }, [deleteMoocName]);

  const handleCourseSelect = (moocName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      mooc_name: moocName,
    }));
  };

  const handleUpdateSubmit = useCallback(async (e) => {
    e.preventDefault();

    const { starting_time, ending_time, mooc_name } = formData;

    if (!starting_time || !ending_time) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const updatedSchedule = {
        starting_time,
        ending_time,
        mooc_name: mooc_name || selectedSchedule.mooc_name, // Use the new mooc_name or keep the current one
      };

      await axios.put(
        `http://192.168.100.35/api/updatestudyschedule/${selectedSchedule.id}`,
        updatedSchedule
      );

      setStudySchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.id === selectedSchedule.id
            ? { ...schedule, ...updatedSchedule }
            : schedule
        )
      );
      setShowUpdateModal(false);
      setFormData({ starting_time: "", ending_time: "", mooc_name: "" });
      setSelectedSchedule(null);
      setError("");
    } catch (error) {
      console.error("Error updating schedule:", error);
      setError("Failed to update schedule. Please try again.");
    }
  }, [formData, selectedSchedule]);

  return (
    <PageContainer>
      <NavigationUser />
      <div className="container">
        <ScheduleTitle>Study Schedules</ScheduleTitle>
        <Scheduler
          events={studySchedules.map((schedule) => ({
            event_id: schedule.id,
            title: schedule.mooc_name,
            start: new Date(schedule.starting_time),
            end: new Date(schedule.ending_time),
          }))}
          editable={false}
          deletable={false}
        />
        <div className="Schedule-Buttons">
          <button
            className="add-to-calendar-button"
            onClick={() => setShowAddModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="svg-icon"
            >
              <g strokeWidth="2" strokeLinecap="round" stroke="#fff">
                <rect y="5" x="4" width="16" rx="2" height="16"></rect>
                <path d="m8 3v4"></path>
                <path d="m16 3v4"></path>
                <path d="m4 11h16"></path>
              </g>
            </svg>
            <span className="add-to-calendar-label">Add to Schedule </span>
          </button>
          <button className="noselect" onClick={() => setShowDeleteModal(true)}>
            <span className="text">Delete</span>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
              </svg>
            </span>
          </button>
          <button className="noselect" onClick={() => setShowUpdateModal(true)}>
            <span className="text">Update</span>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0v8.379l3.293-3.293 5.207 5.207-3.293 3.293 8.379.002v-8.379l-8.379-.002-3.293 3.293-5.207-5.207 3.293-3.293zm12 16.268l-8.379-.002 3.293-3.293-5.207-5.207-3.293 3.293-.002-8.379 8.379.002-3.293 3.293 5.207 5.207-3.293 3.293z"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <Dialog
        className="Add-modal"
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        aria-labelledby="add-schedule-dialog-title"
      >
        <DialogTitle id="add-schedule-dialog-title">Add Study Schedule</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddSubmit}>
            <input
              autoFocus
              id="starting_time"
              name="starting_time"
              type="datetime-local"
              value={formData.starting_time}
              onChange={handleInputChange}
              style={{ marginBottom: "15px", width: "100%", fontSize: "1.2rem" }}
              required
            />
            <br />
            <input
              id="ending_time"
              name="ending_time"
              type="datetime-local"
              value={formData.ending_time}
              onChange={handleInputChange}
              style={{ marginBottom: "15px", width: "100%", fontSize: "1.2rem" }}
              required
            />
            <br />
            <SearchBar searchText={formData.mooc_name} setSearchText={(value) => setFormData(prev => ({ ...prev, mooc_name: value }))} onSelect={handleCourseSelect} />
            {error && <p className="text-danger">{error}</p>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSubmit} color="primary">
            Add Schedule
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="delete-schedule-dialog-title"
      >
        <DialogTitle id="delete-schedule-dialog-title">
          Delete Schedule by MOOC Name
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="delete-mooc-name-label" style={{ fontSize: '1.2rem' }}>Select MOOC Name</InputLabel>
            <Select
              labelId="delete-mooc-name-label"
              id="deleteMoocName"
              value={deleteMoocName}
              onChange={(e) => setDeleteMoocName(e.target.value)}
              style={{ fontSize: '1.2rem' }}
            >
              {studySchedules.map((schedule) => (
                <MenuItem key={schedule.id} value={schedule.mooc_name} style={{ fontSize: '1.2rem' }}>
                  {schedule.mooc_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteByMoocName} color="primary" disabled={!deleteMoocName}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        aria-labelledby="update-schedule-dialog-title"
      >
        <DialogTitle id="update-schedule-dialog-title">Update Study Schedule</DialogTitle>
        <StyledDialogContent>
          {!selectedSchedule ? (
            <FormControl fullWidth>
              <InputLabel id="update-mooc-name-label" style={{ fontSize: '1.2rem' }}>Select MOOC Name</InputLabel>
              <Select
                labelId="update-mooc-name-label"
                id="updateMoocName"
                value={selectedSchedule ? selectedSchedule.mooc_name : ""}
                onChange={(e) => {
                  const schedule = studySchedules.find(schedule => schedule.mooc_name === e.target.value);
                  setSelectedSchedule(schedule);
                  setFormData({
                    starting_time: schedule.starting_time,
                    ending_time: schedule.ending_time,
                    mooc_name: schedule.mooc_name,
                  });
                }}
                style={{ fontSize: '1.2rem' }}
              >
                {studySchedules.map((schedule) => (
                  <MenuItem key={schedule.id} value={schedule.mooc_name} style={{ fontSize: '1.2rem' }}>
                    {schedule.mooc_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <form onSubmit={handleUpdateSubmit}>
              <input
                autoFocus
                id="starting_time"
                name="starting_time"
                type="datetime-local"
                value={formData.starting_time}
                onChange={handleInputChange}
                style={{ marginBottom: "15px", width: "100%", fontSize: "1.2rem" }}
                required
              />
              <br />
              <input
                id="ending_time"
                name="ending_time"
                type="datetime-local"
                value={formData.ending_time}
                onChange={handleInputChange}
                style={{ marginBottom: "15px", width: "100%", fontSize: "1.2rem" }}
                required
              />
              <br />
              <SearchBar searchText={formData.mooc_name} setSearchText={(value) => setFormData(prev => ({ ...prev, mooc_name: value }))} onSelect={handleCourseSelect} />
              {error && <p className="text-danger">{error}</p>}
            </form>
          )}
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpdateModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="primary" disabled={!selectedSchedule}>
            Update Schedule
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </PageContainer>
  );
};

export default CoursePlanning;