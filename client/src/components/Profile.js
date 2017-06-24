import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tutorial from './Tutorial'
import { database } from '../firebase.js'
export default class Profile extends Component {
  state = {
    tutorials: []
  }

  componentDidMount() {
    // this populates state with tutorial data from firebase
    database
      .ref(`/tutorials`)
      .once('value')
      .then(snap => this.setState({ tutorials: snap.val() }))
    // fetch(domain.server)
    //   .then(response => response.json())
    //   .then(response => this.setState({ tutorials: response }))
    //   .then(this.setState({ user: auth.getProfile() }))
    //   .catch(error => console.error(error))
  }

  componentWillUpdate(nextProps, nextState) {
    //   const changeStatus = {
    //     user_metadata: nextState.user.user_metadata
    //   }
    //   auth
    //     .updateProfile(this.state.user.user_id, changeStatus)
    //     .catch(error => console.error(error))
    // }
    // timeoutPromise (timeout, err, promise) {
    //   return new Promise(function (resolve, reject) {
    //     promise.then(resolve, reject);
    //     setTimeout(reject.bind(null, err), timeout);
    //   });
  }

  handleDelete = id => {
    // const tuts = [...this.state.tutorials]
    // const tutorials = tuts.filter(tut => tut._id !== id)
    // this.setState({ tutorials })
    // auth
    //   .fetch(`${domain.server}/api/delete?id=${id}`, { method: 'DELETE' })
    //   .catch(error => console.error(error))
  }

  handleStatusChange = (evt, id) => {
    // const user = { ...this.state.user }
    // user.user_metadata[id] = evt.target.checked
    // this.setState({ user })
    // // update a given tutorial with username and status
    // auth
    //   .fetch(
    //     `${domain.server}/api/status?id=${id}&doing=${evt.target.checked}`,
    //     { method: 'PATCH' }
    //   )
    //   .catch(error => console.log('Request failed', error))
  }

  handleHelp = (evt, id) => {
    // const tutorials = [...this.state.tutorials]
    // const tut = tutorials.find(tut => tut._id === id)
    // tut.stuck = evt.target.checked
    // this.setState({ tutorials })
    // auth
    //   .fetch(
    //     `${domain.server}/api/stuck?id=${id}&stuck=${evt.target.checked}`,
    //     { method: 'PATCH' }
    //   )
    //   .catch(error => console.log('Request failed', error))
  }

  render() {
    const tutorials = Object.keys(this.state.tutorials)
      .filter(tut => tut.uid !== this.props.uid)
      .map((tut, index) =>
        <Tutorial
          key={index}
          title={this.state.tutorials[tut].title}
          description={this.state.tutorials[tut].description}
          author={this.state.tutorials[tut].author}
          link={this.state.tutorials[tut].link}
          tutId={tut}
          // user={this.state.user}
          // handleDelete={this.handleDelete}
          // handleStatusChange={this.handleStatusChange}
          // handleHelp={this.handleHelp}
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
