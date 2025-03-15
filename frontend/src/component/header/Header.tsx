import { AppBar, Toolbar, Typography, Button, Box, InputBase, LinearProgress } from "@mui/material";
import { Search } from "@mui/icons-material";
import Logo from "../../assets/bookmyshowlogo.svg";
import "./Header.css";
import SignInModal from "../signInModel/SignInModel";
import { ChangeEvent, JSX, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES_BY_NAME } from "../../queries/queries";
import { Link } from "react-router-dom";
import Toaster from "../signInModel/Toaster";
import { useNavigate } from "react-router-dom";
/**
 * Header component renders the top navigation bar with functionality for searching movies, 
 * signing in, signing out, and displaying search results.
 * 
 * @component
 *
 * @returns {JSX.Element} The Header component.
 */
const Header = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  // State to manage toast visibility
  const [showToast, setShowToast] = useState(false);
  const location = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   /**
   * Handles the change in the search input and updates the search query.
   * @param {ChangeEvent<HTMLInputElement>} e - The change event triggered by the search input.
   */
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const user = sessionStorage.getItem("token");
  if (user && !isLogin) {
    setIsLogin(true);
  }

  const { data, loading, error } = useQuery(GET_MOVIES_BY_NAME, {
    variables: { movieName: query },
  });
 /**
   * Handles user logout, clears session, and redirects to the home page after a delay.
   */
  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    setIsLogin(false);
    setShowToast(true); // Show toast after logout
    setTimeout(() => {
      location('/'); // Redirect after 2 seconds
    }, 2000); 
  };

  return (
    <Box sx={{ position: "relative" }}>
      <AppBar position="static" className="header-appbar">
        <Toolbar className="header-toolbar">
          <Box className="header-left-section">
            <Logo className="header-logo" onClick={() => location('/')} />
            <Box className="header-search-bar">
              <Search className="header-search-icon" />
              <InputBase
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                className="header-input-base"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                value={query}
              />
            </Box>
          </Box>

          <Box>
            {isLogin ? (
              <Button className="header-sign-in-button" onClick={handleSignOut}>
                Logout
              </Button>
            ) : (
              <Button className="header-sign-in-button" onClick={handleOpen}>
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {query.length > 0 && (
        <Box className="search-result-dropdown">
          {loading && (
            <Box sx={{ padding: "1rem" }}>
              <LinearProgress />
            </Box>
          )}

          {error && (
            <Typography sx={{ p: 2, color: "red" }}>
              Error: {error.message}
            </Typography>
          )}

          {data && data.searchMovieByName && (
            <Box>
              {data?.searchMovieByName.length === 0 ? (
                <Typography sx={{ p: 2 }}>No results found</Typography>
              ) : (
                data?.searchMovieByName?.results?.map((movie: any) => (
                  <Link id="link" to={`/movie/${movie.id}`} className="search-result-link" key={movie.id}>
                    <Box
                      sx={{
                        p: 2,
                        borderBottom: "1px solid #eee",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                        cursor: "pointer",
                      }}
                    >
                      <Typography variant="body1">{movie?.title}</Typography>
                    </Box>
                  </Link>
                ))
              )}
            </Box>
          )}
        </Box>
      )}

      {!isLogin && <SignInModal open={open} onClose={handleClose} />}

      {/* Conditionally render Toaster on logout */}
      {showToast && (
        <Toaster message={"Logout Successful"} color={"error"} />
      )}
    </Box>
  );
};

export default Header;
