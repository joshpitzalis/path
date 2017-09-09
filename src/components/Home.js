import React, { Component } from 'react'
import { auth, googleAuthProvider } from '../firebase.js'
import { Redirect } from 'react-router-dom'

export default class Home extends Component {
  state = {
    redirectToReferrer: false
  }

  componentDidMount() {
    if (this.props.authed) {
      this.setState({ redirectToReferrer: true })
    }
  }

  componentDidUpdate() {
    if (this.props.authed) {
      this.setState({ redirectToReferrer: true })
    }
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' }
    }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <header className="sans-serif">
        <div className="cover bg-left bg-center-l hero">
          <div className="bg-black-80 pb5 pb6-m pb7-l">
            <div className="tc-l pt4 pt5-m pt6-l ph3">
              <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">
                Create Your Own Learning Path
              </h1>
              <h2 className="fw1 f3 white-80 mt3 mb4">
                Keep track of all the tutorials you want to do and organise them
                into a clear Learning Path.
              </h2>
              <a
                className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3"
                onClick={() =>
                  auth
                    .signInWithPopup(googleAuthProvider)
                    .catch(error => console.log(error))}
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
