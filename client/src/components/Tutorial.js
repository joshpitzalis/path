import React from 'react'
import { Link } from 'react-router-dom'

const Tutorial = ({ title, description, author, link, tutId }) =>
  <article className="center w-70 br3 ba b--black-10 mv4">
    <div className="br3 br--top bg-white w-100">
      <a href={link} target="_blank" className="dib link">
        <h1 className="f4 br3 br--top black-60 mv0 pv2 ph3 truncate">
          {title}
        </h1>
      </a>
      {/* {this.props.user.user_metadata[this.props.tut._id] &&
          <label className="switch dib fr ma1">
            <input
          type="checkbox"
          onChange={evt => this.props.handleHelp(evt, this.props.tut._id)}
          checked={this.props.tut.stuck}
            />
            <div className="slider round" />
        </label>} */}
    </div>

    <div className="pa3 bt b--black-10">
      <h2 className="f5 fw4 gray mt0 truncate bg--orange">
        by {author}
      </h2>
      <p className="f6 f5-ns lh-copy measure">
        {description}
      </p>
      {/* <p>
          Status:{this.props.user.user_metadata[`${this.props.tut._id}`]
            ? 'Currently Doing'
            : 'To Do'}
        </p> */}
      <div className="fr">
        <button>
          {/* onClick={() => this.props.handleDelete(this.props.tut._id)} */}
          Delete
        </button>
      </div>

      <div className="fr pr3">
        <Link to={`/edit/${tutId}`}>
          {/* to={{
                pathname: '/edit',
              state: JSON.stringify(tut)
            }} */}
          Edit
        </Link>
      </div>
      <label className="pa0 ma0 lh-copy f6 pointer">
        <input
          checked={true}
          // {this.props.user.user_metadata[`${this.props.tut._id}`]}
          // onChange={evt => this.props.handleStatusChange(evt, this.props.tut._id)}
          type="checkbox"
          className="mr2"
        />
        Mark as To Do
        {/* {this.props.user.user_metadata[`${this.props.tut._id}`]
            ? 'To Do'
          : 'Currently Doing'} */}
      </label>
    </div>
  </article>

export default Tutorial
