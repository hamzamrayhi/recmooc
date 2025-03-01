import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { BookmarkBorder as BookmarkBorderIcon } from '@mui/icons-material'; // Importing the BookmarkBorder icon from Material-UI Icons
import NavigationUser from '../../components/Navigation/Navigationuser';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import AccessibilitybarContainer from '../../container/AccessibilitybarContainer';
import Chatbot from '../../components/Chatbot/chatbot';

const CourseCard = styled(Card)`
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
`;
const Header = styled.header`
  background-color: #f5f5f5; // Light gray background
  padding: 16px 20px;
  text-align: center;
  font-size: 24px;
  color: #333; // Dark gray text color
  font-family: 'Roboto', sans-serif; // Roboto font for better readability
`;

const CourseCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CourseCardMedia = styled(CardMedia)`
  width: 300px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* This ensures the container takes at least the full height of the viewport */
`;

const ContentContainer = styled.div`
  flex-grow: 1; /* This makes sure the content takes all the available space */
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

const NoBookmarksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const BookmarksPage = () => {
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Programming & Technology");
  const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const navigate = useNavigate();
  const navBarRef = useRef(null);

  useEffect(() => {
    const fetchBookmarkedCoursesByCategory = async (categoryName) => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_KEY}/bookmarked-courses/${userId}/category/${categoryName}`);
        console.log(`Fetched bookmarked courses for category ${categoryName}:`, response.data);
        setBookmarkedCourses(response.data);
      } catch (error) {
        console.error(`Error fetching bookmarked courses for category ${categoryName}:`, error);
      }
    };

    fetchBookmarkedCoursesByCategory(selectedCategory);
  }, [selectedCategory, userId]);

  const fetchBookmarkedCoursesByCategory = async (categoryName) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_KEY}/bookmarked-courses/${userId}/category/${categoryName}`);
      console.log(`Fetched bookmarked courses for category ${categoryName}:`, response.data);
      setBookmarkedCourses(response.data);
    } catch (error) {
      console.error(`Error fetching bookmarked courses for category ${categoryName}:`, error);
    }
  };

  const deleteBookmark = async (courseId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_KEY}/bookmarks/${courseId}`,
        {
          params: {
            userId: userId,
          },
        }
      );

      setBookmarkedCourses((prevBookmarkedCourses) => {
        const updatedCourses = prevBookmarkedCourses.filter(
          (course) => course.id !== courseId
        );
        localStorage.setItem("bookmarkedCourses", JSON.stringify(updatedCourses));
        return updatedCourses;
      });

      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  const categories = [
    'Programming & Technology',
    'Design & Arts',
    'Business & Management',
    'Health & Wellness',
    'Education & Learning',
    'Science & Engineering',
    'Humanities & Social Sciences',
    'Mindfulness & Spirituality',
    'Language & Communication',
    'Miscellaneous & Other'
  ];

  return (
    <PageContainer >
      <NavigationUser />
      <Header>Bookmarked Courses</Header>
      <ContentContainer>
        <NavBar ref={navBarRef}>
          {categories.map((category, index) => (
            <NavItem 
              key={index} 
              onClick={() => {
                setSelectedCategory(category);
                fetchBookmarkedCoursesByCategory(category);
              }}
              active={selectedCategory === category}
            >
              {category}
            </NavItem>
          ))}
        </NavBar>
        <div>
          {bookmarkedCourses.length === 0 ? (
            <NoBookmarksContainer>
              <BookmarkBorderIcon style={{ fontSize: 100, color: 'gray' }} />
              <Typography variant="body1" color="textSecondary" style={{fontSize:"13px"}}>
                No bookmarked courses found.
              </Typography>
            </NoBookmarksContainer>
          ) : (
            bookmarkedCourses.map((course) => (
              <CourseCard key={course.id}>
                <CourseCardMedia
                  component="img"
                  image={course.category_image}
                  alt={course.mooc_name}
                  style={{ width: '300px' }}
                />
                <CourseCardContent>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" style={{ color: 'black', fontSize: '1.5rem' }}>
                        {course.mooc_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong style={{ color: 'black', fontSize: '1.2rem' }}>Provider:</strong>{' '}
                        <span style={{ color: 'gray', fontSize: '1.2rem' }}>{course.mooc_provider}</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong style={{ color: 'black', fontSize: '1.2rem' }}>Language:</strong>{' '}
                        <span style={{ color: 'gray', fontSize: '1.2rem' }}>{course.mooc_language}</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong style={{ color: 'black', fontSize: '1.2rem' }}>Requirements:</strong>{' '}
                        <span style={{ color: 'gray', fontSize: '1.2rem' }}>{course.course_levels}</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong style={{ color: 'black', fontSize: '1.2rem' }}>Price:</strong>{' '}
                        <span style={{ color: 'gray', fontSize: '1.2rem' }}>{course.mooc_price}</span>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <div style={{ marginTop: 'auto' }}>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => navigate(`/coursedetails/${course.id}`)} style={{fontSize:"10px"}}>
                        Learn More
                      </Button>
                      <Button size="small" color="secondary" onClick={() => deleteBookmark(course.id)}style={{fontSize:"10px"}}>
                        Remove Bookmark
                      </Button>
                    </CardActions>
                  </div>
                </CourseCardContent>
              </CourseCard>
            ))
          )}
        </div>
        <AccessibilitybarContainer/>
        <Chatbot/>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default BookmarksPage;
