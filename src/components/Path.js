import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tutorial from './Tutorial'
import { auth, database } from '../firebase.js'
import Stats from './Stats'
import { graphql, gql } from 'react-apollo'

class MyPath extends Component {
  state = {
    tutorials: []
  }

  componentDidMount() {
    database
      .ref(`/${auth.currentUser.uid}/tutorials`)
      .on('value', snap => this.setState({ tutorials: snap.val() }))
  }

  render() {
    const tutorials = Object.keys(this.state.tutorials)
      .filter(tut => this.state.tutorials[tut].completed === false)
      .map((tut, index) =>
        <Tutorial
          key={index}
          title={this.state.tutorials[tut].title}
          description={this.state.tutorials[tut].description}
          author={this.state.tutorials[tut].author}
          link={this.state.tutorials[tut].link}
          tutId={tut}
          completed={this.state.tutorials[tut].completed}
        />
      )

    const completedTutorials = Object.keys(this.state.tutorials)
      .filter(tut => this.state.tutorials[tut].completed === true)
      .map((tut, index) =>
        <Tutorial
          key={index}
          title={this.state.tutorials[tut].title}
          description={this.state.tutorials[tut].description}
          author={this.state.tutorials[tut].author}
          link={this.state.tutorials[tut].link}
          tutId={tut}
          completed={this.state.tutorials[tut].completed}
        />
      )

    if (this.props.allLinksQuery && this.props.allTutorialsQuery.loading) {
      return <div>Loading graphs...</div>
    }
    if (this.props.allLinksQuery && this.props.allTutorialsQuery.error) {
      return <div>Error</div>
    }

    const allTuts = this.props.allTutorialsQuery.allTutorials
    return (
      <div>
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
        <Stats completed={completedTutorials.length} total={tutorials.length} />
        {/* {completedTutorials}
        {tutorials} */}
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
