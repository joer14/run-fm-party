import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage2 state domain
 */
const selectHomePageDomain = () => (state) => state.get('homePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectHomePage;
export {
  selectHomePageDomain,
};
