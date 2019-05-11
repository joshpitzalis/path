import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { Stats } from "../features/courseList/components/Stats";
import Tutorial from '../features/courseList/components/Tutorial';
import { getItemStyle, getListStyle, reorder } from "../features/courseList/listHelpers";
import { auth, database } from '../firebase.js';

export default class Dashboard extends Component {
  state = {
    items: null,
    completed: null
  }

  componentWillMount() {
    // stream of incomplete courses
    database
      .ref(`/${auth.currentUser.uid}/tutorials/incompleted`)
      .on('value', snap => this.setState({ items: Object.values(snap.val()) }))

      // stream of complete courses
    database
      .ref(`/${auth.currentUser.uid}/tutorials/completed`)
      .on('value', snap =>
        this.setState({ completed: Object.values(snap.val()) })
      )
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    const incompletetutorials = items
      .filter(item => item.completed !== true)
      .reduce(
        (total, amount, i) => ({
          ...total,
          [i]: Object.assign({ ...amount }, { index: i })
        }),
        {}
      )

    // write the new arrangement of complete courses to db on unmount
    database
      .ref(`/${auth.currentUser.uid}/tutorials/incompleted`)
      .set(incompletetutorials)
  }
 
 
  render() {
    return (
      <div>
        <Stats
          completed={ this.state.completed &&  this.state.completed.length}
          total={this.state.items && Object.keys(this.state.items).length}
        />
        <div className="flex col wrap mw7 center">
          <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) =>
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items &&
                this.state.items
                  .filter(item => item.completed !== true)
                  .map(item =>
                    <Draggable key={item.index} draggableId={item.index}>
                      {(provided, snapshot) =>
                        <div>
                          <div
                            ref={provided.innerRef}
                            style={getItemStyle(
                              provided.draggableStyle,
                              snapshot.isDragging
                            )}
                            {...provided.dragHandleProps}
                          >
                            <Tutorial
                              title={item.title}
                              description={item.description}
                              author={item.author}
                              link={item.link}
                              tags={item.tags}
                              tutId={item.tutId}
                              completed={item.completed}
                            />
                          </div>
                          {provided.placeholder}
                        </div>}
                    </Draggable>
                  )}
            </div>}
        </Droppable>
      </DragDropContext>
        </div>
        <div className="tc">
          <Link
            to="/add"
            className="f6 link dim br-pill ba ph3 pv2 dib bg-cucumber white ma5 center"
          >
            Add A Tutorial
          </Link>
        </div>
        <div className="flex col wrap mw7 center">
          { this.state.completed &&
      this.state.completed
        .filter(item => item.completed === true)
        .map((item, index) =>
          <Tutorial
            key={index}
            title={item.title}
            description={item.description}
            author={item.author}
            link={item.link}
            tags={item.tags}
            tutId={item.tutId}
            completed={item.completed}
          />
        )}
        </div>
        
      </div>
    )
  }
}
