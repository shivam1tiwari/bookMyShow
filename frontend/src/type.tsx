// Type: For al movie details
export type IMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// Type: For All Actors
export interface IActor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for: KnownFor[];
}

export interface KnownFor {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IBookTicketPopupProps {
  open: boolean;
  onClose: () => void;
}

export interface ICastMember {
  name: string;
  role: string;
  img: string;
}

export interface ICrewMember {
  name: string;
  role: string;
  img: string;
}

export interface IUserReview {
  user: string;
  rating: number;
  tags: string;
  review: string;
  likes: string;
  timeAgo: string;
}

export interface IReviews {
  total: string;
  tags: string[];
  userReviews: IUserReview[];
}

export interface IMovieData {
  title: string;
  poster: string;
  backgroundImage: string;
  rating: number;
  votes: string;
  formats: string[];
  language: string;
  duration: string;
  genres: string[];
  certification: string;
  releaseDate: string;
  trailers: number;
  about: string;
  cast: ICastMember[];
  crew: ICrewMember[];
  reviews: IReviews;
}

export interface ISharePopupProps {
  open: boolean;
  onClose: () => void;
  movieTitle: string;
}

export interface ISignInModalProps {
  open: boolean;
  onClose: () => void;
}

export interface IErrorResponse {
  message: string;
  code: number;
}

export interface IToasterProps {
  message: string;
  color: 'success' | 'error' 
}

export interface IBanner {
  id: string
  name: string
  url: string
  uploadDate: string
}

export interface IBannerData {
  getBanners: [IBanner]
}

export interface IUploadBannerData {
  uploadBanner: IBanner;
}

export interface IUploadBannerVars {
  name: string;
  url: string;
  uploadDate: string;
}

export interface IDeleteBannerData {
  deleteBanner: {
    message: string;
  };
}

export interface IDeleteBannerVars {
  id: number;
}

export interface IFormData {
  username: string;
  email: string;
  password: string;
}

export interface IFormErrors {
  username?: string;
  email?: string;
  password?: string;
  general?: string;
}

export interface ILoginResponse {
  login: {
    token: string;
  };
}

export interface ISignupResponse {
  signup: {
    token: string;
  };
}
