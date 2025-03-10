import { AppBar, Box, Button, Toolbar } from '@mui/material';
import './Header.css';
/**
 * Navbar component renders a top navigation bar with buttons for various sections like Movies, Stream, Events, etc.
 * It consists of two sections: a left section with menu buttons and a right section with additional options.
 * @component
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, height: "50px" }}>
      <AppBar position="static" className="navbar-appbar">
        <Toolbar className="navbar-toolbar">
        
          <Box className="navbar-left-section">
            <Box className="navbar-menu-buttons">
              <Button className="navbar-menu-button">Movies</Button>
              <Button className="navbar-menu-button">Stream</Button>
              <Button className="navbar-menu-button">Events</Button>
              <Button className="navbar-menu-button">Plays</Button>
              <Button className="navbar-menu-button">Sports</Button>
              <Button className="navbar-menu-button">Activities</Button>
            </Box>
          </Box>

          <Box className="navbar-right-section">
            <Button className="navbar-right-button">ListYourShow</Button>
            <Button className="navbar-right-button">Corporate</Button>
            <Button className="navbar-right-button">Offers</Button>
            <Button className="navbar-right-button">Gift Cards</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
