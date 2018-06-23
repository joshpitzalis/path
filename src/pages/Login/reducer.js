import { login } from './actions';

export const user = (state = { auth: false }, action) => {
  if (action.type === 'LOGGED_IN') {
    return { ...state, auth: true, user: action.payload };
  }
  return state;
};
