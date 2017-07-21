import { gql } from 'react-apollo'

export const deleteAccount = gql`
  mutation deleteAccount($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`
