import React from 'react'
import { Link } from 'react-router-dom'
import { auth, database } from '../firebase.js'

const Tutorial = ({ title, description, author, link, tutId }) =>
  <article className="center w-70 br3 ba b--black-10 mv4">

    <a href={link} target="_blank" className="dib link pointer">
      <div className="br3 br--top bg-white w-100">
        <h1 className="f4 br3 br--top black-60 mv0 pv2 ph3 truncate">
          {title}
        </h1>
      </div>
    </a>

    <div className="pa3 bt b--black-10">
      <h2 className="f5 fw4 gray mt0 truncate bg--orange">
        by {author}
      </h2>
      <p className="f6 f5-ns lh-copy measure">
        {description}
      </p>

      <div className="fr">
        <button
          onClick={() =>
            database
              .ref(`/${auth.currentUser.uid}/tutorials/${tutId}`)
              .remove()}
          className="f6 link dim br-pill ph3 pv2 mb2 dib bn white bg-red pointer">
          Delete
        </button>
      </div>

      <div className="fl pr3">
        <Link to={`/edit/${tutId}`} className="black">
          Edit
        </Link>
      </div>

    </div>
  </article>

export default Tutorial
