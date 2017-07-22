import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tutorial from './Tutorial'
import Stats from './Stats'
import { graphql, gql } from 'react-apollo'
import { ALL_TUTORIALS_QUERY } from '../queries/tutorials.js'

class MyPath extends Component {
  componentDidMount() {
    this.subscribeToTutorials()
  }

  subscribeToTutorials = () => {
    this.props.allTutorialsQuery.subscribeToMore({
      document: gql`
        subscription {
          Tutorial(filter: { mutation_in: [CREATED] }) {
            node {
              id
              createdAt
              author
              completed
              link
              title
              updatedAt
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newAllTutorials = [
          subscriptionData.data.Tutorial.node,
          ...previous.allTutorials
        ]
        console.log(newAllTutorials)
        const result = {
          ...previous,
          allTutorials: newAllTutorials
        }
        console.log(result)
        return result
      },
      onError: err => console.error(err)
    })
  }

  render() {
    if (this.props.allTutorialsQuery && this.props.allTutorialsQuery.loading) {
      return <div>Loading...</div>
    }
    if (this.props.allTutorialsQuery && this.props.allTutorialsQuery.error) {
      return <div>Error</div>
    }

    const allTuts = this.props.allTutorialsQuery.allTutorials
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
              />
            )}
        </div>
        <div className="tc">
          <Link
            to="/add"
            className="f6 link dim br-pill ba ph3 pv2 dib bg-cucumber white ma5 tc"
          >
            Add A Tutorial
          </Link>
        </div>
        {allTuts &&
          <Stats total={allTuts.length} completed={completedTuts.length} />}
      </div>
    )
  }
}

export default graphql(ALL_TUTORIALS_QUERY, { name: 'allTutorialsQuery' })(
  MyPath
)
