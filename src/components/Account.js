import React from 'react'
import { graphql, gql, compose } from 'react-apollo'
import { GC_USER_ID } from '../constants'

const Account = ({ data, deleteAccount, history }) =>
  <nav className="pa3 pa4-ns">
    <p className="link dim black b f1 f-headline-ns tc db mb3 mb4-ns">
      {data.user && data.user.name}
    </p>
    <div className="tc pb3">
      {data.user &&
        <p
          className="link dim gray f6 f5-ns dib mr3 red pointer"
          data-test="deleteAccount"
          onClick={() =>
            deleteAccount({
              variables: {
                id: localStorage.getItem(GC_USER_ID)
              }
            }).then(history.push(`/`))}
        >
          Delete Account
        </p>}
    </div>
  </nav>

const getUsername = gql`
  query {
    user {
      name
    }
  }
`

const deleteAccount = gql`
  mutation deleteAccount($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(getUsername),
  graphql(deleteAccount, {
    name: 'deleteAccount'
  })
)(Account)
