import React from 'react';
import AuthService from '../utils/AuthService';
import { Link, withRouter } from 'react-router-dom';
import domain from '../utils/domain';
import Tutorial from './Tutorial';

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

class Profile extends React.Component {
  constructor () {
    super();
    this.state = {
      tutorials: [],
      user: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentWillMount () {
    // this populates state with tutorial data from mongo and then user data from auth0
    fetch(domain.server)
      .then(response => response.json())
      .then(response =>
        this.setState({tutorials: response})
      )
      .then(
        this.setState({user: auth.getProfile()})
      )
      .catch(error => console.error(error));
  }

  componentWillUpdate (nextProps, nextState) {
    const changeStatus = {
      user_metadata: nextState.user.user_metadata
    };
    auth.updateProfile(this.state.user.user_id, changeStatus)
    .catch(error => console.error(error));
  }

  // timeoutPromise (timeout, err, promise) {
  //   return new Promise(function (resolve, reject) {
  //     promise.then(resolve, reject);
  //     setTimeout(reject.bind(null, err), timeout);
  //   });
  // }

  handleDelete (id) {
    const tuts = [...this.state.tutorials];
    const tutorials = tuts.filter(tut => tut._id !== id);
    this.setState({tutorials});
    auth.fetch(`${domain.server}/api/delete?id=${id}`,
      {method: 'DELETE'})
      .catch(error => console.error(error));
  }

  handleStatusChange (evt, id) {
    const user = {...this.state.user};
    user.user_metadata[id] = evt.target.checked;
    this.setState({user});
    // update a given tutorial with username and status
    auth.fetch(`${domain.server}/api/status?id=${id}&doing=${evt.target.checked}`, {method: 'PATCH'})
      .catch(error => console.log('Request failed', error));
  }

  render () {
    const tutorials = this.state.tutorials
    .filter(tut => tut.id === this.state.user.user_id)
    .map((tut, index) =>
      <Tutorial
        key={index}
        tut={tut}
        user={this.state.user}
        handleDelete={this.handleDelete}
        handleStatusChange={this.handleStatusChange} />);

    return (
      <div>
        <div className='tc'>
          <Link to='/edit' className='f6 link dim br-pill ba ph3 pv2 mb2 dib bg-cucumber white ma5 center'>Add A Tutorial</Link>
        </div>
        <div className='flex flex-wrap justify-center mt4 mw7 center'>
          {tutorials}
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
