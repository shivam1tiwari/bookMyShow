import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import './TrendingMovies.css';
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from '../../queries/queries';
import FetchError from '../error/FetchError';
import { Star, ThumbUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { IMovie } from "../../type";

/**
 * TrendingMovies component displays a carousel of trending movies
 * fetched from a GraphQL API.
 *
 * @component
 */
const TrendingMovies: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MOVIES, { variables: { page: 1 } });
  /**
   * Handle the refresh action by reloading the page.
   * @returns {void}
   */
  const handleRefresh = () => {
    window.location.reload()
  }

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
    <CircularProgress />
  </Box>;
/**
   * Renders an error message when fetching the data fails.
   * Includes a refresh button to retry the operation.
   */
  if (error) return <p className='error'><FetchError />Error: {error.message}
    <Box>
      <Button
        size="small"
        onClick={handleRefresh}
        loading={loading}
        loadingIndicator="Loading…"
        variant="outlined"
      >
        Refresh
      </Button>
    </Box></p>;

  return (
    <Box className="trending-movies-wrapper" sx={{ width: '100%', padding: 3 }}>
      <Box className="trending-movies-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
          Trending Movies
        </Typography>
        <Link id='link' to={`/allMovies`}>
          <Button sx={{ textTransform: 'none', color: '#e91e63', fontWeight: 'bold' }}>
            See All &gt;
          </Button>
        </Link>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box className="carousel-container">
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            dynamicHeight={false}
            centerMode={true}
            emulateTouch={true}
            autoPlay={false}
            interval={3000}
            transitionTime={500}
            centerSlidePercentage={20}
            showIndicators={false}
            selectedItem={1}
            useKeyboardArrows={true}
          >
            {data?.getAllMovie?.results?.map((movie: IMovie) => (
              <>
                <Link id='link' to={`/movie/${movie.id}`}>
                  <Box className="carousel-item" key={movie.id} sx={{ position: 'relative', display: 'inline-block', width: "90%" }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                    <Box className="carousel-overlay">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star sx={{ marginRight: 1, fill: "green", width: '0.8em' }} />
                        <Typography variant="body2" sx={{ color: '#fff' }}>
                          {movie.vote_average} Ratings
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThumbUp sx={{ marginRight: 1, fill: "red", width: '0.8em' }} />
                        <Typography variant="body2" sx={{ color: '#fff' }}>
                          {movie.vote_count} Votes
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="carousel-item-text">
                    <Typography variant="h6" sx={{ color: '#000000' }}>
                      {movie.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666666' }}>
                      {movie.vote_average}
                    </Typography>
                  </Box>
                </Link>
              </>
            ))}
          </Carousel>
        </Box>
      )}
    </Box>
  );
};

export default TrendingMovies;
