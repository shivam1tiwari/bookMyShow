
import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query Query($page: Int!) {
    getAllMovie(page: $page) {
      results {
        id
        poster_path
        title
        vote_average
        vote_count
      }
    }
  }
`;
export const GET_MOVIES_BY_ID = gql`
 query Query($getMovieByIdId: String) {
  getMovieById(id: $getMovieByIdId) {
    adult
    backdrop_path
    genre_ids
    id
    original_language
    original_title
    overview
    popularity
    poster_path
    release_date
    title
    video
    vote_average
    vote_count
  }
}
`;

export const GET_MOVIES_BY_NAME = gql`
 query Query($movieName: String) {
  searchMovieByName(movieName: $movieName) {
    results {
      id
      title
    }
  }
}

`;
export const UPLOAD_BANNER = gql`
mutation UploadBanner($name: String!, $url: String!, $uploadDate: String!) {
  uploadBanner(name: $name, url: $url, uploadDate: $uploadDate) {
    id
    name
    url
    uploadDate
  }
}`

export const GET_BANNERS = gql`
query Query {
  getBanners {
    id
    name
    url
    uploadDate
  }
}`

export const DELETE_BANNER = gql`
mutation deleteBanner($id: Int!) {
  deleteBanner(id: $id) {
    message
  }
}
`
export const GET_ACTORS = gql`
query Query($page: Int) {
  getAllActor(page: $page) {
    page
    results {
      adult
      gender
      id
      known_for_department
      name
      original_name
      popularity
      profile_path
      known_for {
        id
      }
    }
    total_pages
    total_results
  }
}`
