import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { auth, googleAuthProvider } from '../firebase.js';

export default class Home extends PureComponent {
  state = {
    redirectToReferrer: false
  };

  componentDidMount() {
    if (this.props.authed) {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentDidUpdate() {
    if (this.props.authed) {
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    let { authed } = this.props;

    if (authed) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <header className="sans-serif bg-base min-vh-100">
        <div className="cover bg-left bg-center-l hero ">
          <div className=" pb5 pb6-m pb7-l">
            <div className="tc-l pt4 pt5-m pt6-l ph3 ">
              <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">
                Create Your Own Learning Path
              </h1>
              <h2 className="fw1 f3 white-80 mt3 mb4">
                Organise all your online courses into a clear Learning Path.
              </h2>
              <a
                className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3 pointer"
                onClick={() => auth
                  .signInWithPopup(googleAuthProvider)
                  .catch(error => console.error(error))}
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

// const select = store => ({
//   auth: store.user.auth
// });

// const actions = {
//   login: doAuth
// };

// export const unwrappedLogin = Home;

// export default connect(
//   select,
//   actions
// )(Home);
