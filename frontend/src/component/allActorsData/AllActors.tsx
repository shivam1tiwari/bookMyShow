import React from 'react';
import { Typography, Container, Box, Grid2, CircularProgress } from '@mui/material';
import { Star } from '@mui/icons-material';
import './AllActors.css';
import { IActor } from "../../type";
import { GET_ACTORS } from '../../queries/queries';
import { useQuery } from '@apollo/client';
import FetchError from '../error/FetchError';
/**
 * AllActors component displays a grid of all actors fetched from an API.
 * The actors' details include their names, known department, popularity, and profile image.
 * It handles loading and error states, and renders a list of actors in a responsive grid layout.
 * 
 * @returns {JSX.Element} The rendered component displaying a grid of actors.
 */
const AllActors: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ACTORS, { variables: { page: 1 } });

  // rendering Cards for displaying movies
  const renderMovieCards = () => (
    <Grid2 container spacing={2}>
       {data?.getAllActor?.results?.map((actor: IActor) => (
        <Grid2 key={actor?.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Box className="movie-item" sx={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
              />
              <Box className="movie-overlay">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Star sx={{ marginRight: 1, fill: 'green', width: '0.8em' }} />
                  <Typography variant="body2" sx={{ color: '#fff' }}>
                    {actor?.popularity} K Followers
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="movie-item-text">
              <Typography variant="h6" sx={{ color: '#000000' }}>
                {actor?.original_name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {actor?.known_for_department}
              </Typography>
            </Box>
        </Grid2>
      ))}
    </Grid2>
  );

  // loader
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <FetchError />;
  }

  return (
    <Container maxWidth="xl" className="movies-container">
      <Box className="movies-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1" className="page-title">
          Actors
        </Typography>
      </Box>

      <Box className="movies-section">
        {renderMovieCards()}
      </Box>
    </Container>
  );
};

export default AllActors;