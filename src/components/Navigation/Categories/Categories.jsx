import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuContainer, MenuCard, SubTitleContext } from "./Categories.styles";
import TooltipCard from "../TooltipCard/TooltipCard";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Categories = ({ selectedCategory }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.100.35/api/categories');
        setCategoriesData(response.data);
        console.log('Fetched categories:', response.data); // Log the fetched categories
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <TooltipCard withoutPadding={true}>
      <MenuContainer>
        <MenuCard style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '1.2em' }}>Loading...</div>
          ) : (
            categoriesData.map((category, index) => (
              <Link
                key={index}
                to={`/category/${encodeURIComponent(category)}/page/1`} // Encode category to handle special characters
                style={{
                  fontSize: '2.5em',
                  textDecoration: 'none',
                  color: 'inherit',
                  textAlign: 'left',
                  transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out',
                  cursor: 'pointer',
                  display: 'block',
                  marginBottom: '10px',
                  backgroundColor: 'transparent',
                  padding: '10px' // Add padding to increase the size of the gray background
                }}
                onMouseEnter={(e) => {
                 
                  e.target.style.backgroundColor = '#005387'; // Gray background color
                  e.target.style.color = 'white'; // Blue font color
                }}
                onMouseLeave={(e) => {
                 
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'inherit';
                }}
              >
                {category}
              </Link>
            ))
          )}
        </MenuCard>
        {/* Other category related components */}
      </MenuContainer>
    </TooltipCard>
  );
};

export default Categories;
