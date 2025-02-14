import React from 'react';
import NavigationUser from '../../components/Navigation/Navigationuser';
import HeaderContainer from "../../container/HeaderContainer";
import TopCategoriesContainer from "../../container/TopCategoriesContainer";
import AdvertisementContainer from "../../container/AdvertisementContainer";
import AccessibilitybarContainer from "../../container/AccessibilitybarContainer";
import ChatbotContainer from "../../container/chatbotContainer";
import FooterContainer from "../../container/FooterContainer";
import "../homepage/homepage.css";
import CourselistContainer from '../../container/CourselistContainer';
function Userindex() {
  const token = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("user");
  console.log(user)
  console.log(token)
  return (
    <div className="homepage-container">
        <NavigationUser />
      
        <HeaderContainer />
        <CourselistContainer />
        <TopCategoriesContainer />
        <AdvertisementContainer />
        <AccessibilitybarContainer/>
        <ChatbotContainer />
        <FooterContainer />
        
    </div>
  );
}

export default Userindex;
