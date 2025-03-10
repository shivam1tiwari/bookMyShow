import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid2, Avatar, IconButton, Divider, CircularProgress } from '@mui/material';
import { Star, Share, ChevronRight, PlayArrow, ThumbUp, ThumbDown } from '@mui/icons-material';
import './MovieDetail.css';
import { useQuery } from '@apollo/client';
import { GET_MOVIES_BY_ID } from '../../queries/queries';
import SharePopup from '../sharePopup/SharePopup';
import BookTicketPopup from '../bookTicketPopup/BookTicketPopup';
import { IMovieData } from '../../type';

const languageMapping: { [key: string]: string } = {
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
};

// Dummy API data only to show UI
const dummyMovieData: { [key: string]: IMovieData } = {
  '1': {
    title: 'Chhaava',
    poster: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/chhaava-et00408691-1737623374.jpg',
    backgroundImage: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/chhaava-et00408691-1737623374.jpg',
    rating: 9.3,
    votes: '256.7K',
    formats: ['2D', 'ICE', '4DX', 'IMAX 2D'],
    language: 'Hindi',
    duration: '2h 41m',
    genres: ['Action', 'Drama', 'Historical'],
    certification: 'UA16+',
    releaseDate: '14 Feb, 2025',
    trailers: 3,
    about: 'After Chhatrapati Shivaji Maharaj`s death, the Mughals aim to expand into the Deccan, only to face his fearless son, Chhatrapati Sambhaji Maharaj. Chhaava, inspired by Shivaji Sawant`s novel, chronicles Chhatrapati Sambhaji Maharaj`s unwavering resistance against Aurangzeb, marked by courage, strategy, and betrayal.',
    cast: [
      { name: 'Vicky Kaushal', role: 'Chhatrapati Sambhaji Maharaj', img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/vicky-kaushal-32264-1685966478.jpg' },
      { name: 'Rashmika Mandanna', role: 'Yesubai Bhonsale', img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/rashmika-mandanna-1076783-28-12-2016-12-20-39.jpg' },
      { name: 'Akshaye Khanna', role: 'Aurangzeb', img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/akshaye-khanna-95-24-03-2017-14-07-23.jpg' },
    ],
    crew: [
      { name: 'Laxman Utekar', role: 'Director', img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/laxman-utekar-1044555-24-03-2017-17-38-52.jpg' },
      { name: 'Dinesh Vijan', role: 'Producer', img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/dinesh-vijan-1070169-02-05-2017-10-33-25.jpg' },
      { name: 'A. R. Rahman', role: 'Musician', img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/a_r_rahman_38.jpg' },
    ],
    reviews: {
      total: '149.2K',
      tags: ['#GreatActing', '#Inspiring', '#SuperDirection', '#Blockbuster', '#AwesomeStory'],
      userReviews: [
        { user: 'Prudhvi Bachineni', rating: 10, tags: '#SuperDirection #GreatActing #Wellmade #Inspiring', review: 'Goosebumps guaranteed...', likes: '5.2K', timeAgo: '20 Days ago' },
        { user: 'User', rating: 10, tags: '#SuperDirection #GreatActing #Blockbuster #Rocking #Inspiring #Wellmade', review: 'धर्मरक्षक महावीर...', likes: '3.8K', timeAgo: '20 Days ago' },
      ],
    },
  },
};

/**
 * MovieDetail component is responsible for rendering the movie details page.
 * It fetches movie data based on the movie ID, handles loading and error states,
 * and displays various movie-related information .
 * 
 * @component
 * @returns {JSX.Element} The JSX markup for the movie details page.
 */
const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovieData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [openBookTicketPopup, setOpenBookTicketPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const movieData = dummyMovieData[id || '1'] || dummyMovieData['1'];
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);
  const { error, data } = useQuery(GET_MOVIES_BY_ID, {
    variables: {
      "getMovieByIdId": `${id}`
    },
  });

  const mov = data?.getMovieById;

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.movie-header');
      if (header) {
        const headerElement = header as HTMLElement;
        const headerBottom = headerElement.offsetTop + headerElement.offsetHeight;
        setIsSticky(window.scrollY > headerBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <Box sx={{ margin: 'auto', textAlign: 'center' }}><CircularProgress /></Box>
    );
  }

  if (!movie) {
    return <Typography>Movie not found</Typography>;
  }

  // Formating Date
  const date = new Date(mov?.release_date);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;

  return (
    <Box className="movie-details-container">
      <SharePopup
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        movieTitle={movie?.title} />
      <BookTicketPopup open={openBookTicketPopup} onClose={() => setOpenBookTicketPopup(false)} />
      <Box className={`sticky-navbar ${isSticky ? 'visible' : ''}`}>
        <Typography variant="h6">{mov?.title}</Typography>
        <Button
          variant="contained"
          className="book-tickets-btn"
          onClick={() => setOpenBookTicketPopup(true)}
        >
          Book tickets
        </Button>
      </Box>
      <Box
        className="movie-header"
        sx={{
          backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${`https://image.tmdb.org/t/p/w500${mov?.backdrop_path}`})`,
        }}
      >
        <Grid2 container spacing={0} className="movie-header-container">
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Box className="movie-poster">
              <img src={`https://image.tmdb.org/t/p/w500${mov?.poster_path}`} alt={mov?.title} className="poster-img" />
              <Button className="trailers">
                <PlayArrow sx={{ mr: 1 }} />
                <Typography variant="body2">Trailers ({movie?.trailers})</Typography>
              </Button>
              <Box className="cinemas">
                <Typography variant="body2" color="white">In Cinemas</Typography>
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 8 }}>
            <Box className="movie-info">
              <Box className="share-button-container">
                <Button
                  className="share-button"
                  sx={{ alignSelf: 'flex-end' }}
                  onClick={() => setShareOpen(true)}
                >
                  <Share sx={{ mr: 1 }} />
                  <Typography variant="body2">Share</Typography>
                </Button>
              </Box>

              <Typography variant="h4" className="movie-title">{mov?.title}</Typography>

              <Box className="rating-section">
                <Box display="flex" alignItems="center">
                  <Star sx={{ color: '#F07584', mr: 1 }} />
                  <Typography variant="h6">{movie.rating}/10</Typography>
                  <Typography variant="body2" sx={{ ml: 1 }}>({mov?.vote_count} Votes)</Typography>
                  <ChevronRight sx={{ ml: 1 }} />
                </Box>
                <Button variant="contained" className="rate-button">Rate now</Button>
              </Box>

              <Box className="format-lang">
                <Typography variant="body1" className="format-lang-content">{movie?.formats.join(', ')}</Typography>
                <Typography variant="body1" className="format-lang-content">
                  {mov.original_language ? languageMapping[mov.original_language] || mov.original_language : movie.language}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                {movie.duration} • {movie.genres.join(', ')} • {movie.certification} • {formattedDate}
              </Typography>
              <Button
                variant="contained"
                className="book-tickets-btn"
                onClick={() => setOpenBookTicketPopup(true)}
              >
                Book tickets
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      {/* About the Movie */}
      <Box className="section">
        <Typography variant="h4">About the movie</Typography>
        <Typography variant="body1">{mov?.overview}</Typography>
      </Box>
      <Divider className="divider" />

      {/* Cast */}
      <Box className="section">
        <Typography variant="h4">Cast</Typography>
        <Grid2 container spacing={1}>
          {movie.cast.map((actor) => (
            <Grid2 size={{ xs: 1.5 }} key={actor.name}>
              <Box className="cast-item">
                <Avatar src={actor.img} sx={{ width: 120, height: 120 }} />
                <Typography variant="h6">{actor?.name}</Typography>
                <Typography variant="body2">{actor?.role}</Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Divider className="divider" />

      {/* Crew */}
      <Box className="section">
        <Typography variant="h4">Crew</Typography>
        <Grid2 container spacing={1}>
          {movie.crew.map((crew) => (
            <Grid2 size={{ xs: 1.5 }} key={crew.name}>
              <Box className="crew-item">
                <Avatar src={crew.img} sx={{ width: 120, height: 120 }} />
                <Typography variant="h6">{crew.name}</Typography>
                <Typography variant="body2">{crew.role}</Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Divider className="divider" />

      {/* Top Reviews */}
      <Box className="section">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4">Top reviews</Typography>
          <Button className="review-btn" endIcon={<ChevronRight />}>{movie.reviews.total} reviews</Button>
        </Box>
        <Typography variant="body1">Summary of {movie.reviews.total} reviews.</Typography>
        <Box className="tags">
          {movie.reviews.tags.map((tag) => (
            <Button key={tag} variant="outlined" className="tag-btn">{tag}</Button>
          ))}
        </Box>
        <Grid2 container spacing={2}>
          {movie.reviews.userReviews.map((review) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={review.user}>
              <Box className="review-item">
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <Avatar />
                    <Box ml={2}>
                      <Typography variant="h6">{review.user}</Typography>
                      <Typography variant="body2">Booked on BookMyShow</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Star sx={{ color: '#f5c518' }} />
                    <Typography>{review.rating}/10</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" className="review-tags">{review.tags}</Typography>
                <Typography variant="body2">{review.review}</Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Box>
                    <IconButton><ThumbUp /></IconButton> {review.likes}
                    <IconButton><ThumbDown /></IconButton>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2">{review.timeAgo}</Typography>
                    <IconButton><Share /></IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default MovieDetail;