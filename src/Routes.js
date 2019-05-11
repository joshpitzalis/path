import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { auth, googleAuthProvider } from './firebase.js';
import Add from './pages/Add';
import Dashboard from './pages/Dashboard';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Tags from './pages/Tags';

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    uid: null
  };

  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          uid: user.uid
        });
      } else {
        this.setState({
          authed: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={'/dashboard'} />;
    }
    return this.state.loading === true ? (
      <h1 className="tc pt5">Loading...</h1>
    ) : (
      <BrowserRouter>
        <div>
          {this.state.authed && (
            <PropsRoute path="/" component={Nav} authed={this.state.authed} />
          )}
          <Switch>
            <PropsRoute
              path="/"
              exact
              component={Login}
              authed={this.state.authed}
            />

            <PrivateRoute
              authed={this.state.authed}
              path="/dashboard"
              component={Dashboard}
              uid={this.state.uid}
            />
            <PrivateRoute
              authed={this.state.authed}
              path="/tags/:tag"
              component={Tags}
              uid={this.state.uid}
            />
            <PrivateRoute
              authed={this.state.authed}
              path="/edit/:tutId/:status"
              component={Edit}
            />
            <PrivateRoute
              authed={this.state.authed}
              path="/add"
              component={Add}
              uid={this.state.uid}
            />
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
          <footer className="pv4 ph3 ph5-m ph6-l mid-gray bt bw1 b--black-10">
  <small className="f6 db tc">Version 0.0.2</small>
  {/* <div class="tc mt3">
    <a href="/language/" title="Language" class="f6 dib ph2 link mid-gray dim">Language</a>
    <a href="/terms/"    title="Terms" class="f6 dib ph2 link mid-gray dim">Terms of Use</a>
    <a href="/privacy/"  title="Privacy" class="f6 dib ph2 link mid-gray dim">Privacy</a>
  </div> */}
</footer>
        </div>
      </BrowserRouter>
    );
  }
}

// These hoc components allow you to pass props into a route component
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

const PrivateRoute = ({ component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        authed === true ? (
          renderMergedProps(component, routeProps, rest)
        ) : (
          <Redirect
            to={{ pathname: '/', state: { from: routeProps.location } }}
          />
        )
      }
    />
  );
};



const Nav = ({ authed, location }) =>
  <nav className="flex justify-between bb b--black-10">
    <Link
      to="/dashboard"
      className="link white-70 hover-white no-underline flex items-center pa3 w-33"
    >
      <svg className="dib h1 w1" data-icon="grid" viewBox="0 0 32 32">
        <title>Super Normal Icon Mark</title>
        <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z" />
      </svg>
    </Link>
    <div className="tc w-33">
      {location.pathname !== '/add' &&
        <Link
          to="/add"
          className="f6 link dim br-pill ba ph3 pv2 dib bg-cucumber white ma3 center"
        >
          Add A Tutorial
        </Link>}
    </div>
    <div className="flex-grow pa3 flex items-center w-33 justify-end">
      {/* <Link to="/dashboard" className="f6 link dib dark-gray dim mr3 mr4-ns">
        My Learning Path
      </Link> */}
      {authed
        ? <button
            className="f6 dib bg-black white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--black-20"
            onClick={() => {
              auth.signOut()
            }}
          >
            Sign out
          </button>
        : <button
            className="f6 dib bg-black white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--black-20"
            onClick={() => auth.signInWithPopup(googleAuthProvider)}
          >
            Log in
          </button>}
    </div>
  </nav>

Nav.propTypes = {}
Nav.defaultProps = {}


