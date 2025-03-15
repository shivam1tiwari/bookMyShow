import "./Slider.css";
import { Carousel } from "react-responsive-carousel";
import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_BANNERS } from "../../queries/queries";
import { IBannerData } from "../../type";
/**
 * Slider component renders a carousel of images fetched from the server.
 * It uses Apollo Client's `useQuery` hook to retrieve banner data and displays it in a responsive carousel.
 * While data is loading or in case of an error, it shows appropriate loading indicators or an error message.
 *
 * @returns {JSX.Element} - Returns a carousel of banners or a loading/error state.
 * CircularProgress component.
 * @typedef {Object} IBannerData
 * @property {Array} getBanners - Array of banner data.
 * @property {string} url - The URL of the banner image.
 */
const Slider = () => {
  const { data, loading, error } = useQuery<IBannerData>(GET_BANNERS);

  const slides = data?.getBanners
  console.log(data)

  if (error) {
    return <Box sx={{textAlign:"center"}}><h1>Something went wrong.</h1></Box>
  }

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      showThumbs={true}
      dynamicHeight={false}
      centerMode={true}
      emulateTouch={true}
      autoPlay={true}
      interval={3000}
      transitionTime={500}
      centerSlidePercentage={77}
      showIndicators={false}
      selectedItem={1}
      useKeyboardArrows={true}

    >
      {slides?.map((val) => <Box sx={{ height: "33vh", width: "100%" }} ><img key={val.url} className="slide-img" src={val.url} alt={val.name}/></Box>)}
    </Carousel>
  );
};

export default Slider;
