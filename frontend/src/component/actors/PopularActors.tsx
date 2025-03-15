import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useQuery } from "@apollo/client";
import { GET_ACTORS } from '../../queries/queries';
import FetchError from '../error/FetchError';
import { Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { IActor } from '../../type';
import './PopularActors.css';
/**
 * PopularActors component displays a carousel of popular actors fetched from an API.
 * The actors' details include their names, known department, popularity, and profile image.
 * It uses the react-responsive-carousel for the carousel display and Apollo Client for data fetching.
 * 
 * @returns {JSX.Element} The rendered component displaying a list of popular actors in a carousel format.
 */
const PopularActors: React.FC = () => {
  // getting all the data of Actors with of page 1
  const { loading, error, data } = useQuery(GET_ACTORS, { variables: { page: 1 } });

  const handleRefresh = () => {
    window.location.reload()
  }

  // Loader
  if (loading) return 
  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
    <CircularProgress />
  </Box>;

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
    </Box>
  </p>;
    
  return (
    <Box className="trending-movies-wrapper" sx={{ width: '100%', padding: 3 }}>
      <Box className="trending-movies-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
          Popular Actors
        </Typography>
        <Link to={`/allActors`} data-discover="true">
          <Button data-label = "see-all-button" sx={{ textTransform: 'none', color: '#e91e63', fontWeight: 'bold' }}>
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
            {data?.getAllActor?.results?.map((actor: IActor) => (
              <>
                <Box className="carousel-item" key={actor?.id} sx={{ position: 'relative', display: 'inline-block', width: "90%" }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
                    alt={actor?.original_name}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                  <Box className="carousel-overlay">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star sx={{ marginRight: 1, fill: "green", width: '0.8em' }} />
                      <Typography variant="body2" sx={{ color: '#fff' }}>
                        {actor?.popularity} K Followers
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box className="carousel-item-text">
                  <Typography variant="h6" sx={{ color: '#000000' }}>
                    {actor?.original_name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#666666' }}>
                    {actor?.known_for_department}
                  </Typography>
                </Box>
              </>
            ))}
          </Carousel>
        </Box>
      )}
    </Box>
  );
};

export default PopularActors;
