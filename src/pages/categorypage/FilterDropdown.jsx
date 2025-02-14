// FilterDropdown.js
import React from "react";
import { Typography, MenuItem, Select } from "@mui/material";

const FilterDropdown = ({ label, options, onChange }) => {
  return (
    <div>
      <Typography variant="subtitle1" color="primary" gutterBottom>
        {label}
      </Typography>
      <Select onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default FilterDropdown;
