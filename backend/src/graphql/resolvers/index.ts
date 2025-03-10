import { actorResolvers } from './actors';
import { bannerResolvers } from './adminBannerReslovers';
import { authResolvers } from './auth';
import { googleAuthResolvers } from './googleAuth';
import { movieResolvers } from './movie';
import { trendingMovieResolvers } from './trendingMovies';

export const resolvers = [authResolvers, movieResolvers, actorResolvers, trendingMovieResolvers, bannerResolvers, googleAuthResolvers];