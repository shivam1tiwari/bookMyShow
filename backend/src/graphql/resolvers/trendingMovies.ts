import { getTrendingMovie } from "../../utils/allApi";

export const trendingMovieResolvers = {
  Query: {
    getTrendingMovie: getTrendingMovie
  }
}