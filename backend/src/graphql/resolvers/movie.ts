import { getAllMovie, getMovieById, searchMovieByName } from "../../utils/allApi";

export const movieResolvers = {
  Query: {
    getAllMovie: getAllMovie,
    getMovieById: getMovieById,
    searchMovieByName: searchMovieByName
  }
}