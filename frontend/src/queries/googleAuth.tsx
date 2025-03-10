
import { gql } from "@apollo/client";

export const GOOGLE_AUTH = gql`
query Query($creadential: String) {
  googleAuth(creadential: $creadential)
}
`


