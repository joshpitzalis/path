import { takeLatest } from 'redux-saga/effects';

import { loginSaga } from './pages/Login/saga';

export default function* rootSaga() {
  yield takeLatest('AUTHENTICATED', loginSaga);
}
