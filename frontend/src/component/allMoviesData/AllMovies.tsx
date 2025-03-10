import React from 'react';
import { Typography, Container, Box, Chip, Grid2, CircularProgress } from '@mui/material';
import { Star, ThumbUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './AllMoviesStyle.css';
import { IMovie } from "../../type";
import { GET_MOVIES } from '../../queries/queries';
import { useQuery } from '@apollo/client';
import FetchError from '../error/FetchError';
/**
 * AllMovies component fetches and displays a list of movies in a grid format.
 * It shows movie posters, ratings, vote counts, and allows.
 * It handles loading and error states, and links to detailed pages for each movie.
 * 
 * @returns {JSX.Element} The rendered component displaying a list of movies.
 */
const AllMovies: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MOVIES, { variables: { page: 1 } });

  //displaying cards for all movies
  const renderMovieCards = () => (
    <Grid2 container spacing={2}>
      {data?.getAllMovie?.results?.map((movie: IMovie) => (
        <Grid2 key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
            <Box className="movie-item" sx={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />

              <Box className="movie-overlay">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Star sx={{ marginRight: 1, fill: 'green', width: '0.8em' }} />
                  <Typography variant="body2" sx={{ color: '#fff' }}>
                    {movie.vote_average.toFixed(1)} Rating
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ThumbUp sx={{ marginRight: 1, fill: 'red', width: '0.8em' }} />
                  <Typography variant="body2" sx={{ color: '#fff' }}>
                    {movie.vote_count} Votes
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box className="movie-item-text">
              <Typography variant="h6" sx={{ color: '#000000' }}>
                {movie.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                English
              </Typography>
            </Box>
          </Link>
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
          Movies in Delhi
        </Typography>
      </Box>

      <Box className="language-filters" mb={4}>
        {['Hindi', 'English', 'Tamil', 'Marathi', 'Gujarati', 'Telugu', 'Bengali', 'Malayalam', 'Spanish'].map((lang) => (
          <Chip
            key={lang}
            label={lang}
            clickable
            className="language-chip"
            variant="outlined"
          />
        ))}
      </Box>

      <Box className="movies-section">
        {renderMovieCards()}
      </Box>
    </Container>
  );
};

export default AllMovies;