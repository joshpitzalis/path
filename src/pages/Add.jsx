import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import { auth, database } from '../firebase';

class Add extends Component {
  state = {
    tut: {
      title: null,
      author: null,
      desc: null,
      link: null,
      price: null,
      uid: this.props.uid,
      completed: false,
      tags: []
    },
    redirect: false,
    suggestions: []
  }

  async componentDidMount() {
    const suggestions = await database
      .ref(`/tags`)
      .once('value')
      .then(snap => snap.val())
    this.setState({ suggestions: Object.keys(suggestions) })
  }

  handleSubmit = e => {
    e.preventDefault()
    const newEntryKey = database
      .ref(`/${auth.currentUser.uid}/tutorials/incompleted`)
      .push().key
    const entry = { ...this.state.tut, tutId: newEntryKey }
    database
      .ref(`/${auth.currentUser.uid}/tutorials/incompleted/${newEntryKey}`)
      .set(entry)
    this.setState({ redirect: true })
  }

  handleChange = e => {
    let target = e.target.name
    let value = e.target.value
    let obj = { ...this.state.tut }
    obj[target] = value
    this.setState({ tut: obj })
  }

  handleDelete = i => {
    let tags = this.state.tut.tags
    let text = this.state.tut.tags.text
    tags.splice(i, 1)
    this.setState({ tags: tags, text: false })
  }

  handleAddition = tag => {
    let tags = this.state.tut.tags
    tags.push({
      id: tags.length + 1,
      text: tag
    })
    this.setState({ tags: tags })
  }

  handleDrag = (tag, currPos, newPos) => {
    let tags = this.state.tut.tags

    // mutate array
    tags.splice(currPos, 1)
    tags.splice(newPos, 0, tag)

    // re-render
    this.setState({ tags: tags })
  }

  handlePriceChange = (price) => {
    const tut = { ...this.state.tut }
    tut.price = price
    this.setState({ tut })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/dashboard'} />
    }
    return (
      <div className="flex flex-wrap justify-center ">
        <form
          className="mh4 mv4 ba b--black-10 ph4 br3"
          onSubmit={this.handleSubmit}
        >
          <article className="center w-100 br3 hidden ba b--black-10 mv4">
            <div className="br3 br--top">
              <h1 className="f4 br3 br--top black-60 mv0 pv2 ph3 truncate">
                <input
                  className="bn outline-0 bg-transparent w-100 input-reset lh-copy"
                  type="text"
                  name="title"
                  placeholder="Title goes here"
                  onChange={this.handleChange}
                  value={this.state.tut.title}
                />
              </h1>
            </div>
            <div className="pa3 bt b--black-10">
              <h2 className="f5 fw4 gray mt0 truncate bg--orange">
                by{' '}
                <input
                  className="bn outline-0 bg-transparent w-100 input-reset"
                  type="text"
                  name="author"
                  placeholder="Author"
                  onChange={this.handleChange}
                  value={this.state.tut.author}
                />
              </h2>

              {/* <textarea
                className="bn outline-0 bg-transparent w-100 input-reset f6 f5-ns lh-copy mw5 mw6-ns"
                style={{ resize: 'none' }}
                cols="70"
                rows="5"
                placeholder="What is this tutorial about?"
                onChange={this.handleChange}
                name="desc"
                >
                {this.state.tut.desc}
              </textarea> */}
              <ReactTags
                tags={this.state.tut.tags}
                suggestions={this.state.suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
              />
            </div>
          </article>

          <label htmlFor="price" className='db'>
            <small>Course URL</small>
            <input
              className="pa2 mb2 input-reset ba bg-transparent w-100 "
              type="url"
              name="link"
              placeholder="Add URL link to tutorial here"
              onChange={this.handleChange}
              value={this.state.tut.link}
            />
          </label>
          <label htmlFor="price" className='db'>
            <small>Price in $ USD </small>
            <input type="number" id='price' value={this.state.tut.price}
              onChange={e => this.handlePriceChange(e.target.value)}
              placeholder="Free"
              className="pa2 mb2 input-reset ba bg-transparent w-100 "
            /></label>
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 mv3"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    )
  }
}


export default Add


