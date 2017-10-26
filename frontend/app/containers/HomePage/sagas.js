import { take, takeLatest, call, put, select } from 'redux-saga/effects';

import {
  LOGIN,
  LOGOUT,
  ADD_SERVICE,
} from '../App/constants';

import {
  loginLoaded,
  gotLoginUrl
} from '../App/actions';

import {
  selectUser,
} from '../App/selectors';

import request from 'utils/request';

export function* login() {
  const requestURL = '/api/v1/login'
  try {
    const loginStatus = yield call(request, requestURL);
    // if not logged in, save the login url so the user can use it later.
    if(loginStatus.data.url){
      yield put(gotLoginUrl(loginStatus.data.url))
    }else{
      yield put(loginLoaded(loginStatus.data))
    }
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

export function* logout() {
  // we clear the stored user information in the store,
  // so the only other thing we could do is clear cookies using js
  // or maybe do a request to backend to clear the cookie/log the session out.
  console.log('time to logout!')
  const requestURL = '/api/v1/logout'
  const logoutStatus = yield call(request, requestURL);

}

export function* addService(action) {
  console.log('time to add a service', action)
  const user = yield select(selectUser());
  console.log('user now', user)
  if(action.service == 'lf'){
    console.log('do stuff for lf')
  }
  if(action.service == 'sp'){
    const loginUrl = user.spotify.login_url
    console.log('do something else for sp', loginUrl);

  }
}
// Individual exports for testing
export function* defaultSaga() {
   yield takeLatest(LOGIN, login);
   yield takeLatest(LOGOUT, logout);
   yield takeLatest(ADD_SERVICE, addService);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
