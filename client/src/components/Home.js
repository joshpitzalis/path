import React from 'react';
import domain from '../utils/domain';
import AuthService from '../utils/AuthService';

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

class Home extends React.Component {
  constructor () {
    super();
    this.state = {
      tutorials: []
    };
  }

  componentWillMount () {
    // public http request
    fetch(domain.server)
      .then(response => response.json())
      .then(response =>
        this.setState({tutorials: response})
      );
  }

  render () {
    return (
      <header className='sans-serif'>
        <div className='cover bg-left bg-center-l hero'>
          <div className='bg-black-80 pb5 pb6-m pb7-l'>
            <div className='tc-l pt4 pt5-m pt6-l ph3'>
              <h1 className='f2 f1-l fw2 white-90 mb0 lh-title'>Create Your Learning Path</h1>
              <h2 className='fw1 f3 white-80 mt3 mb4'>Keep track of all the tutorials you want to do and organise them into a clear Learning Path.</h2>
              <a className='f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3' onClick={auth.login.bind(this)}>Sign Up</a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Home;
