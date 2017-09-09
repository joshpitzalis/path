import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Tutorial from './Tutorial'
import { auth, database } from '../firebase.js'
import Stats from './Stats'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  const result = Object.entries(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export default class Profile extends Component {
  state = {
    tutorials: {}
  }

  componentDidMount() {
    database
      .ref(`/${auth.currentUser.uid}/tutorials`)
      .on('value', snap => this.setState({ tutorials: snap.val() }))
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const allTutorials = reorder(
      this.state.tutorials,
      result.source.index,
      result.destination.index
    )

    const tutorials = allTutorials.reduce(
      (obj, [k, v], i) => ({
        ...obj,
        [k]: Object.assign({ ...v }, { yindex: null })
      }),
      {}
    )

    // database.ref(`/${auth.currentUser.uid}`).set({ tutorials })

    this.setState({
      tutorials
    })
  }

  // onDragEnd = result => {
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return
  //   }
  //
  //   const allTutorials = Object.entries(this.state.tutorials)
  //
  //   const [removed] = allTutorials.splice(result.source.index, 1)
  //   allTutorials.splice(result.destination.index, 0, removed)
  //
  //   const tutorials = allTutorials.reduce(
  //     (obj, [k, v], i) => ({
  //       ...obj,
  //       [k]: Object.assign({ ...v }, { index: i })
  //     }),
  //     {}
  //   )
  //
  //   // console.table(tutorials)
  //
  //   database.ref(`/${auth.currentUser.uid}`).set({ tutorials })
  // }

  render() {
    const tutorials = (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) =>
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {Object.keys(this.state.tutorials)
                .filter(tut => this.state.tutorials[tut].completed === false)
                .sort(
                  (a, b) =>
                    this.state.tutorials[a].index -
                    this.state.tutorials[b].index
                )
                .map(tut =>
                  <Draggable key={tut} draggableId={tut}>
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
                            title={this.state.tutorials[tut].title}
                            description={this.state.tutorials[tut].description}
                            author={this.state.tutorials[tut].author}
                            link={this.state.tutorials[tut].link}
                            tags={this.state.tutorials[tut].tags}
                            tutId={tut}
                            completed={true}
                            completed={this.state.tutorials[tut].completed}
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

    // const activetutorials = Object.keys(this.state.tutorials)
    //   .filter(tut => this.state.tutorials[tut].doing === true)
    //   .map((tut, index) =>
    //     <Tutorial
    //       key={index}
    //       title={this.state.tutorials[tut].title}
    //       description={this.state.tutorials[tut].description}
    //       author={this.state.tutorials[tut].author}
    //       link={this.state.tutorials[tut].link}
    //       tags={this.state.tutorials[tut].tags}
    //       tutId={tut}
    //       completed={this.state.tutorials[tut].completed}
    //     />
    //   )

    const completedTutorials = Object.keys(this.state.tutorials)
      .filter(tut => this.state.tutorials[tut].completed === true)
      .map((tut, index) =>
        <Tutorial
          key={index}
          title={this.state.tutorials[tut].title}
          description={this.state.tutorials[tut].description}
          author={this.state.tutorials[tut].author}
          link={this.state.tutorials[tut].link}
          tags={this.state.tutorials[tut].tags}
          tutId={tut}
          completed={true}
          completed={this.state.tutorials[tut].completed}
        />
      )

    return (
      <div>
        <div className="flex col wrap mw7 center">
          {tutorials}
          {completedTutorials}
        </div>
        <div className="tc">
          <Link
            to="/add"
            className="f6 link dim br-pill ba ph3 pv2 dib bg-cucumber white ma5 center"
          >
            Add A Tutorial
          </Link>
        </div>
        <Stats
          completed={completedTutorials.length}
          total={Object.keys(this.state.tutorials).length}
        />
      </div>
    )
  }
}

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }))

// using some little inline style helpers to make the app look okay
const grid = 8
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
