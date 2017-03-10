import React from 'react';
import AuthService from '../utils/AuthService';
import {Redirect} from 'react-router-dom';
import domain from '../utils/domain';
import '../../public/toggle.css';

const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);

class Edit extends React.Component {
  constructor () {
    super();
    this.state = {
      edited: false,
      redirect: false,
      desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
      title: 'Title',
      author: 'Author',
      link: '',
      id: auth.getProfile().user_id,
      nickname: auth.getProfile().nickname,
      stuck: false,
      _id: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    if (this.props.location.state) {
      console.log(JSON.parse(this.props.location.state));
      const result = JSON.parse(this.props.location.state);
      this.setState({
        desc: result.tut.desc,
        title: result.tut.title,
        author: result.tut.author,
        link: result.tut.link,
        edited: result.tut.edited,
        _id: result.tut._id
      });
    }
  }

  handleChange (e) {
    let target = e.target.name;
    let value = e.target.value;
    let obj = {};
    obj[target] = value;
    this.setState(obj);
  }

  handleTextareaChange (e) {
    let target = e.target.name;
    let value = e.target.value;
    let obj = {};
    obj[target] = value;
    this.setState(obj);
  }

  handleSubmit (e) {
    e.preventDefault();
    const {desc, title, author, link, id, nickname, stuck, _id} = this.state;
    if (this.state.edited) {
      auth.fetch(`${domain.server}/api/edit?desc=${desc}&title=${title}&author=${author}&link=${link}&id=${id}&_id=${_id}&nickname=${nickname}&stuck=${stuck}`,
        {method: 'PUT'})
        .then(this.setState({redirect: true}))
        .catch(error => console.log('Request failed', error));
    } else {
      auth.fetch(`${domain.server}/api/add?desc=${desc}&title=${title}&author=${author}&link=${link}&id=${id}&nickname=${nickname}&stuck=${stuck}`,
        {method: 'POST'})
        .then(
          response => {
            // false means 'todo'/ true means 'doing'
            const newTutorial = {
              user_metadata: {
                [response]: false
              }
            };
            auth.updateProfile(this.state.id, newTutorial);
          }
        )
        .then(this.setState({redirect: true}))
        .catch(error => console.log('Request failed', error));
    }
  }

  render () {
    if (this.state.redirect) {
      return (
        <Redirect to='/profile' />
      );
    }

    return (
      <div className='flex flex-wrap justify-center '>
        <form
          onSubmit={this.handleSubmit}
          className='mh4 mv4  ba b--black-10 ph4 br3'>

          <article className='center w-100 br3 hidden ba b--black-10 mv4'>
            <div className='br3 br--top'>
              <h1 className='f4 br3 br--top black-60 mv0 pv2 ph3 truncate'><input className='bn outline-0 bg-transparent w-100 input-reset lh-copy' type='text' name='title' onChange={this.handleChange} value={this.state.title} /></h1>
            </div>
            <div className='pa3 bt b--black-10'>
              <h2 className='f5 fw4 gray mt0 truncate bg--orange'>by <input className='bn outline-0 bg-transparent w-100 input-reset' type='text' name='author' onChange={this.handleChange} value={this.state.author} /></h2>

              <textarea className='bn outline-0 bg-transparent w-100 input-reset f6 f5-ns lh-copy mw5 mw6-ns'
                style={{resize: 'none'}}
                cols='70'
                rows='5' onChange={this.handleChange} name='desc'>{this.state.desc}</textarea>

            </div>
          </article>

          <p><input className='pa2 mb2 input-reset ba bg-transparent w-100 ' type='url' name='link' placeholder='Add URL link to tutorial here' onChange={this.handleChange} value={this.state.link} /></p>

          <input className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 mb3' type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default Edit;
