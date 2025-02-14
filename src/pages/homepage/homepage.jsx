import React, {useEffect} from 'react';
import Navigation from '../../container/NavigationContainer';
import HeaderContainer from "../../container/HeaderContainer";
import TopCategoriesContainer from "../../container/TopCategoriesContainer";
import AdvertisementContainer from "../../container/AdvertisementContainer";
import FooterContainer from "../../container/FooterContainer";
import Chatbot from "../../components/Chatbot/chatbot";
import "./homepage.css";

import CourselistHomeContainer from '../../container/CourselistHomeContainer';
function Homepage() {
  useEffect(() => {
    // Clear localStorage here
    localStorage.clear();
  }, []);
  return (
    <div className="homepage-container">
        <Navigation />
        <HeaderContainer />
        <CourselistHomeContainer />
        <TopCategoriesContainer />
        <AdvertisementContainer />
        <Chatbot />
        <FooterContainer />
        
    </div>
  );
}

export default Homepage;
