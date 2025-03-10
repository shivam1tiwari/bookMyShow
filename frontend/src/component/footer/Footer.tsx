import { Box, Container, Grid2, Typography, IconButton, Divider, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, LinkedIn, Pinterest, SupportAgent, ConfirmationNumber, Email, Home } from '@mui/icons-material';
import Logo from '../../assets/logowhite.svg';
import './Footer.css';
/**
 * Footer component displays the footer section of the website, including social media links,
 * customer service options, contact details, and copyright information.
 * 
 * @returns {JSX.Element} The rendered footer component.
 */

const Footer = () => {
  return (
    <>
      <Box className="footer-service-container">
        <Box className="footer-service-content">
          <IconButton className="footer-hut-icon">
            <Home sx={{ color: '#fff', fontSize: 40 }} />
          </IconButton>
          <Box className="footer-list-show">
            <Typography className="footer-list-show-text">List your Show</Typography>
            <Typography className="footer-list-show-text">
              Got a show, event, activity or a great experience? Partner with us & get listed on BookMyShow
            </Typography>
          </Box>
          <Button className="footer-contact-button">
            Contact Today!
          </Button>
        </Box>
      </Box>

      <Box className="footer-info">
        <Box className="footer-info-item">
          <SupportAgent className="footer-info-icon" />
          <Typography className="footer-info-text">24/7 Customer Care</Typography>
        </Box>
        <Box className="footer-info-item">
          <ConfirmationNumber className="footer-info-icon" />
          <Typography className="footer-info-text">Resend Booking Confirmation</Typography>
        </Box>
        <Box className="footer-info-item">
          <Email className="footer-info-icon" />
          <Typography className="footer-info-text">Subscribe to the Newsletter</Typography>
        </Box>
      </Box>

      <Box className="footer-container">
        <Box className="footer-flex-container">
          <Box className="footer-divider-left">
            <Divider orientation="horizontal" className="footer-divider" />
          </Box>
          <Box display="flex" alignItems="center" sx={{ marginX: 2 }}>
            <Logo style={{ marginRight: "14px" }} />
          </Box>
          <Box className="footer-divider-right">
            <Divider orientation="horizontal" className="footer-divider" />
          </Box>
        </Box>

        <Container maxWidth="lg" className='footer-icon-container'>
          <Grid2 container spacing={4}>
            <Box className="footer-icon-wrapper">
              <IconButton className="footer-icon-button">
                <Facebook sx={{ color: "#1d1717" }} />
              </IconButton>

              <IconButton className="footer-icon-button">
                <Twitter sx={{ color: "#1d1717" }} />
              </IconButton>

              <IconButton className="footer-icon-button">
                <Instagram sx={{ color: "#1d1717" }} />
              </IconButton>

              <IconButton className="footer-icon-button">
                <YouTube sx={{ color: "#1d1717" }} />
              </IconButton>

              <IconButton className="footer-icon-button">
                <Pinterest sx={{ color: "#1d1717" }} />
              </IconButton>

              <IconButton className="footer-icon-button">
                <LinkedIn sx={{ color: "#1d1717" }} />
              </IconButton>
            </Box>

            <Box className="footer-copyright">
              <Typography className="footer-text">
                Copyright &copy; {new Date().getFullYear()} © Bigtree Entertainment Pvt. Ltd. All Rights Reserved.<br />
                The content and images used on this site are copyright protected and copyrights vest with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.
              </Typography>
            </Box>
          </Grid2>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
