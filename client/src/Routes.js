import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'
// import Login from './components/Login'
import Nav from './components/Nav.js'
import Home from './components/Home'
// import Group from './components/Group'
import Profile from './components/Profile'
// import Edit from './components/Edit'
import { auth } from './firebase.js'

export default class App extends Component {
  state = {
    authed: false,
    loading: true
  }

  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    return this.state.loading === true
      ? <h1 className="tc pt5">Loading...</h1>
      : <BrowserRouter>
          <div>
            <PropsRoute path="/" component={Nav} authed={this.state.authed} />
            <Switch>
              <PropsRoute
                path="/"
                exact
                component={Home}
                authed={this.state.authed}
              />
              <PrivateRoute
                authed={this.state.authed}
                path="/profile"
                component={Profile}
              />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
          </div>
        </BrowserRouter>
  }
}

// These hoc components allow you to pass props into a route component
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return React.createElement(component, finalProps)
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest)
      }}
    />
  )
}

const PrivateRoute = ({ component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        authed === true
          ? renderMergedProps(component, routeProps, rest)
          : <Redirect
              to={{ pathname: '/', state: { from: routeProps.location } }}
            />}
    />
  )
}
