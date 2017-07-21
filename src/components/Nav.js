import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import { getUsername } from '../queries/user.js'
import { graphql } from 'react-apollo'

class Nav extends Component {
  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    return (
      <nav className="flex justify-between bb b--black-10 fixed w-100 bg-white z-999">
        <Link
          to={
            this.props.data.user && this.props.data.user.name
              ? `/${this.props.data.user.name}`
              : '/'
          }
          className="link white-70 hover-white no-underline flex items-center pa3"
        >
          <svg className="dib h1 w1" data-icon="grid" viewBox="0 0 32 32">
            <title>Path Icon</title>
            <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z" />
          </svg>
        </Link>

        <div className="flex-grow pa3 flex items-center ">
          {userId &&
            <Link
              to="/account"
              data-test="myAccount"
              className="f6 link dib dark-gray dim mr3 mr4-ns"
            >
              My Account
            </Link>}
          {userId
            ? <button
                className="f6 dib bg-black white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--black-20"
                data-test="logout"
                onClick={() => {
                  localStorage.removeItem(GC_USER_ID)
                  localStorage.removeItem(GC_AUTH_TOKEN)
                  this.props.history.push(`/login`)
                }}
              >
                logout
              </button>
            : <Link
                data-test="signin"
                to="/login"
                className="f6 dib bg-black white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--black-20"
              >
                login
              </Link>}
        </div>
      </nav>
    )
  }
}

export default graphql(getUsername)(Nav)
