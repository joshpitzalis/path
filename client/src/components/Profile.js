import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tutorial from './Tutorial'
import { auth, database } from '../firebase.js'

export default class Profile extends Component {
  state = {
    tutorials: []
  }

  componentDidMount() {
    database
      .ref(`/${auth.currentUser.uid}/tutorials`)
      .on('value', snap => this.setState({ tutorials: snap.val() }))
  }

  render() {
    const tutorials = Object.keys(this.state.tutorials).map((tut, index) =>
      <Tutorial
        key={index}
        title={this.state.tutorials[tut].title}
        description={this.state.tutorials[tut].description}
        author={this.state.tutorials[tut].author}
        link={this.state.tutorials[tut].link}
        tutId={tut}
      />
    )

    return (
      <div>
        <div className="tc">
          <Link
            to="/add"
            className="f6 link dim br-pill ba ph3 pv2 mb2 dib bg-cucumber white ma5 center">
            Add A Tutorial
          </Link>
        </div>
        <div className="flex flex-wrap justify-center mt4 mw7 center">
          {tutorials}
        </div>
      </div>
    )
  }
}
