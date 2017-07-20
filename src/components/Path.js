import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tutorial from './Tutorial'
import Stats from './Stats'
import { graphql, gql } from 'react-apollo'

class MyPath extends Component {
  render() {
    if (this.props.allLinksQuery && this.props.allTutorialsQuery.loading) {
      return <div>Loading graphs...</div>
    }
    if (this.props.allLinksQuery && this.props.allTutorialsQuery.error) {
      return <div>Error</div>
    }

    const allTuts = this.props.allTutorialsQuery.allTutorials
    const completedTuts =
      allTuts && allTuts.filter(tut => tut.completed === true)
    return (
      <div>
        <div className="flex col wrap mw7 center">
          {completedTuts &&
            completedTuts.map(tut =>
              <Tutorial
                key={tut.id}
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
          {allTuts &&
            allTuts.map(tut =>
              <Tutorial
                key={tut.id}
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

const ALL_TUTORIALS_QUERY = gql`
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

export default graphql(ALL_TUTORIALS_QUERY, { name: 'allTutorialsQuery' })(
  MyPath
)
