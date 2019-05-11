import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Stats } from "../features/courseList/components/Stats";
import Tutorial from '../features/courseList/components/Tutorial';
import { auth, database } from '../firebase.js';

export default class Tags extends Component {
  state = {
    incompleteTutorials: [],
    completeTutorials: []
  }

  componentDidMount() {
    database
      .ref(`/${auth.currentUser.uid}/tutorials/incompleted`)
      .on('value', snap => this.setState({ incompleteTutorials: snap.val() }))


      database
      .ref(`/${auth.currentUser.uid}/tutorials/completed`)
      .on('value', snap => this.setState({ completeTutorials: snap.val() }))


  }

  render() {
    
    const tutorials = this.state.incompleteTutorials && Object.keys(this.state.incompleteTutorials)
      .filter(tut => 
         this.state.incompleteTutorials[tut] && this.state.incompleteTutorials[tut].tags && this.state.incompleteTutorials[tut].tags.some(item => item.text === this.props.match.params.tag)
        ).map((tut, index) =>
        <Tutorial
          key={index}
          title={this.state.incompleteTutorials[tut].title}
          description={this.state.incompleteTutorials[tut].description}
          author={this.state.incompleteTutorials[tut].author}
          link={this.state.incompleteTutorials[tut].link}
          tags={this.state.incompleteTutorials[tut].tags}
          tutId={this.state.incompleteTutorials[tut].tutId}
          status='incompleted'
          completed={this.state.incompleteTutorials[tut].completed}
        />
      )

    const completedTutorials = this.state.completeTutorials && Object.keys(this.state.completeTutorials)
    .filter(tut => 
      this.state.completeTutorials[tut] && this.state.completeTutorials[tut].tags && this.state.completeTutorials[tut].tags.some(item => item.text === this.props.match.params.tag)
     ).map((tut, index) =>
        <Tutorial
          key={index}
          title={this.state.completeTutorials[tut].title}
          description={this.state.completeTutorials[tut].description}
          author={this.state.completeTutorials[tut].author}
          link={this.state.completeTutorials[tut].link}
          tags={this.state.completeTutorials[tut].tags}
          tutId={this.state.completeTutorials[tut].tutId}
          status='completed'
          completed={this.state.completeTutorials[tut].completed}
        />
      )

    return (
      <div>
        <Stats completed={completedTutorials.length} total={tutorials.length} />
        <div className="flex col wrap mw7 center">
          {tutorials}
          {completedTutorials}
        </div>
        <div className="tc">
          <Link
            to="/dashboard"
            className="f6 link dim br-pill ba ph3 pv2 dib bg-cucumber white ma5 center ttu"
          >
            Back To Tutorials
          </Link>
        </div>
      </div>
    )
  }
}
