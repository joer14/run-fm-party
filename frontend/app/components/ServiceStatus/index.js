/**
*
* SpotifyLogin
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import LastFmSetup from '../LastFmSetup';

import {
  Flex,
  Badge,
  Box,
  Text,

  Fixed,
  Modal,
  Lead,
  Input,
  Button
} from 'rebass'


class ServiceStatus extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      settingLastFm: false
    };
  }

  render() {
    let status = {
      text: 'Not Connected',
      color: 'red',
    };

    if(this.props.data && Object.keys(this.props.data).length > 0) {
      status = {
        text:'Connected',
        color: 'green'
      };
    };

    if(this.state.settingLastFm) {
    };

    let onClick = this.props.name === 'Last.fm' ?
      () => this.setState({settingLastFm: true}) : null;

    return (
      <Box>
        <Flex p={1}>
          <Text pr={2}>{this.props.name}</Text>
          <Box mx='auto' />
          <Badge bg={status.color} onClick={onClick}>
            {status.text}
          </Badge>
        </Flex>
        { this.state.settingLastFm && (
          <LastFmSetup
            initialUsername={this.props.data}
            close={()=>this.setState({settingLastFm: false})}/>
        )}
      </Box>
    );
  }
}

ServiceStatus.propTypes = {

};

export default ServiceStatus;
