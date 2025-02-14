import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import ItemsCarousel from "react-items-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import StarRating from "../StarRating/StarRating";
import { useNavigate } from "react-router-dom";

const ReviewsSliderWrapper = styled.div`
  margin-top: 3rem;
  height: 450px;
`;

const ReviewsCarousel = styled(ItemsCarousel)`
  width: 100%;
`;

const ReviewsCard = styled.div`
  display: flex;
  background-color: #ffffff;
  margin-top: 3px;
  border-radius: 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  word-wrap: break-word;
`;

const UserSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserImage = styled.img`
  border-radius: 50%;
  margin-bottom: 20px;
  width: 180px;
  height: 180px;
`;

const ReviewDescription = styled.div`
  flex: 2;
  text-align: left;
  white-space: normal;
  word-wrap: break-word;
  max-width: 100%;
  overflow: auto;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  height: 500px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const Container = styled.div`
  margin-top: 6.4rem;
  padding-right: 2.4rem;
  padding-left: 2.4rem;
`;

const CoursesListWrapper = styled.div`
  margin-top: 4.8rem;
`;

const CoursesListTitle = styled.h2`
  margin-bottom: 1.6rem;
  color: #005387;
  max-width: 80rem;
  font-weight: 700;
  font-size: 2.4rem;
  letter-spacing: -0.02rem;
  line-height: 1.2;
`;

const CourseWrapper = styled.div`
  position: relative;
  height: 500px;
`;

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
  ${(props) => (props.direction === "right" ? "right: -2rem;" : "left: -2rem;")}
  cursor: pointer;
  z-index: 2;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const NavBar = styled.div`
  display: inline-flex;
  padding: 10px;
  justify-content: space-around;
  position: relative;
`;

const NavItem = styled.div`
  padding: 10px 20px;
  color: ${(props) => (props.active ? '#0056d2' : 'black')};
  cursor: pointer;
  font-size: 16px;
  font-family: 'Source Sans Pro', sans-serif;
  position: relative;

  &:hover {
    background-color: #d9e8ff;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px; /* Adjust to control the distance of the underline */
    left: 0;
    right: 0;
    height: 4px;
    background-color: ${(props) => (props.active ? '#0056d2' : '#D3D3D3')};
    transition: background-color 0.3s;
  }
`;


const CourseslistHome = () => {
  const [courses, setCourses] = useState([]);
  const [mostRatedCourses, setMostRatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Programming & Technology");
  const categories = [
    "Programming & Technology",
    "Design & Arts",
    "Business & Management",
    "Health & Wellness",
    "Education & Learning",
    "Science & Engineering",
    "Humanities & Social Sciences",
    "Mindfulness & Spirituality",
    "Language & Communication",
    "Miscellaneous & Other",
  ];
  const navBarRef = useRef(null);
  const navigate = useNavigate();
  const [activeCoursesIndex, setActiveCoursesIndex] = useState(0);
  const [activeMostRatedIndex, setActiveMostRatedIndex] = useState(0);
  const [activeReviewsIndex, setActiveReviewsIndex] = useState(0);
  const chevronWidth = 50;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/${selectedCategory}`
        );
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
    fetchReviews();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchMostRatedCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/best-rated-courses/${selectedCategory}`
        );
        setMostRatedCourses(response.data);
      } catch (error) {
        console.error("Error fetching most rated courses:", error);
      }
    };

    fetchMostRatedCourses();
  }, [selectedCategory]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reviews/${selectedCategory}`
      );
      console.log("Reviews data:", response.data); // Log reviews data
      setReviews(response.data);
      
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleCoursesChange = (index) => setActiveCoursesIndex(index);
  const handleReviewsChange = (index) => {
    const newIndex = Math.max(0, Math.min(index, reviews.length - 1));
    setActiveReviewsIndex(newIndex);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? "star" : ["far", "star"]}
          style={{ color: "gold", fontSize: "1.4rem" }}
        />
      );
    }
    return stars;
  };

  return (
    <Container>
      <CoursesListWrapper>
        <NavBar ref={navBarRef}>
          {categories.map((category, index) => (
            <NavItem 
              key={index} 
              onClick={() => setSelectedCategory(category)}
              active={selectedCategory === category}
            >
              {category}
            </NavItem>
          ))}
        </NavBar>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CourseWrapper>
            <ItemsCarousel
              requestToChangeActive={handleCoursesChange}
              activeItemIndex={activeCoursesIndex}
              numberOfCards={5}
              gutter={20}
              leftChevron={
                <Arrow direction="left">
                  <FontAwesomeIcon
                    style={{ color: "white", fontSize: "2rem" }}
                    icon={faAngleLeft}
                  />
                </Arrow>
              }
              rightChevron={
                <Arrow direction="right">
                  <FontAwesomeIcon
                    style={{ color: "white", fontSize: "2rem" }}
                    icon={faAngleRight}
                  />
                </Arrow>
              }
              outsideChevron={false}
              chevronWidth={chevronWidth}
            >
              {courses.map((course, index) => (
                <StyledCard key={index}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={course.category_image}
                      alt={course.mooc_category}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#005387", fontSize: "1.8rem" }}
                      >
                        {course.mooc_name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "1.4rem", color: "#666666" }}
                      >
                        Provider:{" "}
                        <span style={{ color: "black" }}>
                          {course.mooc_provider}
                        </span>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "1.4rem", color: "#666666" }}
                      >
                        Language:{" "}
                        <span style={{ color: "black" }}>
                          {course.mooc_language}
                        </span>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "1.4rem", color: "#666666" }}
                      >
                        Requirements:{" "}
                        <span style={{ color: "black" }}>
                          {course.course_levels
                            ? course.course_levels
                            : "Not Found"}
                        </span>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "1.4rem", color: "#666666" }}
                      >
                        Price:{" "}
                        <span style={{ color: "black" }}>
                          {course.mooc_price}
                        </span>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/coursedetails/${course.id}`)} // Navigate to coursedetails with course ID
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        fontSize: "10px",
                      }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </StyledCard>
              ))}
            </ItemsCarousel>
          </CourseWrapper>
        )}

        <div
          style={{
            marginTop: "100px",
            backgroundColor: "#f7f9fa",
            height: "600px",
          }}
        >
          <Typography variant="h3" color="primary" gutterBottom>
            Reviews for Courses in {selectedCategory}
          </Typography>
          <ReviewsSliderWrapper>
            <ReviewsCarousel
              requestToChangeActive={handleReviewsChange}
              activeItemIndex={activeReviewsIndex}
              numberOfCards={1}
              gutter={20}
              leftChevron={
                <Arrow
                  direction="left"
                  onClick={() => handleReviewsChange(activeReviewsIndex - 1)}
                >
                  <FontAwesomeIcon
                    style={{ color: "white", fontSize: "2rem" }}
                    icon={faAngleLeft}
                  />
                </Arrow>
              }
              rightChevron={
                <Arrow
                  direction="right"
                  onClick={() => handleReviewsChange(activeReviewsIndex + 1)}
                >
                  <FontAwesomeIcon
                    style={{ color: "white", fontSize: "2rem" }}
                    icon={faAngleRight}
                  />
                </Arrow>
              }
              outsideChevron={false}
              chevronWidth={chevronWidth}
            >
              {reviews.map((review, index) => (
                <div key={index}>
                  {console.log(
                    "User Image URL:",
                    `http://localhost:5000/api/${review.user_picture.replace(
                      /\//g,
                      "/"
                    )}`
                  )}
                  <ReviewsCard>
                    <ReviewDescription>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ fontSize: "15px" }}
                      >
                        {review.review}
                      </Typography>
                    </ReviewDescription>
                    <UserSection>
                      <UserImage
                        src={`http://localhost:5000/api/${review.user_picture.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="User"
                        width="100"
                        height="100"
                      />
                      <Typography
                        variant="body1"
                        color="primary"
                        style={{
                          fontSize: "24px",
                          color: "#005387",
                          marginBottom: "10px",
                        }}
                      >
                        {review.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "1.4rem", color: "#666666" }}
                      >
                        <span style={{ color: "black" }}>
                          <StarRating rating={review.rating} />
                        </span>
                      </Typography>
                    </UserSection>
                  </ReviewsCard>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      color: "#005387",
                      fontSize: "2.2rem" /* Increased font size */,
                      marginTop: "0.5rem",
                      textAlign: "center",
                    }}
                  >
                    {review.mooc_name}
                  </Typography>
                </div>
              ))}
            </ReviewsCarousel>
          </ReviewsSliderWrapper>
        </div>
      </CoursesListWrapper>
    </Container>
  );
};

export default CourseslistHome;