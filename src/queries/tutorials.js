import { gql } from 'react-apollo'

export const ALL_TUTORIALS_QUERY = gql`
  query AllTutorials {
    allTutorials {
      id
      createdAt
      author
      completed
      link
      title
      updatedAt
    }
  }
`
