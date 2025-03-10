import Grid from '@mui/material/Grid2';
import './Banner.css';

const Banner = () => {
  return (
    <Grid
      className="banner"
      size={8}
    >
      <img
        src="https://assets-in.bmscdn.com/discovery-catalog/collections/stream-leadin-web-collection-202210241242.png"
        alt="Banner"
      />
    </Grid>
  );
};

export default Banner;
