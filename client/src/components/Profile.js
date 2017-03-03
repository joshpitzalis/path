import React from 'react';
import AuthService from '../utils/AuthService';
import { Link, Redirect, withRouter } from 'react-router-dom';
import domain from '../utils/domain';

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

class Profile extends React.Component {
  constructor () {
    super();
    this.state = {
      tutorials: [],
      user: auth.getProfile(),
      refresh: false,
      isFetching: true
    };
  }

  componentWillMount () {
    console.log('mount');
    fetch(domain.server)
      .then(response => response.json())
      .then(response =>
        this.setState({tutorials: response, isFetching: false})
      );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.render();
    if (nextProps.location.state) {
      this.setState({refresh: false})
      console.log('falsed');
    }
  }

  timeoutPromise = (timeout, err, promise) => {
    return new Promise(function(resolve,reject) {
        promise.then(resolve,reject);
        setTimeout(reject.bind(null,err), timeout);
      });
    }

  handleDelete = (id) => {
    auth.fetch(`${domain.server}/api/delete?id=${id}`,
      {method: 'DELETE'})
    .then(this.setState({isFetching: true}))
    fetch(domain.server)
      .then(response => response.json())
      .then(response => {
        setTimeout(function() { this.setState({tutorials: response, isFetching: false}); }.bind(this), 1000);
        console.log(this.state);
      })
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } }
    const tutorials = this.state.tutorials
    .filter(tut => tut.id === this.state.user.user_id)
    .map((tut, index) => <article key={index} className='w5 bg-white br3 pa3 pa4-ns ma1 ba b--black-10 tc' >
      <Link to={{
        pathname: '/edit',
        state: tut
      }}>
        <img src={tut.image} className='h4 w4 dib ba b--black-05 pa2' title={tut.title} alt={tut.title} />
        <h1 className='f3 mb2 truncate'>{tut.title}</h1>
        <h2 className='f5 fw4 gray mt0 truncate'>{tut.author}</h2>
      </Link>
      <button onClick={() => this.handleDelete(tut._id)}>Delete</button>
    </article>);

    if (this.state.refresh) {
      return (
        <Redirect to={{
          pathname: '/profile',
          state: { referrer: from }
        }} />
      );
    }

    if (this.state.isFetching) {
      return (
        <h1>Loading...</h1>
      );
    }

    return (
      <div>
        <p>hello {this.state.user.nickname}</p>
        <Link to='/edit'><button>Add Tutorial</button></Link>
        <div className='flex flex-wrap justify-center mt4'>
          {tutorials}
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
