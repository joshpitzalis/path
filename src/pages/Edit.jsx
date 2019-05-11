import React from 'react';
import { Redirect } from 'react-router-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import { auth, database } from '../firebase.js';

export default class Edit extends React.Component {
  state = {
    tut: {},
    redirect: null,
    suggestions: []
  }

  async componentDidMount() {

    database
              .ref(`/${auth.currentUser.uid}/tutorials/${this.props.match.params.status}`)
              .orderByChild('tutId')
              .equalTo(this.props.match.params.tutId)
              .once('value')
              .then(x =>  Object.keys(x.val()))
              .then(index =>
                database
                  .ref(`/${auth.currentUser.uid}/tutorials/${this.props.match.params.status}/${index}`)
                  .once('value')
                  .then(snap => console.log('snap.val()', snap.val()) || this.setState({ tut: snap.val() }))
                )


              

    const suggestions = await database
      .ref(`/tags`)
      .once('value')
      .then(snap => snap.val())

    this.setState({ suggestions: Object.keys(suggestions) })

    // if (!this.state.tags) {
    //   const tut = this.state.tut
    //   tut.tags = []
    //   this.setState({ tut })
    // }

  }

  

  handleSubmit = e => {
    e.preventDefault()

    database
              .ref(`/${auth.currentUser.uid}/tutorials/${this.props.match.params.status}`)
              .orderByChild('tutId')
              .equalTo(this.props.match.params.tutId)
              .once('value')
              .then(x =>  Object.keys(x.val()))
              .then(index =>
                database
              .ref(`/${auth.currentUser.uid}/tutorials/${this.props.match.params.status}/${index}`)
              .update({ ...this.state.tut })
              .then(() =>  this.setState({ redirect: true }))
              )


   
   
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
    let tut = this.state.tut
    const tag = tags[i].text
    tut[tag] = false
    this.setState()
    tags.splice(i, 1)
    this.setState({ tags: tags })
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

  render() {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div className="flex flex-wrap justify-center ">
        <form
          onSubmit={this.handleSubmit}
          className="mh4 mv4  ba b--black-10 ph4 br3"
        >
          <article className="center w-100 br3 hidden ba b--black-10 mv4">
            <div className="br3 br--top">
              <h1 className="f4 br3 br--top black-60 mv0 pv2 ph3 truncate">
                <input
                  className="bn outline-0 bg-transparent w-100 input-reset lh-copy"
                  type="text"
                  name="title"
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
                  onChange={this.handleChange}
                  value={this.state.tut.author}
                />
              </h2>
              {/* <textarea
                className="bn outline-0 bg-transparent w-100 input-reset f6 f5-ns lh-copy mw5 mw6-ns"
                style={{ resize: 'none' }}
                cols="70"
                rows="5"
                onChange={this.handleChange}
                name="desc"
                value={this.state.tut.description}
              /> */}
              <ReactTags
                tags={this.state.tut.tags || []}
                suggestions={this.state.suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
              />
            </div>
          </article>
          <p>
            <input
              className="pa2 mb2 input-reset ba bg-transparent w-100 "
              type="url"
              name="link"
              placeholder="Add URL link to tutorial here"
              onChange={this.handleChange}
              value={this.state.tut.link}
            />
          </p>
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 mb3"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    )
  }
}
