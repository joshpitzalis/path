import React, { Component } from 'react'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import { gql, graphql, compose } from 'react-apollo'

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: ''
  }

  confirm = async () => {
    const { name, email, password } = this.state
    if (this.state.login) {
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      this.saveUserData(id, token)
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          name,
          email,
          password
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      this.saveUserData(id, token)
    }
    this.props.history.push('/')
  }

  saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }

  render() {
    return (
      <div className="w-50 center">
        <h4 className="mv3">
          {this.state.login ? 'Login' : 'Sign Up'}
        </h4>
        <div className="flex flex-column">
          {!this.state.login &&
            <input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
              data-test="name"
            />}
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
            data-test="email"
          />
          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
            data-test="password"
          />
        </div>
        <div className="flex mt3">
          <button
            className="pointer mr2"
            data-test="login"
            onClick={() => this.confirm()}
          >
            {this.state.login ? 'login' : 'create Account'}
          </button>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !this.state.login })}
          >
            {this.state.login
              ? 'need to create an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      name: $name
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`
const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(Login)
