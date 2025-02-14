import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TopCategoriesContainer = styled.div`
  margin-top: 6.4rem;
  font-weight: 400;
  line-height: 1.4;
  font-size: 1.6rem;
  color: #1c1d1f;
`;

const TopCategoriesSection = styled.section`
  max-width: 134rem;
  margin-right: auto;
  margin-left: auto;
  padding: 0 2.4rem;
`;

const TopCategoriesSectionTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.2;
  color: #005387;
  letter-spacing: -0.02rem;
  margin-top: 0;
  margin-bottom: 2.4rem;
`;

const TopCategoriesContain = styled.div`
  display: flex;
  flex-wrap: wrap; // Allow items to wrap onto the next line
  align-items: center; // Align items vertically in the center
  justify-content: space-around; // Distribute items evenly with space around them
  margin: 0 -1.6rem -3.2rem 0;
`;

const TopCategoriesCard = styled(Link)`
  margin: 40px;
  max-width: calc(100% / 4 - 1.6rem);
  cursor: pointer;
  position: relative;
  text-decoration: none;
  text-align: center; // Center-align the text
`;

const CategoryCardImgWrapper = styled.div`
  overflow: hidden;
`;

const CategoryCardImg = styled.img`
  background-color: #f7f9fa;
  display: block;
  object-fit: contain;
  transition: transform 200ms cubic-bezier(0.2, 0, 1, 0.9);
  max-width: 100%;
  width: 230px;
  height: 250px;
`;

const CategoryCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 120, 135, 0.2); /* Adjust the color and opacity as needed */
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const CategoryCardTitle = styled.div`
  color: #005387;
  padding: 0.8rem 0 1.6rem 0;
`;

const CategoryCardTitleSpan = styled.span`
  font-weight: 700;
  line-height: 1.2;
  font-size: 1.6rem;
  letter-spacing: -0.02rem;
`;

const TopCategoriesCardWithHover = ({ to, src, alt, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TopCategoriesCard
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CategoryCardImgWrapper>
        <CategoryCardImg
          src={src}
          alt={alt}
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </CategoryCardImgWrapper>
      <CategoryCardTitle>
        <CategoryCardTitleSpan>{title}</CategoryCardTitleSpan>
      </CategoryCardTitle>
      <CategoryCardOverlay className="CategoryCardOverlay" />
    </TopCategoriesCard>
  );
};

const TopCategories = () => {
  return (
    <TopCategoriesContainer>
      <TopCategoriesSection>
        <TopCategoriesSectionTitle>
          Choose from a variety of categories
        </TopCategoriesSectionTitle>
        <TopCategoriesContain>
          <TopCategoriesCardWithHover
            to="/category/Design & Arts/page/1"
            src="/images/top-categories/Design & Arts.png"
            alt="Design"
            title="Design & Arts"
          />
          <TopCategoriesCardWithHover
            to="/category/Programming & Technology/page/1"
            src="/images/top-categories/Programming & Technology.png"
            alt="Development"
            title="Programming & Technology"
          />
          <TopCategoriesCardWithHover
            to="/category/Business & Management/page/1"
            src="/images/top-categories/Business & Management.png"
            alt="Marketing"
            title="Business & Management"
          />
          <TopCategoriesCardWithHover
            to="/category/Health & Wellness/page/1"
            src="/images/top-categories/Health & Wellness.png"
            alt="IT and Software"
            title="Health & Wellness"
          />
          <TopCategoriesCardWithHover
            to="/category/Education & Learning/page/1"
            src="/images/top-categories/Education & Learning.png"
            alt="Personal Development"
            title="Education & Learning"
          />
          <TopCategoriesCardWithHover
            to="/category/Science & Engineering/page/1"
            src="/images/top-categories/Science & Enginerring.png"
            alt="Business"
            title="Science & Engineering"
          />
          <TopCategoriesCardWithHover
            to="/category/Humanities & Social Sciences/page/1"
            src="/images/top-categories/Humanities & Social Sciences.png"
            alt="Photography"
            title="Humanities & Social Sciences"
          />
          <TopCategoriesCardWithHover
            to="/category/Mindfulness & Spirituality/page/1"
            src="/images/top-categories/Mindfulness & Spirituality.png"
            alt="Music"
            title="Mindfulness & Spirituality"
          />
          <TopCategoriesCardWithHover
            to="/category/Language & Communication/page/1"
            src="/images/top-categories/Language & Communication.png"
            alt="Music"
            title="Language & Communication"
          />
          <TopCategoriesCardWithHover
            to="/category/Miscellaneous & Other/page/1"
            src="/images/top-categories/Miscallenous&Other.png"
            alt="Music"
            title="Miscellaneous & Other"
          />
        </TopCategoriesContain>
      </TopCategoriesSection>
    </TopCategoriesContainer>
  );
};

export default TopCategories;
