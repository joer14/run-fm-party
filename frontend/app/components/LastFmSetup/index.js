/**
*
* LastFmSetup
*
*/

import React from 'react';
// import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import { addService } from '../../containers/App/actions';

import { selectLastFMValid } from '../../containers/App/selectors';

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


class LastFmSetup extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.initialUsername
    };
  }

  componentDidUpdate(prevProps, preState, snapshot) {
    if(prevProps.lastFMValid !== this.props.lastFMValid && this.props.lastFMValid) {
      this.props.close();
    }
    if(prevProps.lastFMValid && this.props.lastFMValid && this.state.username === this.props.initialUsername) {
      this.props.close();
    }
  }

  onUserNameChange = (e) => {
    this.setState({username:e.target.value});
  }

  render() {
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
          <Flex pt={3}>
            <Text width={1/2}> Last.fm Username: </Text>
            <Box mx='auto' />
            <Input
              value={this.state.username}
              onChange={this.onUserNameChange}
              width={1/2}
            />
          </Flex>
          <Flex pt={4}>
            <Button
              children='Cancel'
              bg='red'
              onClick={this.props.close}/>
            <Box mx='auto' />
            <Button
              children='Save'
              onClick={() => this.props.save(this.state.username)}/>
          </Flex>
        </Modal>
      </div>
    )
  }
}

LastFmSetup.propTypes = {

};


const mapStateToProps = createStructuredSelector({
  lastFMValid: selectLastFMValid(),
});

function mapDispatchToProps(dispatch) {
  return {
    save: (username) => dispatch(addService('lastfm', username)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LastFmSetup);
