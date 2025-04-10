import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuButtom from "../../share/UIElements/MenuButton/MenuButtom";
import RightTooltip from "./RightTooltip/RightTooltip";
import SearchBar from "./SearchBar/SearchBar";
import Categories from "./Categories/Categories";
import { Link } from "react-router-dom";
import ContactIcon from "../../share/images/contact.svg";
import AboutIcon from "../../share/images/about.svg";
import CategoryIcon from "../../share/images/downArrow.svg";
import BookmarkIcon from "../../share/images/bookmarks.svg";
import ScheduleIcon from "../../share/images/schedule.svg";
import LogoutIcon from "../../share/images/logout.svg";
import SettingsIcon from "../../share/images/settings.svg";
import Checkericon from "../../share/images/checker.svg";
import Messages from "../../components/Messages/Messages"; 

const CheckerMessage = "Identify potential accessibility issues on any website with our accessibility checker.";
const BookmarksMessage = "Manage and quickly access your bookmarked courses.";
const ScheduleMessage = "Stay on top of your learning with your personalized schedule";
const udemyBusinessMessage = "If u want to learn more about our website check the page below.";
const techOnUdemy = "Let's talk! Your inquiries and feedback drive us forward. Reach out, and we'll be right here to assist you.";

const NavigationUser = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issues, setIssues] = useState([]);
  const [url, setUrl] = useState("");
  const [axeResults, setAxeResults] = useState(null);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userPicture = user ? user.user_picture : null;

  const [recommendModalOpen, setRecommendModalOpen] = useState(false);
const [recommendationData, setRecommendationData] = useState(null);
const [loading, setLoading] = useState(false);

const handleRecommendationClick = async () => {
  setLoading(true);
  
  try {
          const user = JSON.parse(window.localStorage.getItem("user"));
          const response = await axios.post(`${process.env.REACT_APP_API_KEY}/recommender`, { user: user });
        
      console.log(response.data.response); // Log the response data to the console
    setRecommendationData(response.data.response);
    setRecommendModalOpen(true);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  } 
};

  const RightTooltipWithStyle = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "transparent",
      color: theme.palette.grey[900],
      borderRadius: 0,
      padding: 0,
    },
  }));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCheckAccessibility = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/runAxeCore?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setAxeResults(result);
      setError(null); // Reset error state if successful
    } catch (error) {
      console.error("Error running accessibility check:", error);
      setError(error.message);
      setAxeResults(null); // Reset results if error occurs
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };


 
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIssueModalOpen(false);
    setSelectedIssue(null);
  };

  const handleOpenIssueModal = async () => {
    setIssueModalOpen(true);
    // Fetch user's issues when opening the modal
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_KEY}/user/${user.id}/issues`);
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching user issues:', error);
    }
  };

  const handleCloseIssueModal = () => {
    setIssueModalOpen(false);
  };

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setIssueModalOpen(false);
  };

 


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "background.paper",
            height: "7.2rem",
            px: "2.4rem",
            boxShadow: "0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)",
          }}
        >
          <Toolbar disableGutters sx={{ my: "auto", gap: 1 }}>
            <Box>
              <a href="/userindex">
                <img
                  src="/images/header/recmoocLogo.png"
                  alt="recmoooclogo"
                  width="91"
                  height="65"
                />
              </a>
            </Box>
            <MenuButtom>
              <RightTooltipWithStyle
                title={<Categories categoriesData={categoryNames} />}
                placement="bottom-start"
              >
                <span>
                  <img src={CategoryIcon} alt="Category" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} />
                  Categories
                </span>
              </RightTooltipWithStyle>
            </MenuButtom>
            <SearchBar />
            <MenuButtom>
              <Link to="/about">
                <RightTooltipWithStyle
                  title={
                    <RightTooltip
                      text={udemyBusinessMessage}
                      buttonMessage="Learn about Recmooc4All"
                    />
                  }
                  placement="bottom-end"
                >
                  <span style={{ color: "black" }}>
                    <img src={AboutIcon} alt="About" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} /> About us {/* Adjust icon size */}
                  </span>
                </RightTooltipWithStyle>
              </Link>
            </MenuButtom>
            <MenuButtom>
              <Link to="/contactus">
                <RightTooltipWithStyle
                  title={
                    <RightTooltip text={techOnUdemy} buttonMessage="Learn more" />
                  }
                  placement="bottom-end"
                >
                  <span style={{ color: "black" }}>
                    <img src={ContactIcon} alt="Contact" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} /> Contact us {/* Adjust icon size */}
                  </span>
                </RightTooltipWithStyle>
              </Link>
            </MenuButtom>
            <MenuButtom>
              <Link to="/bookmarks">
                <RightTooltipWithStyle
                  title={
                    <RightTooltip
                      text={BookmarksMessage}
                      buttonMessage="View Bookmarked Courses"
                    />
                  }
                >
                  <span style={{ color: "black" }}>
                    <img src={BookmarkIcon} alt="Bookmarks Image" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} /> Bookmarks {/* Adjust icon size */}
                  </span>
                </RightTooltipWithStyle>
              </Link>
            </MenuButtom>
            <MenuButtom>
              <Link to="/schedule">
                <RightTooltipWithStyle
                  title={<RightTooltip
                    text={ScheduleMessage}
                    buttonMessage="Setup your schedule"
                  />}
                  placement="bottom-end"
                >
                  <span style={{ color: "black" }}>
                    <img src={ScheduleIcon} alt="Schedule Image" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} /> Schedule {/* Adjust icon size */}
                  </span>
                </RightTooltipWithStyle>
              </Link>
            </MenuButtom>
            <MenuButtom>
              <Button onClick={handleOpenModal} style={{ color: "black" }}>
                <RightTooltipWithStyle
                  title={<RightTooltip
                    text={CheckerMessage}
                    buttonMessage="Check Accessibility issues"
                  />}
                  placement="bottom-end"
                >
                  <span style={{ color: "black" }}>
                    <img src={Checkericon} alt="Checker" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} /> Check Accessibility {/* Adjust icon size */}
                  </span>
                </RightTooltipWithStyle>
              </Button>
            </MenuButtom>
            <MenuButtom>
  <Button onClick={handleRecommendationClick} style={{ color: "black" }}>
    <RightTooltipWithStyle
      title={<RightTooltip
        text="Get personalized course recommendations based on your learning history"
        buttonMessage="View Recommendations"
      />}
      placement="bottom-end"
    >
      <span style={{ color: "black" }}>
        <img src={Checkericon} alt="Recommender" className="icon" style={{ width: '30px', marginRight: '5px', verticalAlign: 'middle' }} /> 
        Recommender
      </span>
    </RightTooltipWithStyle>
  </Button>
</MenuButtom>
            <IconButton onClick={handleMenuOpen}>
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API_KEY}/${userPicture.replace(/\//g, "/")}`}
                  alt="User Picture"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{ style: { width: "200px" } }}
            >
              <MenuItem onClick={handleLogout} style={{ fontSize: "16px" }}>
                <img src={LogoutIcon} alt="Logout Icon" style={{ width: '23px', marginRight: '5px', verticalAlign: 'middle' }} />
                Logout
              </MenuItem>
              <Link to="/usersettings" style={{ textDecoration: "none", color: "inherit" }}>
                <MenuItem onClick={handleMenuClose} style={{ fontSize: "16px" }}>
                  <img src={SettingsIcon} alt="Settings Icon" style={{ width: '23px', marginRight: '5px', verticalAlign: 'middle' }} />
                  Settings
                </MenuItem>
              </Link>
              <MenuItem onClick={handleOpenIssueModal} style={{ fontSize: "16px" }}>
                <img src={ContactIcon} alt="My Issues Icon" style={{ width: '23px', marginRight: '5px', verticalAlign: 'middle' }} />
                My Issues
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      <Modal open={recommendModalOpen} onClose={() => setRecommendModalOpen(false)}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <h2>Course Recommendations</h2>
        { 
          recommendationData ? (
          <div>
            <ul>
              {
                <li key={"e"} style={{fontSize:"3rem"}}>{recommendationData}</li>
              }
            </ul>
          </div>
        ) : (
          <p>No recommendations available</p>
        )}
      </Box>
    </Modal>

      <Modal open={issueModalOpen} onClose={handleCloseIssueModal}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    }}
  >
    <h2>Your Issues</h2>
    {issues.length === 0 ? (
      <p>No issues found.</p>
    ) : (
      issues.map(issue => (
        <Button key={issue.id} onClick={() => handleSelectIssue(issue)}>
          {issue.subject}
        </Button>
      ))
    )}
  </Box>
</Modal>

      {selectedIssue && (
        <Modal open={true} onClose={handleCloseModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
            <Messages issueId={selectedIssue.id} />
          </Box>
        </Modal>
      )}
       <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <h2>Run Accessibility Check</h2>
          <TextField
            label="Enter URL"
            variant="outlined"
            fullWidth
            value={url}
            onChange={handleUrlChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleCheckAccessibility}>
            Check
          </Button>

          {/* Display results if available */}
          {axeResults && (
            <div>
              <h3>Accessibility Check Results:</h3>
              <ul>
                {axeResults.map((violation, index) => (
                  <li key={index}>
                    <strong>Impact:</strong> {violation.impact}<br />
                    <strong>Description:</strong> {violation.description}<br />
                    <strong>Help:</strong> {violation.help}<br />
                    <a href={violation.helpUrl} target="_blank" rel="noopener noreferrer">More info</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display error if occurred */}
          {error && (
            <p>Error: {error}</p>
          )}
        </Box>
      </Modal>
    </>
    
  );
};

export default NavigationUser;
