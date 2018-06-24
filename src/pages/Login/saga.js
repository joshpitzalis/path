import { call, put } from 'redux-saga/effects';
import { auth, googleAuthProvider } from '../../firebase.js';

import { doLogin } from './actions';

let api = provider => auth.signInWithPopup(provider).then(user => user);

export function* loginSaga(action) {
  try {
    const user = yield call(api, googleAuthProvider);
    yield put(doLogin(user.user));
  } catch (error) {
    console.log('errorx', error);
  }
}
