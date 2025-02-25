import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navigationuser from "../../components/Navigation/Navigationuser";
import Footer from "../../components/Footer/Footer";
import StarRating from "../../components/StarRating/StarRating";
import Modal from "../../components/Modal/Modal";
import "./coursedetails.css";
import LinkButton from "../../share/UIElements/LinkButton/LinkButton";
import ItemsCarousel from "react-items-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CustomAlerts from "../../components/CustomAlerts/CustomAlerts";
import RelatedCoursesCarousel from "../../components/Carousels/RelatedCoursesCarousel";
import styled from "styled-components";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button as MuiButton, List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import Chatbot from "../../components/Chatbot/chatbot";
import AccessibilitybarContainer from "../../container/AccessibilitybarContainer";

const CourseDetails = () => {
  const Arrow = styled.div`
    width: 4.8rem;
    height: 4.8rem;
    background-color: black;
    border: 1px solid #6a6f73;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${(props) => (props.direction === "right" ? "right: -4rem;" : "left: -4rem;")}
    cursor: pointer;
    z-index: 2;
    margin-top: -2.4rem;
    :hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `;

  const Button = styled.button`
    background-color: #005387;
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: white;
    font-size: 1.4rem;
    height: 4rem;
    width: 13rem;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border: 2px solid #005387;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    &:hover {
      background-color: "#005387";
      color: ${(props) => (props.color === "#005387" ? "#fff" : "#333")};
      transform: translateY(-2px); /* Lift the button slightly on hover */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box-shadow for depth */
    }
  `;

  const ReviewText = styled.div`
    font-size: 1.6rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    max-height: 150px;
    overflow: hidden;
  `;

  const ReviewCard = styled.div`
    width: 100%;
    padding: 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;
    position: relative;
    max-height: 500px;
    overflow: hidden;
  `;

  const BookmarkContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 750px;
  `;

  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [axeCoreResults, setAxeCoreResults] = useState([]); // New state for Axe-Core results
  const [axeCoreModalOpen, setAxeCoreModalOpen] = useState(false); // State to control Axe-Core results modal
  const [loadingAxeCore, setLoadingAxeCore] = useState(false); // State for loading button
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const userId = userData.id;
  const [activeReviewsIndex, setActiveReviewsIndex] = useState(0);
  const [contentHeights, setContentHeights] = useState([]);
  const contentRefs = useRef([]);
  const [isBookmarked, setIsBookmarked] = useState(null);
  const [bookmarkMessage, setBookmarkMessage] = useState("");
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [bookmarkAlertOpen, setBookmarkAlertOpen] = useState(false);
  const [bookmarkAlertMessage, setBookmarkAlertMessage] = useState("");
  const [bookmarkAlertSeverity, setBookmarkAlertSeverity] = useState("success");

  useEffect(() => {
    const storedCourseIds = JSON.parse(localStorage.getItem("bookmarkedCourses")) || [];
    setBookmarkedCourses(storedCourseIds);

    // Check if the current course's id exists in the bookmarked courses
    const isBookmarked = storedCourseIds.includes(id);
    setIsBookmarked(isBookmarked);

    // Log the isBookmarked state
    console.log("Is bookmarked:", isBookmarked);
  }, [id]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://192.168.100.35/api/coursedetails/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the headers
            }
          }
        );
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Failed to fetch course details");
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://192.168.100.35/api/${id}/reviews`,
          {
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the headers
            }
          }
        );
        setReviews(response.data.reviews);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to fetch reviews");
      }
    };

    fetchCourseDetails();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    const heights = contentRefs.current.map((ref) => ref.clientHeight);
    setContentHeights(heights);
  }, [reviews, activeReviewsIndex]);

  useEffect(() => {
    const fetchRelatedCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        // Fetch related courses based on the category of the current course
        const response = await axios.get(
          `http://192.168.100.35/api/courses/${course.mooc_category}`,
          {
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the headers
            }
          }
        );
        setRelatedCourses(response.data);
      } catch (error) {
        console.error("Error fetching related courses:", error);
      }
    };

    if (course) {
      fetchRelatedCourses();
    }
  }, [course]);
  // When adding a bookmark
  const addBookmark = async (courseId, userId) => {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        const response = await axios.post(
            `http://192.168.100.35/api/bookmarks/${courseId}`,
            null,
            {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                },
                params: {
                    userId: userId,
                    courseId:id
                }
            }
        );

        setIsBookmarked(true);
        setBookmarkMessage("Course added to bookmarks");

        // Update the bookmarked courses state with just the course ID
        setBookmarkedCourses((prevBookmarkedCourses) => {
            const updatedCourseIds = [...prevBookmarkedCourses, courseId];
            // Save the updated bookmarked course IDs to local storage
            localStorage.setItem("bookmarkedCourses", JSON.stringify(updatedCourseIds));
            return updatedCourseIds;
        });

        setTimeout(() => {
            setBookmarkMessage("");
        }, 3000); // Clear message after 3 seconds

        setBookmarkAlertMessage("Course added to bookmarks");
        setBookmarkAlertSeverity("success");
        setBookmarkAlertOpen(true);
    } catch (error) {
        console.error("Error adding bookmark:", error);
    }
};

  // When deleting a bookmark
  const deleteBookmark = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
      const response = await axios.delete(
        `http://192.168.100.35/api/bookmarks/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the headers
          },
          params: {
            userId: userData.id,
          }
        }
      );

      setIsBookmarked(false);
      setBookmarkMessage("Bookmark removed");

      // Update the bookmarked courses state by filtering out the deleted course ID
      setBookmarkedCourses((prevBookmarkedCourses) => {
        const updatedCourseIds = prevBookmarkedCourses.filter((courseId) => courseId !== id);
        // Save the updated bookmarked course IDs to local storage
        localStorage.setItem("bookmarkedCourses", JSON.stringify(updatedCourseIds));
        return updatedCourseIds;
      });

      setTimeout(() => {
        setBookmarkMessage("");
      }, 3000); // Clear message after 3 seconds
      setBookmarkAlertMessage("Bookmark removed");
      setBookmarkAlertSeverity("success");
      setBookmarkAlertOpen(true);
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  // When initializing the component or retrieving bookmarked courses
  useEffect(() => {
    // Initialize bookmarkedCourses in local storage if it doesn't exist
    if (!localStorage.getItem("bookmarkedCourses")) {
      localStorage.setItem("bookmarkedCourses", JSON.stringify([]));
    }
  
    // Fetch bookmarked courses from backend
    const fetchBookmarkedCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://192.168.100.35/api/bookmarked-courses/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const bookmarkedCourseIds = response.data.map(course => course.id.toString());
        localStorage.setItem("bookmarkedCourses", JSON.stringify(bookmarkedCourseIds));
        setBookmarkedCourses(bookmarkedCourseIds);
  
        // Log the course ID and bookmarked courses for debugging
        console.log("Current Course ID:", id);
        console.log("Bookmarked Courses:", bookmarkedCourseIds);
  
        // Check if the current course's id exists in the bookmarked courses
        const isBookmarked = bookmarkedCourseIds.includes(id.toString());
        console.log("isBookmarked:", isBookmarked);
        setIsBookmarked(isBookmarked);
        
      } catch (error) {
        console.error("Error fetching bookmarked courses:", error);
      }
    };
  
    fetchBookmarkedCourses();
  }, [id, userId]);
  
  
  

  const handleBookmarkClick = () => {
    console.log("Bookmark icon clicked");
    if (isBookmarked) {
        console.log("Removing bookmark");
        deleteBookmark();
    } else {
        console.log("Adding bookmark");
        addBookmark(id, userId); // Ensure courseId and userId are correctly passed
    }
};


  const runAxeCore = async () => {
    setLoadingAxeCore(true);
    try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
      // Make API call to '/runAxeCore' endpoint
      const response = await axios.get('http://192.168.100.35/api/runAxeCore', {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the headers
        },
        params: {
          url: course.mooc_link,
        },
      });

      // Handle response and store results in state
      console.log('Axe-Core Results:', response.data);
      setAxeCoreResults(response.data);
      setAxeCoreModalOpen(true); // Open modal to display results
    } catch (error) {
      console.error('Error running Axe-Core:', error);
      // Handle error as needed
    }
    setLoadingAxeCore(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAxeCoreModalClose = () => {
    setAxeCoreModalOpen(false);
  };

  const renderAxeCoreResults = () => (
    <Dialog open={axeCoreModalOpen} onClose={handleAxeCoreModalClose} maxWidth="lg" fullWidth>
      <DialogTitle>Axe-Core Analysis Results</DialogTitle>
      <DialogContent dividers>
        <List>
          {axeCoreResults.map((violation, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={violation.help}
                primaryTypographyProps={{ fontSize: '1.5rem' }} // Increase font size
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary" style={{ fontSize: '1.3rem' }}>
                      Description: {violation.description}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textPrimary" style={{ fontSize: '1.3rem' }}>
                      Impact: {violation.impact}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textPrimary" style={{ fontSize: '1.3rem' }}>
                      Help URL: <a href={violation.helpUrl} target="_blank" rel="noopener noreferrer">{violation.helpUrl}</a>
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={handleAxeCoreModalClose} color="primary">
          Close
        </MuiButton>
      </DialogActions>
    </Dialog>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!course) {
    return <p>Course not found</p>;
  }

  const handleReviewsChange = (index) => {
    const newIndex = Math.max(0, Math.min(index, reviews.length - 1));
    setActiveReviewsIndex(newIndex);
  };

  return (
    <>
    <div>
      <Navigationuser />

      <div className="course-details-container">
        <div className="course-details-content">
          <div className="course-details-info">
            <p>{course.mooc_category}</p>
            <h2>{course.mooc_name}</h2>
            <p>{course.mooc_description}</p>
            <p>
              <span style={{ color: "black" }}>University Related: </span>
              {course.university_related}
            </p>
            <p>
              <span style={{ color: "black" }}>Mooc Provider:</span>
              {course.mooc_provider}
              <br></br>
              <span style={{ color: "black" }}>Language: </span>
              {course.mooc_language}
            </p>
            <div className="bookmark-icon-container">
              <div className="bookmark-icon-container">
                <BookmarkContainer>
                  <FontAwesomeIcon
                    icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
                    onClick={handleBookmarkClick}
                    className={`bookmark-icon ${isBookmarked ? "bookmarked" : ""}`}
                  />
                  <CustomAlerts
                    isOpen={bookmarkAlertOpen}
                    onClose={() => setBookmarkAlertOpen(false)}
                    message={bookmarkAlertMessage}
                    severity={bookmarkAlertSeverity}
                    style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, width: '750px' }} /* Increase width */
                  />
                </BookmarkContainer>
                <div className="reviews-container">
                  <h3 className="reviews-title">Reviews</h3>
                  <div style={{ maxWidth: "800px", margin: "0 auto", position: 'relative' }}>
                    <ItemsCarousel
                      requestToChangeActive={handleReviewsChange}
                      activeItemIndex={activeReviewsIndex}
                      numberOfCards={1}
                      gutter={20}
                      leftChevron={
                        <Arrow direction="left" contentHeight={contentHeights[activeReviewsIndex]}>
                          <FontAwesomeIcon style={{ color: 'white', fontSize: '2rem' }} icon={faAngleLeft} />
                        </Arrow>
                      }
                      rightChevron={
                        <Arrow direction="right" contentHeight={contentHeights[activeReviewsIndex]}>
                          <FontAwesomeIcon style={{ color: 'white', fontSize: '2rem' }} icon={faAngleRight} />
                        </Arrow>
                      }
                      outsideChevron={false}
                    >
                      {reviews.map((review, index) => (
                        <div ref={(ref) => contentRefs.current[index] = ref} key={index} className="review-item">
                          <ReviewCard>
                            <div className="review-header">
                              <img
                                src={`http://192.168.100.35/api/${review.user_picture.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                alt={`Picture of ${review.name}`}
                                className="review-avatar"
                              />
                              <div className="review-info">
                                <p>{review.name}</p>
                                <p>{new Date(review.timestamp).toLocaleString()}</p>
                              </div>
                            </div>
                            <ReviewText>{review.review}</ReviewText>
                            <p className="review-rating">
                              ({review.rating})<StarRating rating={review.rating} />
                            </p>
                          </ReviewCard>
                        </div>
                      ))}
                    </ItemsCarousel>
                  </div>
                  <Button onClick={openModal}>Add Review</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="course-details-image">
            <img src={course.category_image} alt="Category" />
            <p>
              <span style={{ color: "black" }}>Price: </span>
              {course.mooc_price}
            </p>
            <p>
              <span style={{ color: "black" }}>Estimated Efforts: </span>
              {course.estimated_efforts}
            </p>
            <p>
              <span style={{ color: "black" }}>Requirements: </span>
              {course.course_levels}
            </p>
            <p>
              <span style={{ color: "black" }}>Length: </span>
              {course.lengths}
            </p>
            <p>
              <span style={{ color: "black" }}>Subtitles: </span>
              {course.closed_caption}
            </p>
            <div className="course-rating">
              <StarRating rating={averageRating} />
            </div>
            <Link to={course.mooc_link}>
              <LinkButton
                fontSize="1.4rem"
                color="#005387"
                height="4rem"
                width="20rem"
              >
                Enroll now
              </LinkButton>
            </Link>
            <MuiButton
              onClick={runAxeCore}
              style={{
                fontSize: "1.4rem",
                color: "white",
                height: "40px",
                width: "50%",
                fontWeight: "700",
                marginLeft: "10px",
                borderRadius: "8px",
                backgroundColor: "#005387",
              }}
              disabled={loadingAxeCore}
            >
              {loadingAxeCore ? <CircularProgress size={24} style={{ color: "white" }} /> : "Check Course accessibility issues"}
            </MuiButton>
          </div>
        </div>
      </div>

      <div className="related-courses-carousel-container">
        <RelatedCoursesCarousel
          relatedCourses={relatedCourses}
          currentCourseId={id}
        />
      </div>
     
      {showModal && (
        <Modal
          show={showModal}
          onClose={closeModal}
          courseId={id}
          userId={userId}
        />
      )}

      {/* Render Axe-Core results modal */}
      {renderAxeCoreResults()}
    </div>
     <AccessibilitybarContainer/>
     <Footer />
     </>
  );
};

export default CourseDetails;
