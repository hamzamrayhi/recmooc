import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ItemsCarousel from "react-items-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 2rem;
`;

const CarouselWrapper = styled.div`
  position: relative;
`;

const CarouselItem = styled(Link)`
  display: flex;
  background-color: #ffffff;
  margin-top: 3px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  text-decoration: none;
`;

const CourseImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const CourseDetails = styled.div`
  flex: 1;
  padding: 20px;
`;

const CourseName = styled.h3`
  color: #005387;
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

const CourseDescription = styled.p`
  font-size: 1.4rem;
  color: #666666;
  margin-bottom: 10px;
`;

const CoursePrice = styled.p`
  font-size: 1.4rem;
  color: #666666;
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

const RelatedCoursesCarousel = ({ relatedCourses, currentCourseId }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 50;

  const filteredCourses = relatedCourses.filter((course) => String(course.id) !== currentCourseId);

  useEffect(() => {
    const handleResize = () => {
      setActiveItemIndex(0); // Reset the active index on resize to prevent blank space
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container>
      <CarouselWrapper>
        <h2>Related Courses</h2>
        <ItemsCarousel
          requestToChangeActive={(index) => setActiveItemIndex(index)}
          activeItemIndex={activeItemIndex}
          numberOfCards={window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3}
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
          outsideChevron={false}
          slidesToScroll={1}
          showSlither={false}
          firstAndLastGutter={false}
          infiniteLoop={true}
        >
          {filteredCourses.map((relatedCourse, index) => (
            <CarouselItem key={index} to={`/coursedetails/${relatedCourse.id}`}>
              <CourseImage src={relatedCourse.category_image} alt={relatedCourse.mooc_name} />
              <CourseDetails>
                <CourseName>{relatedCourse.mooc_name}</CourseName>
                <CourseDescription>{relatedCourse.mooc_description}</CourseDescription>
                <CoursePrice>Price: {relatedCourse.mooc_price}</CoursePrice>
              </CourseDetails>
            </CarouselItem>
          ))}
        </ItemsCarousel>
      </CarouselWrapper>
    </Container>
  );
};

export default RelatedCoursesCarousel;
