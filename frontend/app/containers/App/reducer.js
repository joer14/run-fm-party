/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  GOT_LOGIN_URL,
  LAST_FM_SUCCESS_SETUP,
  LAST_FM_VALIDATING,
  LOGIN_LOADED,
  LOGIN,
  LOGOUT,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loggingIn: false,
  user: null,
  // loading: false,
  // error: false,
  // currentUser: false,
  // userData: {
  //   repositories: false,
  // },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state
        .set('loggingIn', true);

    case LOGOUT:
      return state
        .set('loggingIn', false)
        .set('user', null);

    case LOGIN_LOADED:
      return state
        .set('loggingIn', false)
        .set('user', action.user);

    case GOT_LOGIN_URL:
      return state
        .set('loggingIn', false)
        .set('loginUrl', action.url);

    case LAST_FM_SUCCESS_SETUP:
      return state
        .set('lastfmValid', true);

    case LAST_FM_VALIDATING:
      return state
        .set('lastfmValid', false);

    default:
      return state;
  }
}

export default appReducer;
