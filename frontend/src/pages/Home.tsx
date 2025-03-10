import PopularActors from "../component/actors/PopularActors"
import Banner from "../component/banner/Banner"
import Footer from "../component/footer/Footer"
import Header from "../component/header/Header"
import Navbar from "../component/header/Navbar"
import Slider from "../component/slider/Slider"
import TrendingMovies from "../component/trending/TrendingMovies"
/**
 * Home Component
 * 
 * The Home component serves as the landing page for the application. It renders various sections 
 * including the header, navbar, slider, trending movies, banner, popular actors, and footer. 
 * Each of these sections is encapsulated in their respective components and displayed in sequence.
 * 
 * @returns {JSX.Element} The Home component that serves as the main entry point of the app's homepage.
 */
const Home = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Slider />
      <TrendingMovies />
      <Banner />
      <PopularActors />
      <Footer />
    </>
  )
}

export default Home;