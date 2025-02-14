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
  margin-top: 6.4rem;
  padding-right: 2.4rem;
  padding-left: 2.4rem;
`;

const CarouselWrapper = styled.div`
  margin-top: 3rem;
`;

const Carousel = styled(ItemsCarousel)`
  width: 90%;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  height: 150px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
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

const HighestRatedUniversitiesCarousel = ({ categoryName }) => {
  const [highestRatedUniversities, setHighestRatedUniversities] = useState([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 50;
  const navigate = useNavigate();

  useEffect(() => {
    const FetchHighestRatedUniversities = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api//highest-rated-universities/${categoryName}`);
        setHighestRatedUniversities(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching most reviewed courses:", error);
      }
    };

    FetchHighestRatedUniversities();
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
          outsideChevron={false}
          chevronWidth={chevronWidth}
        >
          {highestRatedUniversities.map((course, index) => (
            <StyledCard key={index}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div"style={{ fontSize: "1.6rem" }}>
                {course.university_related}
              </Typography>
              <Typography variant="body2" color="text.secondary"style={{ fontSize: "1.6rem" }}>
                Total Courses: {course.total_courses}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontSize: "1.6rem" }}>
  Average Rating: {course.average_rating ? course.average_rating : "Not Found"}
</Typography>
            </CardContent>
          </StyledCard>
        ))}
          
        </Carousel>
      </CarouselWrapper>
    </Container>
  );
};

export default HighestRatedUniversitiesCarousel;
