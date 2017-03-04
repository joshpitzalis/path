import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Edit from './components/Edit';
import AuthService from './utils/AuthService';

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

const AuthExample = () => (
  <Router >
    <div>
      <AuthButton />
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/profile'>My Path</Link></li>
      </ul>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <PrivateRoute path='/edit' component={Edit} />
      <PrivateRoute path='/profile' component={Profile} />
    </div>
  </Router>
);

const AuthButton = withRouter(({ push }) => (
  auth.loggedIn() ? (
    <p>
      <button onClick={() => {
        auth.logout(() => push('/'));
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.loggedIn() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
);

export default AuthExample;
