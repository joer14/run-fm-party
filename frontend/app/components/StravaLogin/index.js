/**
*
* StravaLogin
*
*/

import React from 'react';
// import styled from 'styled-components';


// import {
//   selectUser,
//   selectLoginUrl,
//   selectLoginStatus,
// } from '../../App/selectors';


import { FormattedMessage } from 'react-intl';
import messages from './messages';

import connectWithStrava from './connect_with_strava2x.png';

class StravaLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <img src={connectWithStrava} width={200+'px'}/>
      </div>
    );
  }
}

StravaLogin.propTypes = {

};

export default StravaLogin;
