import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Container,
    Box,
    Grow,
    Slide
} from '@mui/material';
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { People, RateReview, School } from '@mui/icons-material';

const AdminDashboard = () => {
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [highestRatedCourses, setHighestRatedCourses] = useState([]);
    const [topAccessFeatures, setTopAccessFeatures] = useState([]);
    const [highestRatedProviders, setHighestRatedProviders] = useState([]);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Fetch total reviews
        axios.get('http://localhost:5000/api/reviewscount')
            .then(response => setTotalReviews(response.data.totalReviews))
            .catch(error => console.error('Error fetching total reviews:', error));

        // Fetch total users
        axios.get('http://localhost:5000/api/userscount')
            .then(response => setTotalUsers(response.data.totalUsers))
            .catch(error => console.error('Error fetching total users:', error));

        // Fetch total courses
        axios.get('http://localhost:5000/api/coursescount')
            .then(response => setTotalCourses(response.data.totalCourses))
            .catch(error => console.error('Error fetching total courses:', error));

        // Fetch highest rated courses
        axios.get('http://localhost:5000/api/highestRatedCourses')
            .then(response => setHighestRatedCourses(response.data.data))
            .catch(error => console.error('Error fetching highest rated courses:', error));

        // Fetch top accessibility features
        axios.get('http://localhost:5000/api/topAccessFeatures')
            .then(response => setTopAccessFeatures(response.data.data))
            .catch(error => console.error('Error fetching top accessibility features:', error));

        // Fetch highest rated providers
        axios.get('http://localhost:5000/api/highestRatedProviders')
            .then(response => setHighestRatedProviders(response.data.data))
            .catch(error => console.error('Error fetching highest rated providers:', error));

        // Simulate loading delay
        setTimeout(() => {
            setLoaded(true);
        }, 500);
    }, []);

    // Calculate colors for Pie chart segments
    const pieColors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658', '#f0c3b0'];

    return (
        <Container sx={{ mt: 4 }}>
            <Slide direction="down" in={loaded} mountOnEnter unmountOnExit>
                <Typography variant="h4" component="h1" gutterBottom>
                    Admin Dashboard
                </Typography>
            </Slide>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Grow in={loaded} style={{ transformOrigin: '0 0 0' }} {...(loaded ? { timeout: 1000 } : {})}>
                        <Box
                            sx={{
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <Card sx={{ backgroundColor: '#f44336', color: '#fff' }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <RateReview fontSize="large" />
                                        <Box ml={2}>
                                            <Typography variant="h5" component="h2" sx={{ color: '#ffcdd2', fontWeight: 'bold' }}>
                                                Total Reviews
                                            </Typography>
                                            <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: 'white' }}>
                                                {totalReviews}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grow>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grow in={loaded} style={{ transformOrigin: '0 0 0' }} {...(loaded ? { timeout: 2000 } : {})}>
                        <Box
                            sx={{
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <Card sx={{ backgroundColor: '#3f51b5', color: '#fff' }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <People fontSize="large" />
                                        <Box ml={2}>
                                            <Typography variant="h5" component="h2" sx={{ color: '#c5cae9', fontWeight: 'bold' }}>
                                                Total Users
                                            </Typography>
                                            <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: 'white' }}>
                                                {totalUsers}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grow>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grow in={loaded} style={{ transformOrigin: '0 0 0' }} {...(loaded ? { timeout: 3000 } : {})}>
                        <Box
                            sx={{
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <Card sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center">
                                        <School fontSize="large" />
                                        <Box ml={2}>
                                            <Typography variant="h5" component="h2" sx={{ color: '#c8e6c9', fontWeight: 'bold' }}>
                                                Total Courses
                                            </Typography>
                                            <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: 'white' }}>
                                                {totalCourses}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grow>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grow in={loaded} style={{ transformOrigin: '0 0 0' }} {...(loaded ? { timeout: 5000 } : {})}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Highest Rated Courses by Category
                                </Typography>
                                <ResponsiveContainer width="100%" height={500}>
                                    <BarChart data={highestRatedCourses} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="category" angle={-30} interval={0} textAnchor="end" height={60} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend verticalAlign="top" height={36} />
                                        <Bar dataKey="averageRating" fill="#305CDE" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grow>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Grow in={loaded}>
                                <Card sx={{ boxShadow: 3 }}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" gutterBottom>
                                            Highest Rated Providers
                                        </Typography>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={highestRatedProviders}
                                                    dataKey="averageRating"
                                                    nameKey="provider"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    label
                                                >
                                                    {
                                                        highestRatedProviders.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                                        ))
                                                    }
                                                </Pie>
                                                <Tooltip />
                                                <Legend verticalAlign="top" height={36} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Grid>
                        <Grid item>
                            <Grow in={loaded} style={{ transformOrigin: '0 0 0' }} {...(loaded ? { timeout: 4000 } : {})}>
                                <Card sx={{ boxShadow: 3 }}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" gutterBottom>
                                            Top Accessibility Features
                                        </Typography>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={topAccessFeatures}
                                                    dataKey="count"
                                                    nameKey="feature"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    label
                                                >
                                                    {
                                                        topAccessFeatures.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                                        ))
                                                    }
                                                </Pie>
                                                <Tooltip />
                                                <Legend verticalAlign="top" height={36} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminDashboard;
