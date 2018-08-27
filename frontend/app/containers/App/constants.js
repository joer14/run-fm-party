/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';

export const ADD_SERVICE = 'APP/ADD_SERVICE';
export const FETCH_ACTIVITIES_COMPLETE = 'APP/FETCH_ACTIVITIES_COMPLETE';
export const FETCH_ACTIVITIES_START = 'APP/FETCH_ACTIVITIES_START';
export const FETCH_ACTIVITIES_STATUS = 'APP/FETCH_ACTIVITIES_STATUS';
export const GOT_LOGIN_URL = 'APP/GOT_LOGIN_URL';
export const LAST_FM_SUCCESS_SETUP = 'APP/LAST_FM_SUCCESS_SETUP';
export const LAST_FM_VALIDATING= 'APP/LAST_FM_VALIDATING';
export const LOGIN = 'APP/LOGIN';
export const LOGIN_LOADED = 'APP/LOGIN_LOADED';
export const LOGOUT = 'APP/LOGOUT';
