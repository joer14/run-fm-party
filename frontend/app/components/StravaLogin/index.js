/**
*
* StravaLogin
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectUser,
  selectLoginUrl,
  selectLoginStatus,
} from '../../containers/App/selectors';

import messages from './messages';

import connectWithStrava from './connect_with_strava2x.png';

class StravaLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  goToStravaSignUp = () => {
    window.location.href = this.props.loginUrl;
  }
  render() {
    return (
      <div onClick={this.goToStravaSignUp} >
        <img src={connectWithStrava} width={200+'px'}/>
      </div>
    );
  }
}

StravaLogin.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  loginUrl: selectLoginUrl(),
});

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin: () => dispatch(login()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StravaLogin);
