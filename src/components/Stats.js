import React from 'react'
import PropTypes from 'prop-types'

const Stats = ({ total, completed }) =>
  <div className="bb bw1 b--black-10">
    <article className="pa3 pa5-ns" data-name="slab-stat-large">
      <h3 className="f6 ttu tracked">
        {Number.isFinite(Math.floor(total / completed))
          ? Math.floor(total / completed)
          : 0}% completed
      </h3>
      <div className="cf">
        <dl className="db dib-l w-auto-l lh-title mr6-l">
          <dd className="f6 fw4 ml0">Total</dd>
          <dd className="f2 f-subheadline-l fw6 ml0">
            {total}
          </dd>
        </dl>
        <dl className="db dib-l w-auto-l lh-title mr6-l">
          <dd className="f6 fw4 ml0">Completed</dd>
          <dd className="f2 f-subheadline-l fw6 ml0">
            {completed}
          </dd>
        </dl>
      </div>
    </article>
  </div>

Stats.propTypes = {
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired
}

export default Stats
