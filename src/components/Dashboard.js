import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { auth, database } from '../firebase.js'
import { Link } from 'react-router-dom'
import Tutorial from './Tutorial'
import Stats from './Stats'

// a little function to help us with reordering the result
const grid = 8
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // padding: grid * 2,
  // marginBottom: grid,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle
})
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  paddingLeft: grid,
  paddingRight: grid,
  width: '100%'
})

export default class Dashboard extends Component {
  state = {
    items: null,
    completed: null
  }

  componentWillMount() {
    database
      .ref(`/${auth.currentUser.uid}/tutorials/incompleted`)
      .on('value', snap => this.setState({ items: Object.values(snap.val()) }))
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

    this.setState({
      items
    })
  }

  componentWillUnmount() {
    const completedtutorials = this.state.completed
      .filter(item => item.completed === true)
      .reduce(
        (total, amount, i) => ({
          ...total,
          [i]: Object.assign({ ...amount }, { index: i })
        }),
        {}
      )
    database
      .ref(`/${auth.currentUser.uid}/tutorials/completed`)
      .set(completedtutorials)

    const incompletetutorials = this.state.items
      .filter(item => item.completed !== true)
      .reduce(
        (total, amount, i) => ({
          ...total,
          [i]: Object.assign({ ...amount }, { index: i })
        }),
        {}
      )
    database
      .ref(`/${auth.currentUser.uid}/tutorials/incompleted`)
      .set(incompletetutorials)
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const completedTutorials =
      this.state.completed &&
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
        )
    const tutorials = (
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
    )
    return (
      <div>
        <div className="flex col wrap mw7 center">
          {tutorials}
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
          {completedTutorials}
        </div>
        {/* <Stats
          completed={completedTutorials && completedTutorials.length}
          total={this.state.items && Object.keys(this.state.items).length}
        /> */}
      </div>
    )
  }
}
