import { database } from '../../firebase';


// a little function to help us with reordering the result
const grid = 8;
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // padding: grid * 2,
  // marginBottom: grid,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});


export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  paddingLeft: grid,
  paddingRight: grid,
  width: '100%',
});


export const calculateMoneyWasted = uid => database
  .ref(`/${uid}/tutorials/incompleted`)
  .orderByChild('price')
  .startAt('0')
  .once('value')
  .then(snap => snap.val())
  .then(objects => Object.values(objects))
  .then(array => array.map(item => Number(item.price)))
  .then(prices => prices.reduce((a, b) => a + b, 0));
