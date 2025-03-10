import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import Navbar from "../component/header/Navbar";
import MovieDetail from "../component/movieDetail/MovieDetail";
/**
 * MoviesDetailsPage Component
 * 
 * This component renders the full movie details page, which includes the header, navbar, movie details, and footer.
 * It serves as a container for the movie detail section and the general page layout.
 * 
 * @component
 * @returns {JSX.Element} The MoviesDetailsPage component, which displays the movie detail information along with navigation elements.
 */
const MoviesDetailsPage = () => {
  return (
    <>
     <Header/>
      <Navbar/>
      <MovieDetail />
      <Footer />
    </>
  )
}

export default MoviesDetailsPage;