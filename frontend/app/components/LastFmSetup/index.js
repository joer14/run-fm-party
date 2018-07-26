/**
*
* LastFmSetup
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  Box,
  Button,
  Fixed,
  Flex,
  Input,
  Lead,
  Modal,
  Text,
} from 'rebass'

class LastFmSetup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log('this here', this)
    return (
      <div>
        <Fixed
          top={0}
          right={0}
          bottom={0}
          left={0}
        />
        <Modal width={256}>
          <Lead>Last.fm Settings:</Lead>
          <Flex pt={2}>
            <Text width={1/2}> Last.fm Username: </Text>
            <Box mx='auto' />
            <Input width={1/2}/>
          </Flex>
          <Flex pt={2}>
            <Box mx='auto' />
            <Button
              children='Save'
              onClick={this.props.close}/>
          </Flex>
        </Modal>
      </div>
    )
  }
}

LastFmSetup.propTypes = {

};

export default LastFmSetup;
