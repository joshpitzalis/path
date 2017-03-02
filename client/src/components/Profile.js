import React from 'react';
import AuthService from '../utils/AuthService';
import { Link, Redirect } from 'react-router-dom';
import domain from '../utils/domain';

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

class Profile extends React.Component {
  constructor () {
    super();
    this.state = {
      tutorials: [],
      user: auth.getProfile(),
      refresh: false
    };
  }

  componentWillMount () {
    fetch(domain.server)
      .then(response => response.json())
      .then(response =>
        this.setState({tutorials: response})
      );
  }

  handleDelete = (id) => {
    auth.fetch(`${domain.server}/api/delete?id=${id}`,
      {method: 'DELETE'})
      .then(
        this.setState({
        refresh: true
      })
    )
  }

  render () {
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
        <Redirect to='/' />
      );
    }

    return (
      <div>
        <p>hello {this.state.user.nickname}</p>
        <Link to='/edit'><button>+ Add Tutorial</button></Link>
        <div className='flex flex-wrap justify-center mt4'>
          {tutorials}
        </div>
      </div>
    );
  }
}

export default Profile;
