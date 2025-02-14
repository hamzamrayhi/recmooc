// PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../config/Auth'
const PublicRoute = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/userindex" /> : element;
};

export default PublicRoute;
