import { gql } from 'react-apollo'

export const getUsername = gql`
  query {
    user {
      name
    }
  }
`
