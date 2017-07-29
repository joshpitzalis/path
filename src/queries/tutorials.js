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
      tags {
        text
      }
      updatedAt
    }
  }
`

export const ALL_TUTORIALS_FILTER_QUERY = gql`
  query SearchQuery($searchText: String!) {
    allTutorials(filter: { tags_some: { text: $searchText } }) {
      id
      createdAt
      author
      completed
      link
      title
      tags {
        id
        text
      }
      updatedAt
    }
  }
`
