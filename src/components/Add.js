import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { graphql, gql, compose } from 'react-apollo'
import { GC_USER_ID } from '../constants'
import { getUsername } from '../queries/user.js'
import { WithContext as ReactTags } from 'react-tag-input'

class Add extends Component {
  state = {
    tut: {
      title: undefined,
      author: undefined,
      link: undefined,
      tags: [],
      uid: this.props.uid
    },
    redirect: false
  }

  handleSubmit = async e => {
    e.preventDefault()
    const postedById = localStorage.getItem(GC_USER_ID)
    if (!postedById) {
      console.error('No User logged in')
      return
    }
    const { author, link, title, tags } = this.state.tut
    await this.props.createTutorialMutation({
      variables: {
        author,
        link,
        title,
        tags,
        completed: false,
        postedById
      }
    })
    this.setState({ redirect: true })
  }

  handleChange = e => {
    let target = e.target.name
    let value = e.target.value
    let obj = { ...this.state.tut }
    obj[target] = value
    this.setState({ tut: obj })
  }

  handleTagDelete = i => {
    let tut = this.state.tut
    tut.tags.splice(i, 1)
    this.setState({ tut })
  }

  handleTagAddition = tag => {
    let tut = this.state.tut
    tut.tags.push({
      id: tut.tags.length + 1,
      text: tag[0] === '#' ? tag.toLowerCase() : `#${tag.toLowerCase()}`
    })
    this.setState({ tut })
  }

  handleTagDrag = (tag, currPos, newPos) => {
    let tut = this.state.tut
    tut.tags.splice(currPos, 1)
    tut.tags.splice(newPos, 0, tag)
    this.setState({ tut })
  }

  render() {
    if (this.state.redirect && this.props.data.user) {
      return <Redirect to={`/${this.props.data.user.name}`} />
    }
    return (
      <div className="flex flex-wrap justify-center pt5">
        <form
          className="mh4 mv4 ba b--black-10 ph4 br3"
          onSubmit={this.handleSubmit}
          data-test="addForm"
        >
          <article className="center w-100 br3 hidden ba b--black-10 mv4">
            <div className="br3 br--top">
              <h1 className="f4 br3 br--top black-60 mv0 pv2 ph3 truncate">
                <input
                  className="bn outline-0 bg-transparent w-100 input-reset lh-copy"
                  type="text"
                  name="title"
                  data-test="title"
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
                  data-test="author"
                  placeholder="Author"
                  onChange={this.handleChange}
                  value={this.state.tut.author}
                />
              </h2>

              <ReactTags
                tags={this.state.tut.tags}
                handleDelete={this.handleTagDelete}
                handleAddition={this.handleTagAddition}
                handleDrag={this.handleTagDrag}
              />
            </div>
          </article>

          <p>
            <input
              className="pa2 mb2 input-reset ba bg-transparent w-100 "
              type="url"
              name="link"
              data-test="link"
              placeholder="Add URL link to tutorial here"
              onChange={this.handleChange}
              value={this.state.tut.link}
            />
          </p>

          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 mb3"
            type="submit"
            value="Submit"
            data-test="submitTutorial"
          />
        </form>
      </div>
    )
  }
}

const CREATE_TUTORIAL_MUTATION = gql`
  mutation CreateTutorialMutation(
    $author: String
    $link: String
    $title: String!
    $tags: ???
    $postedById: ID!
    $completed: Boolean!
  ) {
    createTutorial(
      author: $author
      link: $link
      title: $title
      postedById: $postedById
      completed: $completed
      tags: $tags
    ) {
      author
      link
      title
      tags
      postedBy {
        id
        name
      }
      completed
    }
  }
`

export default compose(
  graphql(getUsername),
  graphql(CREATE_TUTORIAL_MUTATION, {
    name: 'createTutorialMutation'
  })
)(Add)
