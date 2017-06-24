import React from 'react'
import PropTypes from 'prop-types'
import { auth, googleAuthProvider } from '../firebase.js'
import { Link } from 'react-router-dom'

const Nav = ({ authed }) =>
  <nav className="flex justify-between bb b--black-10">
    <Link
      to="/"
      className="link white-70 hover-white no-underline flex items-center pa3"
      href="">
      <svg className="dib h1 w1" data-icon="grid" viewBox="0 0 32 32">
        <title>Super Normal Icon Mark</title>
        <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z" />
      </svg>
    </Link>
    <div className="flex-grow pa3 flex items-center ">
      <Link to="/profile" className="f6 link dib dark-gray dim mr3 mr4-ns">
        My Learning Path
      </Link>
      {authed
        ? <button
            className="f6 dib bg-black white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--black-20"
            onClick={() => {
              auth.signOut()
            }}>
            Sign out
          </button>
        : <button
            className="f6 dib bg-black white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--black-20"
            onClick={() => auth.signInWithPopup(googleAuthProvider)}>
            Log in
          </button>}
    </div>
  </nav>

Nav.propTypes = {}
Nav.defaultProps = {}

export default Nav
