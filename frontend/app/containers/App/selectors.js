// makeSelectLocationState expects a plain JS object for the routing state
import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('user')
);

const selectLoginUrl = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loginUrl')
);

const selectLoginStatus = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loggingIn')
);

const selectLastFMValid = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('lastfmValid')
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  makeSelectLocationState,
  selectGlobal,
  selectLastFMValid,
  selectLoginStatus,
  selectLoginUrl,
  selectUser,
};
