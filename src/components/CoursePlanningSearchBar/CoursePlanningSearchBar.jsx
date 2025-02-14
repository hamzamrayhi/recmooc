import React, { useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

const CoursePlanningSearchBar = ({ searchText, setSearchText, onSelect }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/searchbar/courses/suggestions?searchText=${encodeURIComponent(
            searchText
          )}&instructorName=${encodeURIComponent(searchText)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }
        const data = await response.json();
        if (Array.isArray(data.suggestions) && data.suggestions.length > 0) {
          setFilteredSuggestions(data.suggestions);
        } else {
          setFilteredSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (searchText) {
      fetchSuggestions();
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchText]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handleListItemClick = (suggestion) => {
    onSelect(suggestion.mooc_name);
    setSearchText(suggestion.mooc_name);
    setFilteredSuggestions([]);
  };

  const handleClear = () => {
    setSearchText('');
    setFilteredSuggestions([]);
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", backgroundColor: "#F7F9FA", border: "1px solid #1c1d1f" }}>
        <InputBase
          placeholder="Search for courses"
          onChange={handleSearchChange}
          value={searchText}
          inputProps={{ "aria-label": "search" }}
        />
       
      </div>
      {filteredSuggestions.length > 0 && (
        <ul style={{ listStyleType: "none", padding: 0, position: "absolute", top: "calc(100% + 5px)", left: 0, width: "100%", maxHeight: "200px", overflowY: "auto", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", zIndex: 10000 }}>
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} style={{ padding: "8px", backgroundColor: "white", cursor: "pointer" }} onClick={() => handleListItemClick(suggestion)}>
              <div>{suggestion.mooc_name}</div>
              <div style={{ fontSize: "14px", color: "#888" }}>University: {suggestion.university_related}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursePlanningSearchBar;
