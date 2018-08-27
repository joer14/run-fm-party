import { take, takeLatest, call, put, select } from 'redux-saga/effects';

import {
  ADD_SERVICE,
  FETCH_ACTIVITIES_START,
  FETCH_ACTIVITIES_STATUS,
  FETCH_ACTIVITIES_COMPLETE,
  LOGIN,
  LOGOUT,
} from '../App/constants';

import {
  gotLoginUrl,
  lastfmSuccess,
  lastfmValdating,
  loginLoaded,
} from '../App/actions';

import {
  selectUser,
} from '../App/selectors';

import request from 'utils/request';


function delay(millis) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), millis)
    });
    return promise;
}

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
  const requestURL = '/api/v1/logout'
  const logoutStatus = yield call(request, requestURL);

}

export function* fetchActivities() {

  console.log('fetching');
  // initiate fetch
  const requestURL = '/api/v1/fetch'
  const fetchInitiated = yield call(request, requestURL);
  // call check status
  yield put({ type: FETCH_ACTIVITIES_STATUS });


}

export function* fetchActivitiesStatus() {
  const requestURL = '/api/v1/fetch-status'
  const fetchStatus = yield call(request, requestURL);
  if (fetchStatus.data.fetching) {
    yield call(delay, 2000);
    yield put({ type: FETCH_ACTIVITIES_STATUS });
  } else {
    yield put({ type: FETCH_ACTIVITIES_COMPLETE });
  }
}

export function* addService(action) {
  const user = yield select(selectUser());
  if(action.service == 'lastfm'){
    yield put(lastfmValdating())

    const requestURL = `/api/v1/lastfm/setup/?username=${action.username}`;
    const setupStatus = yield call(request, requestURL);
    if(setupStatus.data.error){
      // do something
    } else {
      yield put(loginLoaded(setupStatus.data))
      yield put(lastfmSuccess())
    }
  }
}

// Individual exports for testing
export function* defaultSaga() {
   yield takeLatest(LOGIN, login);
   yield takeLatest(LOGOUT, logout);
   yield takeLatest(ADD_SERVICE, addService);
   yield takeLatest(FETCH_ACTIVITIES_START, fetchActivities);
   yield takeLatest(FETCH_ACTIVITIES_STATUS, fetchActivitiesStatus);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
