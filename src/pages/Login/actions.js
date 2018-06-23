import { auth, googleAuthProvider } from '../../firebase.js';

// export const doLogin = payload => ({
//   type: 'LOGGED_IN',
//   payload
// });

export const doLogin = () => dispatch =>
  auth
    .signInWithPopup(googleAuthProvider)
    .then(user =>
      dispatch({
        type: 'LOGGED_IN',
        payload: user
      })
    )
    .catch(error => console.log(error));
