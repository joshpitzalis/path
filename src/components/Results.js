import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tutorial from './Tutorial'
import Stats from './Stats'
import { graphql, gql, compose } from 'react-apollo'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import { ALL_TUTORIALS_FILTER_QUERY } from '../queries/tutorials.js'
import { getUsername } from '../queries/user.js'

class Results extends Component {
  componentDidMount() {
    this.props.ALL_TUTORIALS_FILTER_QUERY
  }
  render() {
    const allTuts = this.props.data.allTutorials
    const incompleteTuts =
      allTuts && allTuts.filter(tut => tut.completed === false)
    const completedTuts =
      allTuts && allTuts.filter(tut => tut.completed === true)
    return (
      <div>
        <div className="flex col wrap mw7 center">
          {completedTuts &&
            completedTuts.map((tut, index) =>
              <Tutorial
                key={index}
                title={tut.title}
                description={tut.description}
                author={tut.author}
                link={tut.link}
                tutId={tut.id}
                completed={tut.completed}
                tags={tut.tags}
              />
            )}
        </div>
        <div className="flex col wrap mw7 center">
          {incompleteTuts &&
            incompleteTuts.map((tut, index) =>
              <Tutorial
                key={index}
                title={tut.title}
                description={tut.description}
                author={tut.author}
                link={tut.link}
                tutId={tut.id}
                completed={tut.completed}
                tags={tut.tags}
              />
            )}
        </div>
        <div className="tc">
          <Link
            to={
              !this.props.username.loading &&
              `/${this.props.username.user.name}`
            }
            data-test="add"
            className="f6 link dim br-pill ba ph3 pv2 dib bg-cucumber white ma5 tc"
          >
            Back To All Tutorials
          </Link>
        </div>
        {allTuts &&
          <Stats total={allTuts.length} completed={completedTuts.length} />}
      </div>
    )
  }
}

export default compose(
  graphql(getUsername, { name: 'username' }),
  graphql(ALL_TUTORIALS_FILTER_QUERY, {
    options: props => ({ variables: { searchText: props.match.params.result } })
  })
)(Results)
