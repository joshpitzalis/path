import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tutorial from './Tutorial'
import { auth, database } from '../firebase.js'
import Stats from './Stats'

export default class Tags extends Component {
  state = {
    tutorials: []
  }

  componentDidMount() {
    database
      .ref(`/${auth.currentUser.uid}/tutorials`)
      .orderByChild(this.props.match.params.tag)
      .equalTo(true)
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
          tags={this.state.tutorials[tut].tags}
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
          tags={this.state.tutorials[tut].tags}
          tutId={tut}
          completed={true}
          completed={this.state.tutorials[tut].completed}
        />
      )

    return (
      <div>
        {/* <Stats completed={completedTutorials.length} total={tutorials.length} /> */}
        <div className="flex col wrap mw7 center">
          {tutorials}
          {completedTutorials}
        </div>
        <div className="tc">
          <Link
            to="/dashboard"
            className="f6 link dim br-pill ba ph3 pv2 dib bg-cucumber white ma5 center ttu"
          >
            Back To Tutorials
          </Link>
        </div>
      </div>
    )
  }
}
