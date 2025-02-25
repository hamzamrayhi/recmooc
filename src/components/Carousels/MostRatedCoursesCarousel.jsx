import React, { useState, useEffect } from "react";
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

const Container = styled.div`
 
  padding: 1.4rem;
  


`;

const CarouselWrapper = styled.div`
`;

const Carousel = styled(ItemsCarousel)`
  width: 90%;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  height: 100%;
  position: relative;
  border-radius: 8px;
  margin-bottom : 10px
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

const MostRatedCoursesCarousel = ({ categoryName }) => {
  const [mostReviewedCourses, setMostReviewedCourses] = useState([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 50;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMostReviewedCourses = async () => {
      try {
        const response = await axios.get(`http://192.168.100.35/api/highest-rated-courses/${categoryName}`);
        setMostReviewedCourses(response.data);
      } catch (error) {
        console.error("Error fetching most reviewed courses:", error);
      }
    };

    fetchMostReviewedCourses();
  }, [categoryName]);

  const handleActiveItemChange = (index) => setActiveItemIndex(index);

  return (
    <Container>
      <CarouselWrapper>
        <Carousel
          requestToChangeActive={handleActiveItemChange}
          activeItemIndex={activeItemIndex}
          numberOfCards={5}
          gutter={20}
          leftChevron={
            <Arrow direction="left">
              <FontAwesomeIcon style={{ color: "white", fontSize: "2rem" }} icon={faAngleLeft} />
            </Arrow>
          }
          rightChevron={
            <Arrow direction="right">
              <FontAwesomeIcon style={{ color: "white", fontSize: "2rem" }} icon={faAngleRight} />
            </Arrow>
          }
           chevronWidth={chevronWidth}
        >
          {mostReviewedCourses.map((course, index) => (
            <StyledCard key={index}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={course.category_image}
                  alt={course.mooc_category}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: "#005387", fontSize: "1.8rem" }}>
                    {course.mooc_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.4rem", color: "#666666" }}>
                    Provider: <span style={{ color: "black" }}>{course.mooc_provider}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.4rem", color: "#666666" }}>
                    Language: <span style={{ color: "black" }}>{course.mooc_language}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.4rem", color: "#666666" }}>
                    Requirements: <span style={{ color: "black" }}>{course.course_levels ? course.course_levels : "Not Found"}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.4rem", color: "#666666" }}>
                    Price: <span style={{ color: "black" }}>{course.mooc_price}</span>
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
                  style={{ position: "absolute", bottom: 0, left: 0, right: 0, fontSize: "10px" }}
                >
                  Learn More
                </Button>
              </CardActions>
            </StyledCard>
          ))}
        </Carousel>
      </CarouselWrapper>
    </Container>
  );
};

export default MostRatedCoursesCarousel;
