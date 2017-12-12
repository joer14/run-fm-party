/**
*
* SpotifyLogin
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import spotifyLogo from './spotify_logo.png';

import {
  ButtonOutline,
} from 'rebass'

class SpotifyLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ButtonOutline p={1}>
        {/*<FormattedMessage {...messages.header} />*/}
        <img src={spotifyLogo} width={180+'px'}/>
      </ButtonOutline>
    );
  }
}

SpotifyLogin.propTypes = {

};

export default SpotifyLogin;
