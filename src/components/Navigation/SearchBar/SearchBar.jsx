import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

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
        console.log("Received data:", data);

        if (Array.isArray(data.suggestions) && data.suggestions.length > 0) {
          setFilteredSuggestions(data.suggestions);
        } else {
          console.error("Invalid suggestions data:", data);
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
    console.log("Clicked on suggestion:", suggestion);
    console.log("Suggestion name:", suggestion.name);
    console.log("Suggestion mooc_link:", suggestion.mooc_link);
    console.log("Provider:", suggestion.university_related);

    // Navigate to the course details page using the suggestion ID or mooc_link
    navigate(`/coursedetails/${suggestion.id}`); // Assuming suggestion has an ID property
  };

  return (
    <div style={{ display: "flex", position: "relative", borderRadius: 50, backgroundColor: "#F7F9FA", border: "1px solid #1c1d1f", width: "100%", maxWidth: "1200px", height: "40px", color: "#8A8B8D" }}>
      <div style={{ padding: "0px 10px", display: "flex", alignItems: "center" }}>
        <SearchIcon sx={{ fontSize: 24 }} />
      </div>
      <InputBase
        placeholder="Search for courses"
        onChange={handleSearchChange}
        value={searchText}
        inputProps={{ "aria-label": "search" }}
        style={{ flex: 1, color: "#000", fontSize: "18px", "& .MuiInputBase-input": { padding: "10px", fontSize: "18px" } }}
      />
      {filteredSuggestions.length > 0 && (
        <ul style={{ listStyleType: "none", padding: 0, position: "absolute", top: "calc(100% + 5px)", left: 0, width: "100%", maxHeight: "200px", overflowY: "auto", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", zIndex: 999 }}>
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} style={{ fontSize: "16px", padding: "8px", backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}>
              <div style={{ cursor: "pointer" }} onClick={() => handleListItemClick(suggestion)}>
                <div>{suggestion.mooc_name}</div>
                <div style={{ fontSize: "14px", color: "#888" }}>University: {suggestion.university_related}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
