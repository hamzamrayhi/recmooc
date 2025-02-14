import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#005387', color: '#fff', pt: 3, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              RecMooc4All
            </Typography>
            <Link href="/" color="inherit" underline="hover" sx={{ fontSize: '1.2rem' }}>Home</Link><br />
            <Link href="/about" color="inherit" underline="hover" sx={{ fontSize: '1.2rem' }}>About</Link><br />
            <Link href="/contactus" color="inherit" underline="hover" sx={{ fontSize: '1.2rem' }}>Contact Us</Link><br />
            <Link href="/category/Programming%20%26%20Technology/page/1" color="inherit" underline="hover" sx={{ fontSize: '1.2rem' }}>Category</Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              User
            </Typography>
            <Link href="/login" color="inherit" underline="hover" sx={{ fontSize: '1.2rem' }}>Login</Link><br />
            <Link href="/register" color="inherit" underline="hover" sx={{ fontSize: '1.2rem' }}>Register</Link>
          </Grid>
        </Grid>
        <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" color="inherit">
            &copy; 2024 RecMooc4All, Inc.
          </Typography>
          <Box>
            <IconButton href="https://www.facebook.com" color="inherit">
              Our Facebook page <FacebookIcon />
            </IconButton>
            <IconButton href="https://www.instagram.com" color="inherit">
             Our Instagram page <InstagramIcon />
            </IconButton>
            <IconButton href="https://www.twitter.com" color="inherit">
              Our Twitter page <TwitterIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;