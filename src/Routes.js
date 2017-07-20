import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Nav from './components/Nav.js'
import Home from './components/Home'
import Path from './components/Path'
import Edit from './components/Edit'
import Add from './components/Add'
import Account from './components/Account'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Nav} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/edit/:tutId" component={Edit} />
            <Route path="/add" component={Add} />
            <Route path="/account" component={Account} />
            <Route path="/:username" component={Path} />
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
