import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { database } from '../firebase.js'
import { Redirect } from 'react-router-dom'

export default class Add extends Component {
  state = {
    tut: {
      title: null,
      author: null,
      desc: null,
      link: null,
      uid: this.props.uid
    },
    redirect: false
  }

  handleSubmit = e => {
    e.preventDefault()
    database.ref('/tutorials').push({ ...this.state.tut })
    this.setState({ redirect: true })
  }

  handleChange = e => {
    let target = e.target.name
    let value = e.target.value
    let obj = { ...this.state.tut }
    obj[target] = value
    this.setState({ tut: obj })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/profile'} />
    }
    return (
      <div className="flex flex-wrap justify-center ">
        <form
          className="mh4 mv4  ba b--black-10 ph4 br3"
          onSubmit={this.handleSubmit}>
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

              <textarea
                className="bn outline-0 bg-transparent w-100 input-reset f6 f5-ns lh-copy mw5 mw6-ns"
                style={{ resize: 'none' }}
                cols="70"
                rows="5"
                placeholder="What is this tutorial about?"
                onChange={this.handleChange}
                name="desc">
                {this.state.tut.desc}
              </textarea>

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
