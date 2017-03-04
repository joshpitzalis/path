import React from 'react';
import {Redirect} from 'react-router-dom';
import AuthService from '../utils/AuthService';

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

class Login extends React.Component {
  render () {
    console.log(auth.loggedIn())

    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    if (auth.loggedIn()) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={auth.login.bind(this)}>Log in</button>
      </div>
    );
  }
}

export default Login;
