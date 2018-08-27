/**
*
* FetchActivities
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


class FetchActivities extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box>
        <Flex p={1}>
          <Text pr={2}>Activies Found: {this.props.activityCount}</Text>
          <Text pr={2}>0</Text>
        </Flex>
        <Button
          bg='red'
          children={messages.button}
          lineHeight={1}
          onClick={this.props.fetch}/>
      </Box>
    );
  }
}

FetchActivities.propTypes = {

};

export default FetchActivities;
