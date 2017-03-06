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
import Group from './components/Group';
import Profile from './components/Profile';
import Edit from './components/Edit';
import AuthService from './utils/AuthService';

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

const AuthExample = () => (
  <Router >
    <div>
      <nav className='flex justify-between bb b--black-10'>
        <Link to='/' className='link white-70 hover-white no-underline flex items-center pa3' href=''>
          <svg
            className='dib h1 w1'
            data-icon='grid'
            viewBox='0 0 32 32'
            >
            <title>Super Normal Icon Mark</title>
            <path d='M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z' />
          </svg>
        </Link>
        <div className='flex-grow pa3 flex items-center '>
          <Link to='/group' className='f6 link dib dark-gray dim mr3 mr4-ns'>My Group</Link>
          <Link to='/profile' className='f6 link dib dark-gray dim mr3 mr4-ns'>My Path</Link>
          <AuthButton />
        </div>
      </nav>

      <Route exact path='/' component={Home} />
      <Route path='/group' component={Group} />
      <Route path='/login' component={Login} />
      <PrivateRoute path='/edit' component={Edit} />
      <PrivateRoute path='/profile' component={Profile} />

      <footer className='mt7 bg-near-black white-80 pv5 pv6-l ph4'>
        <p className='f6'><span className='dib mr4 mr5-ns'>©2017 Jaaga, Inc.</span>
          <a className=' link white-80 hover-light-purple' href='/terms'>Contact</a> /
        <a className='link white-80 hover-gold' href='/privacy'> About </a> /
        <a className='link white-80 hover-green' href='#'>Report A Bug</a>
        </p>
      </footer>
    </div>
  </Router>
);

const AuthButton = withRouter(({ push }) => (
  auth.loggedIn() ? (
    <p>
      <button className='f6 dib bg-black white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--black-20' onClick={() => {
        auth.logout(() => push('/'));
      }}>Sign out</button>
    </p>
  ) : (
    <p><button className='f6 dib bg-black white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--black-20' onClick={auth.login.bind(this)}>Log in</button></p>
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
