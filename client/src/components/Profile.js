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
    fetch(domain.server)
      .then(response => response.json())
      .then(response =>
        this.setState({tutorials: response, isFetching: false})
      );
  }

  componentWillReceiveProps(nextProps) {
    this.render();
    if (nextProps.location.state) {
      this.setState({refresh: false})
      // console.log('falsed');
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
        setTimeout(function() {
          this.setState({tutorials: response, isFetching: false}); }.bind(this), 1000);
      })
  }

  componentDidMount () {
    console.log(this.state.user)

  }

  render () {

    const { from } = this.props.location.state || { from: { pathname: '/profile' } }
    const tutorials = this.state.tutorials
    .filter(tut => tut.id === this.state.user.user_id)
    .map((tut, index) =>
      <article key={index} className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
  <div className='bg-orange br3 br--top'>
    <a href={tut.link} target='_blank' className="dib link">
      <h1 className="f4 br3 br--top black-60 mv0 pv2 ph3 truncate white">{tut.title}</h1>
    </a>
  </div>
    <div className="pa3 bt b--black-10">
      <h2 className='f5 fw4 gray mt0 truncate bg--orange'>by {tut.author}</h2>
      <p className="f6 f5-ns lh-copy measure">
        {tut.desc}
      </p>
      <p>Status:{this.state.user.user_metadata[`${tut._id}`]}</p>
      <Link to={{
        pathname: '/edit',
        state: tut
      }}>Edit</Link>
    <button onClick={() => this.handleDelete(tut._id)}>Delete</button>
      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Mark as Currently Doing</label>
    </div>
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
      <div className='mw7'>
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
