import React from 'react';
import {Redirect} from 'react-router-dom';
import AuthService from '../utils/AuthService';

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

class Login extends React.Component {
  render () {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    if (auth.loggedIn()) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className='mv6 tc'>
        <p>You must Signup or Log in to view this page.</p>
        <button className='f6 dib bg-black white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--black-20' onClick={auth.login.bind(this)}>Sign Up</button>
      </div>
    );
  }
}

export default Login;
