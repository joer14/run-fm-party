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
  LOGIN,
  LOGIN_LOADED,
  LOGOUT,
  GOT_LOGIN_URL,
  // LOAD_REPOS_SUCCESS,
  // LOAD_REPOS,
  // LOAD_REPOS_ERROR,
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
      console.log('got login url', action)
      return state
        .set('loggingIn', false)
        .set('loginUrl', action.url);


    // case LOAD_REPOS:
    //   return state
    //     .set('loading', true)
    //     .set('error', false)
    //     .setIn(['userData', 'repositories'], false);
    // case LOAD_REPOS_SUCCESS:
    //   return state
    //     .setIn(['userData', 'repositories'], action.repos)
    //     .set('loading', false)
    //     .set('currentUser', action.username);
    // case LOAD_REPOS_ERROR:
    //   return state
    //     .set('error', action.error)
    //     .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
