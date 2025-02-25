import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CategoryPage.css";
import {
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Paper,
  FormGroup,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "styled-components";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import NavigationUser from "../../components/Navigation/Navigationuser";
import Footer from "../../components/Footer/Footer";
import MostReviewedCoursesCarousel from "../../components/Carousels/MostReviewedCoursesCarousel";
import MostRatedCoursesCarousel from "../../components/Carousels/MostRatedCoursesCarousel";
import HighestRatedUniversitiesCarousel from "../../components/Carousels/HighestRatedUniversitiesCarousel";
import AccessibilitybarContainer from "../../container/AccessibilitybarContainer";
import Chatbot from "../../components/Chatbot/chatbot";
const CourseWrapper = styled(Paper)`
  display: flex;
  margin: 20px;
  padding: 20px;
  background-color: #fff;
`;

const FilterBox = styled.div`
  width: 300px;
  padding: 20px;
  margin-right: 20px;
`;

const CoursesContainer = styled.div`
  flex: 1;
  margin-right: 40px;
`;

const CategoryPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expanded, setExpanded] = useState(false); // New state for controlling accordion expansion
  const [showMore, setShowMore] = useState({}); // New state for handling "Show More"
  const [categories, setCategories] = useState([]); // New state for categories
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const location = useLocation();
  const [closedCaptionOptions, setClosedCaptionOptions] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // State for total pages


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.100.35/api/categories');
        setCategories(response.data);
        console.log('Fetched categories:', response.data); // Log the fetched categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialFilters = {};

    for (const [key, value] of searchParams.entries()) {
      initialFilters[key] = value;
    }

    setSelectedFilters(initialFilters);
    setPageNumber(parseInt(searchParams.get("page")) || 1);
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(selectedFilters);
        const response = await axios.get(
          `http://192.168.100.35/api/category/${categoryName}/page/${pageNumber}`,
          {
            params: selectedFilters,
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();

    axios
      .get("http://192.168.100.35/api/filter-options")
      .then((response) => {
        setFilterOptions(response.data);

        // Process closed captions if available
        if (response.data && response.data.closed_caption) {
          const closedCaptions = response.data.closed_caption;

          // Parse the strings into arrays of languages and flatten them
          const processedClosedCaptions = closedCaptions
            .map((caption) =>
              caption
                .replace(/\[|\]|'/g, "") // Remove square brackets and single quotes
                .split(", ") // Split by comma and space to get individual languages
            )
            .flat(); // Flatten the arrays

          // Filter out empty and duplicate values
          const uniqueLanguages = processedClosedCaptions.filter(
            (language) => language.trim() !== ""
          );

          // Retrieve unique language values
          const uniqueLanguageSet = new Set(uniqueLanguages);

          // Set closed caption options
          const closedCaptionOptionsArray = Array.from(uniqueLanguageSet);
          console.log("Final Closed Caption Options:", closedCaptionOptionsArray);
          setClosedCaptionOptions(closedCaptionOptionsArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching filter options:", error);
      });
  }, [categoryName, pageNumber, selectedFilters]);

  const handlePageChange = (newPageNumber) => {
    const nextPageNumber = newPageNumber;

    if (nextPageNumber > 0) {
      setPageNumber(nextPageNumber);
      const searchParams = new URLSearchParams(selectedFilters);
      searchParams.set("page", nextPageNumber);
      navigate(`?${searchParams.toString()}`, { replace: true });
    }
  };
  const handleFilterChange = (filterName, value) => {
    if (filterName === "closed_caption") {
      let currentValues = selectedFilters[filterName]
        ? JSON.parse(selectedFilters[filterName].replace(/'/g, '"'))
        : [];
  
      if (!Array.isArray(currentValues)) {
        currentValues = [];
      }
  
      let newValues;
      if (currentValues.includes(value)) {
        newValues = currentValues.filter((item) => item !== value);
      } else {
        newValues = [...currentValues, value];
      }
  
      // Filter out any empty strings
      newValues = newValues.filter(item => item.trim() !== "");
  
      // Manually construct the string with single quotes
      value = newValues.length ? `['${newValues.join("', '")}']` : null; // Set value to null if the array is empty
  
      setSelectedFilters((prevFilters) => {
        const newFilters = { ...prevFilters, [filterName]: value };
        if (value === null) {
          delete newFilters[filterName]; // Remove the filter if value is null
        }
        return newFilters;
      });
    } else {
      let currentValues = selectedFilters[filterName]
        ? selectedFilters[filterName].split(',')
        : [];
  
      if (!Array.isArray(currentValues)) {
        currentValues = [];
      }
  
      let newValues;
      if (currentValues.includes(value)) {
        newValues = currentValues.filter((item) => item !== value);
      } else {
        newValues = [...currentValues, value];
      }
  
      // Filter out any empty strings
      newValues = newValues.filter(item => item.trim() !== "");
  
      // Join the values with a comma
      value = newValues.length ? newValues.join(",") : ""; // Set value to an empty string if the array is empty
  
      setSelectedFilters((prevFilters) => {
        const newFilters = { ...prevFilters, [filterName]: value };
        if (!value) {
          delete newFilters[filterName]; // Remove the filter if value is an empty string
        }
        return newFilters;
      });
    }
  };
  
  
  
  
  
  
  
  
  
  

  const applyFilters = () => {
    const searchParams = new URLSearchParams();

    Object.keys(selectedFilters).forEach((filterKey) => {
      searchParams.append(filterKey, selectedFilters[filterKey]);
    });

    searchParams.set("page", pageNumber);

    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleShowMore = (filterKey) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [filterKey]: !prevShowMore[filterKey],
    }));
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <NavigationUser />
      <Divider sx={{ marginBottom: '1px', backgroundColor: "#D3D3D3", fontWeight: "bold" }} />

      <AppBar position="static" color="default" style={{ backgroundColor: "white", color: "black" }}>
        <Toolbar>
          <Tabs
            value={categoryName || categories[0]} // Set the value to the current category or the first one
            onChange={(e, newValue) => navigate(`/category/${encodeURIComponent(newValue)}/page/1`)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="category tabs"
          >
            {categories.map((category, index) => (
              <Tab
                key={index}
                label={category}
                value={category}
                component={Link}
                to={`/category/${encodeURIComponent(category)}/page/1`}
                style={{ fontSize: "10px" }}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <div style={{ padding: "20px", display: "flex", flexDirection: 'column' }}>
        <h1 style={{ width: "100%", textAlign: "center", fontFamily: "Suisse Works, serif", fontSize: "32px", color: "#2d2f31", marginTop: "20px" }}>
          {categoryName}
        </h1>

        <div style={{ padding: "20px", display: "flex", flexDirection: 'column' }}>
          <h1 style={{ width: "100%", textAlign: "start", fontFamily: "Suisse Works, serif", fontSize: "32px", color: "#2d2f31", marginTop: "30px" }}>
            Most Reviewed Courses
            <MostReviewedCoursesCarousel categoryName={categoryName} />
          </h1>
        </div>

        <div style={{ display: "flex", flexDirection: 'column' }}>
          <h1 style={{ width: "100%", textAlign: "start", fontFamily: "Suisse Works, serif", fontSize: "32px", color: "#2d2f31", marginTop: "30px" }}>
            Most Rated Courses
          </h1>
        </div>
        <MostRatedCoursesCarousel categoryName={categoryName} />

        {/*
        <Typography variant="h4" gutterBottom>
          Highest Rated Universities
          <HighestRatedUniversitiesCarousel categoryName={categoryName} />
        </Typography>
      */}

        <Divider sx={{ marginBottom: '20px', marginTop: '20px', height: "2px", backgroundColor: "#D3D3D3", fontWeight: "bold" }} />

        <CourseWrapper>
          <FilterBox>
            <Typography variant="h4" color="black" gutterBottom>
              Filter Options
            </Typography>

            <Divider sx={{ marginBottom: '10px', height: "2px", backgroundColor: "#D3D3D3", fontWeight: "bold" }} />  {/* Horizontal line above the first filter key */}

            {Object.keys(filterOptions).map((filterKey, index) => (
              <React.Fragment key={filterKey}>
                {index > 0 && <Divider sx={{ margin: '10px 0', height: "2px", backgroundColor: "#D3D3D3", fontWeight: "bold" }} />}  {/* Horizontal line between filter keys */}
                <Accordion
                  expanded={expanded === filterKey}
                  onChange={handleAccordionChange(filterKey)}
                  sx={{
                    border: 'none',
                    boxShadow: 'none',
                    '&:before': {
                      display: 'none',
                    },
                    '&.Mui-expanded': {
                      margin: '0',
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ fontWeight: "400", fontSize: "1.6rem" }}>{filterKey.replaceAll("_", " ").toUpperCase()}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
  <FormGroup>
    {filterKey === "closed_caption"
      ? closedCaptionOptions
          .filter((option) => option.trim() !== "")
          .slice(0, showMore[filterKey] ? closedCaptionOptions.length : 5)
          .map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={
                    selectedFilters[filterKey] &&
                    JSON.parse(selectedFilters[filterKey].replace(/'/g, '"')).includes(option)
                  }
                  onChange={(e) =>
                    handleFilterChange(
                      filterKey,
                      e.target.checked ? option : option
                    )
                  }
                />
              }
              label={option}
            />
          ))
      : filterOptions[filterKey]
          .filter((option) => option.trim() !== "")
          .slice(0, showMore[filterKey] ? filterOptions[filterKey].length : 5)
          .map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={
                    selectedFilters[filterKey] &&
                    selectedFilters[filterKey].split(',').includes(option)
                  }
                  onChange={(e) =>
                    handleFilterChange(
                      filterKey,
                      e.target.checked ? option : option
                    )
                  }
                />
              }
              label={option}
            />
          ))}
    {filterOptions[filterKey].length > 5 && (
      <Button
        onClick={() => handleShowMore(filterKey)}
        style={{ fontSize: "0.8rem", marginTop: "10px" }}
      >
        {showMore[filterKey] ? "Show Less" : "Show More"}
      </Button>
    )}
  </FormGroup>
</AccordionDetails>
                </Accordion>
              </React.Fragment>
            ))}

            <Divider sx={{ marginBottom: '10px', height: "2px", backgroundColor: "#D3D3D3", fontWeight: "bold" }} />
          </FilterBox>
          <CoursesContainer>
            {loading ? (
              <p>Loading...</p>
            ) : courses.length === 0 ? (
              <Typography variant="body1" color="primary">
                No courses found.
              </Typography>
            ) : (
              courses.map((course, index) => (
                <React.Fragment key={index}>
                  <div className={`blog-card ${index % 2 === 0 ? '' : 'alt'}`}>
                    <div className="meta">
                      <div
                        className="photo"
                        style={{ backgroundImage: `url(${course.category_image})` }}
                      ></div>
                      <ul className="details">
                        <li className="author"><a href="#">{course.instructor_name}</a></li>
                        <li className="date">{course.course_date}</li>
                        <li className="tags">
                          <ul>
                            <li><a href="#">{course.tag1}</a></li>
                            <li><a href="#">{course.tag2}</a></li>
                            <li><a href="#">{course.tag3}</a></li>
                            <li><a href="#">{course.tag4}</a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div className="description">
                      <h1>{course.mooc_name}</h1>
                      <h2>{course.mooc_provider}</h2>
                      <p>{course.mooc_description}</p>
                      <p className="read-more">
                        <a href={`/coursedetails/${course.id}`}>Learn More</a>
                      </p>
                    </div>
                  </div>
                  <Divider sx={{ margin: '20px 0', backgroundColor: "#D3D3D3", fontWeight: "bold" }} />
                </React.Fragment>
              ))
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber === 1}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={courses.length === 0}
            >
              Next
            </Button>
          </CoursesContainer>
        </CourseWrapper>
      </div>
      <AccessibilitybarContainer/>
      <Footer />
    </div>
  );
};

export default CategoryPage;
