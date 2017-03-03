import React from 'react';
import mern from '../../public/images/mern.png';
import AuthService from '../utils/AuthService';
import {Redirect} from 'react-router-dom';
import domain from '../utils/domain';

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

class Edit extends React.Component {
  constructor () {
    super();
    this.state = {
      edited: false,
      redirectToReferrer: false,
      image: mern,
      title: 'Title',
      author: 'Author',
      link: '',
      id: auth.getProfile().user_id
    };
  }

  componentDidMount () {
    this.setState({
      image: this.props.location.state.image,
      title: this.props.location.state.title,
      author: this.props.location.state.author,
      link: this.props.location.state.link,
      edited: this.props.location.state.edited
    });
  }

  handleChange = (e) => {
    let target = e.target.name;
    let value = e.target.value;
    let obj = {};
    obj[target] = value
    this.setState(obj)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {image, title, author, link, id} = this.state
    if (this.state.edited) {
      console.log(this.props.location.state._id);
      auth.fetch(`${domain.server}/api/edit?image=${image}&title=${title}&author=${author}&link=${link}&id=${id}&_id=${this.props.location.state._id}`,
        {method: 'PUT'})
        .then(
          this.setState({ redirectToReferrer: true }))
        .catch(error => console.log('Request failed', error));
    } else {
      auth.fetch(`${domain.server}/api/add?image=${image}&title=${title}&author=${author}&link=${link}&id=${id}`,
        {method: 'POST'})
        .then(
          this.setState({ redirectToReferrer: true }))
        .catch(error => console.log('Request failed', error));
    }
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className='flex flex-wrap justify-center '>
        <article className='w5 bg-white br3 pa3 pa4-ns mv3 ba b--black-10 mh5'>
          <div className='tc'>
            <img src={this.state.image} className='h4 w4 dib ba b--black-05 pa2' title={this.state.title} alt={this.state.title} />
            <a href={this.state.link} target='_blank'><h1 className='f3 mb2 truncate'>{this.state.title}</h1></a>
            <h2 className='f5 fw4 gray mt0 truncate'>{this.state.author}</h2>
          </div>
        </article>
        <form
          onSubmit={this.handleSubmit}
          className='mh5'>
          <div>
            <p><input type='url' name='image' onChange={this.handleChange} placeholder='Add image link here' /></p>
            <p><input type='text' name='title' onChange={this.handleChange} value={this.state.title} /></p>
            <p><input type='text' name='author' onChange={this.handleChange} value={this.state.author} /></p>
            <p><input type='url' name='link' onChange={this.handleChange} value={this.state.link} /></p>
          </div>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default Edit;
