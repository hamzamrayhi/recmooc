import React, { useState, useEffect } from "react";
import "./ProfileManager.css";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
const ProfileManager = ({
  fontSize,
  fontStyle,
  setFontSize,
  setFontStyle,
  resetChanges,
}) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [contrast, setContrast] = useState("normal");
  const [isInputVisible, setIsInputVisible] = useState(false);

  // Default values for fontSize and fontStyle
  const defaultFontSize = 10; // Change as needed
  const defaultFontStyle = "Arial"; // Change as needed

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) return; // Check if user data exists in localStorage

    const { id } = userData; // Retrieve user ID
    try {
      const response = await axios.get(
        `http://localhost:5000/api/profiles/${id}`
      );
      const data = response.data;
      if (data.success) {
        setProfiles(data.profiles);
      } else {
        console.error("Error fetching profiles:", data.message);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const saveProfile = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) return; // Check if user data exists in localStorage

    const { id } = userData; // Retrieve user ID

    const newProfile = {
      userID: id,
      name: profileName,
      fontSize: fontSize,
      fontStyle: fontStyle,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/profiles",
        newProfile
      );
      const data = response.data;
      if (data.success) {
        fetchProfiles();
        setProfileName("");
        setIsInputVisible(false); // Hide the input field and button after saving
      } else {
        console.error("Error saving profile:", data.message);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  const applyProfile = (profileName) => {
    if (profileName === "") {
      setSelectedProfile(null); // Reset selected profile
      setFontSize(defaultFontSize); // Set font size to default value
      setFontStyle(defaultFontStyle); // Set font style to default value
      resetChanges(); // Call resetChanges to reset other settings
      document.body.style.fontFamily = defaultFontStyle; // Apply default font style to the body
    } else {
      const profile = profiles.find(
        (profile) => profile.profile_name === profileName
      );
      if (profile) {
        setSelectedProfile(profile);
        setFontSize(profile.fontSize); // Apply font size from the selected profile
        setFontStyle(profile.fontStyle); // Apply font style from the selected profile
        document.body.style.fontFamily = profile.fontStyle; // Apply selected font style to the body
      }
    }
  };
  
  
  

  const deleteProfile = async (profileId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/profiles/${profileId}`
      );
      const data = response.data;
      if (data.success) {
        fetchProfiles();
        resetChanges();
      } else {
        console.error("Error deleting profile:", data.message);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };
  

  return (
    <div className="profile-manager-container">
      <div className="profile-manager-header">Profile Manager</div>
      <div className="profile-manager-profiles">
        <label htmlFor="profile-select">Select Profile:</label>
        <div className="profile-select-container">
          <select
            id="profile-select"
            value={selectedProfile ? selectedProfile.profile_name : ""}
            onChange={(e) => applyProfile(e.target.value)}
            style={{ overflow: "hidden" }} // Apply overflow: hidden to remove scrollwheel
          >
            <option value="">Choose a profile</option>
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.profile_name}>
                {profile.profile_name}
              </option>
            ))}
          </select>

          <button onClick={toggleInputVisibility}>+</button>
          {selectedProfile && (
            <button onClick={() => deleteProfile(selectedProfile.id)}>
      <DeleteIcon />
            </button>
          )}
        </div>
      </div>
      <div className="profile-manager-buttons">
        {isInputVisible && (
          <>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Enter profile name"
            />
            <button onClick={saveProfile}>Save Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileManager;
