import { Box } from "@mui/material";
import AlMovies from "../component/allMoviesData/AllMovies";
import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import Navbar from "../component/header/Navbar";
import Slider from "../component/slider/Slider";
/**
 * SeeAllPage Component
 * 
 * This component serves as the page layout for displaying all movies, which includes the header, navbar, 
 * slider (for featured content), a list of all movies, and footer. It's designed to give users a full-page 
 * 
 * @component
 * @returns {JSX.Element} The SeeAllPage component, displaying all movies along with navigation and other sections.
 */
const SeeAllPage = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F5F5" }}>
     <Header/>
      <Navbar/>
      <Slider/>
      <AlMovies />
      <Footer />
    </Box>
  )
}

export default SeeAllPage;