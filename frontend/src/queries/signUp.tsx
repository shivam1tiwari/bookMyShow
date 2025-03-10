import { gql } from "@apollo/client";

export const SIGNUP = gql`
 mutation Mutation($email: String!, $password: String!, $username: String!) {
  signup(email: $email, password: $password, username: $username) {
    token
    user {
      id
      email
      username
    }
  }
}
`;