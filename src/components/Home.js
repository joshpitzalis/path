import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <header className="sans-serif">
        <div className="cover bg-left bg-center-l hero">
          <div className="bg-black-80 pb5 pb6-m pb7-l">
            <div className="tc-l pt4 pt5-m pt6-l ph3">
              <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">
                Create Your Own Learning Path
              </h1>
              <h2 className="fw1 f3 white-80 mt3 mb4">
                Keep track of all the tutorials you want to do and organise them
                into a clear Learning Path.
              </h2>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
