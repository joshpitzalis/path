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
      nickname: auth.getProfile().nickname
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount () {
  //   this.setState({
  //     desc: this.props.location.state.desc,
  //     title: this.props.location.state.title,
  //     author: this.props.location.state.author,
  //     link: this.props.location.state.link,
  //     edited: this.props.location.state.edited
  //   });
  // }

  handleChange (e) {
    let target = e.target.name;
    let value = e.target.value;
    let obj = {};
    obj[target] = value;
    this.setState(obj);
  }

  handleSubmit (e) {
    e.preventDefault();
    const {desc, title, author, link, id, nickname} = this.state;
    if (this.state.edited) {
      auth.fetch(`${domain.server}/api/edit?desc=${desc}&title=${title}&author=${author}&link=${link}&id=${id}&_id=${this.props.location.state._id}&nickname=${nickname}`,
        {method: 'PUT'})
        .then(this.setState({redirect: true}))
        .catch(error => console.log('Request failed', error));
    } else {
      auth.fetch(`${domain.server}/api/add?desc=${desc}&title=${title}&author=${author}&link=${link}&id=${id}&nickname=${nickname}`,
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
        <div>
          <article className='center mw5 mw6-ns br3 hidden ba b--black-10 mv4'>
            <div className='bg-orange br3 br--top'>
              <a href={this.state.link} target='_blank' className='dib link'>
                <h1 className='f4 br3 br--top black-60 mv0 pv2 ph3 truncate white'>{this.state.title}</h1>
              </a>
            </div>
            <div className='pa3 bt b--black-10'>
              <h2 className='f5 fw4 gray mt0 truncate bg--orange'>by {this.state.author}</h2>
              <p className='f6 f5-ns lh-copy measure'>
                {this.state.desc}
              </p>
              <label className='pa0 ma0 lh-copy f6 pointer'><input type='checkbox' /> Mark as Currently Doing</label>
            </div>
          </article>
        </div>
        <form
          onSubmit={this.handleSubmit}
          className='mh4 mv4  ba b--black-10 ph4 br3'>
          <div className='mt4'>
            <p><input className='pa2 input-reset ba bg-transparent w-100 measure' type='text' name='desc' onChange={this.handleChange} value={this.state.desc} /></p>
            <p><input className='pa2 input-reset ba bg-transparent w-100 measure' type='text' name='title' onChange={this.handleChange} value={this.state.title} /></p>
            <p><input className='pa2 input-reset ba bg-transparent w-100 measure' type='text' name='author' onChange={this.handleChange} value={this.state.author} /></p>
            <p><input className='pa2 input-reset ba bg-transparent w-100 measure' type='url' name='link' placeholder='Add URL link here' onChange={this.handleChange} value={this.state.link} /></p>
          </div>
          <input className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 mb3' type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

// const Done = () => (
//   <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
//   <div className='bg-dark-green br3 br--top'>
//     <a href={this.state.link} target='_blank' className="dib link">
//       <h1 className="f4 br3 br--top black-60 mv0 pv2 ph3 truncate white">{this.state.title}</h1>
//     </a>
//   </div>
//     <div className="pa3 bt b--black-10">
//       <h2 className='f5 fw4 gray mt0 truncate'>{this.state.author}</h2>
//       <p className="f6 f5-ns lh-copy measure">
//         Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
//         tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
//         vero eos et accusam et justo duo dolores et ea rebum.
//       </p>
//       <ul className="list ph0">
//         <li className="dib mr1 mb2"><a href="#" className="f6 f5-ns b db pa2 link dim dark-gray ba b--black-20">#react</a></li>
//         <li className="dib mr1 mb2"><a href="#" className="f6 f5-ns b db pa2 link dim dark-gray ba b--black-20">#node</a></li>
//         <li className="dib mr1 mb2"><a href="#" className="f6 f5-ns b db pa2 link dim dark-gray ba b--black-20">#mongo</a></li>
//       </ul>
//       <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/>Mark Complete</label>
//     </div>
//   </article>
// )
//
// const Doing = () => (
//   <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
//   <div className=''>
//     <a href={this.state.link} target='_blank' className="dib link">
//       <h1 className="f4 br3 br--top black-60 mv0 pv2 ph3 truncate">{this.state.title}</h1>
//     </a>
//     <label className="switch dib fr ma1">
//       <input type="checkbox"/>
//       <div className="slider round"></div>
//     </label>
//   </div>
//     <div className="pa3 bt b--black-10">
//       <h2 className='f5 fw4 gray mt0 truncate'>{this.state.author}</h2>
//       <p className="f6 f5-ns lh-copy measure">
//         Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
//         tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
//         vero eos et accusam et justo duo dolores et ea rebum.
//       </p>
//       <ul className="list ph0">
//         <li className="dib mr1 mb2"><a href="#" className="f6 f5-ns b db pa2 link dim dark-gray ba b--black-20">#react</a></li>
//         <li className="dib mr1 mb2"><a href="#" className="f6 f5-ns b db pa2 link dim dark-gray ba b--black-20">#node</a></li>
//         <li className="dib mr1 mb2"><a href="#" className="f6 f5-ns b db pa2 link dim dark-gray ba b--black-20">#mongo</a></li>
//       </ul>
//       <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Mark as Complete</label>
//     </div>
//   </article>
// )

export default Edit;
