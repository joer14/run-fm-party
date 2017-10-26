
import { fromJS } from 'immutable';
import homePage2Reducer from '../reducer';

describe('homePage2Reducer', () => {
  it('returns the initial state', () => {
    expect(homePage2Reducer(undefined, {})).toEqual(fromJS({}));
  });
});
