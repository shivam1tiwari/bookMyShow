import { Box } from "@mui/material";
import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import Navbar from "../component/header/Navbar";
import Slider from "../component/slider/Slider";
import AllActors from "../component/allActorsData/AllActors";
/**
 * SeeAllActors component renders the page displaying a list of all actors.
 * It includes the header, navbar, slider, the list of actors, and the footer.
 * 
 * @returns {JSX.Element} The rendered component
 */
const SeeAllActors = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F5F5" }}>
     <Header/>
      <Navbar/>
      <Slider/>
      <AllActors />
      <Footer />
    </Box>
  )
}

export default SeeAllActors;