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


// let spStatus = (
//   <Flex align='center'>
//     <Button
//       onClick={this.goToSpotifyLogin}
//       children='Connect to SP'
//     />
//   </Flex>
// )
// let lfStatus = (
//   <Flex align='center'>
//     <Button
//       onClick={this.openLastFmBox}
//       children='Connect to Last FM'
//     />
//   </Flex>
// )
// if (this.props.user.spotify.profile){
//   spStatus = (<p>Successfully Connected to SP</p>)
// }
// if (this.props.user.lastfm.profile){
//   lfStatus = (<p>Successfully Connected to LF</p>)
// }
// if (this.state.edit_last_fm){
//   lfStatus = (
//     <Flex align='center'>
//       <span>Enter your Last.Fm User Name</span>
//       <input placeholder=''/>
//       <Button
//         onClick={this.openLastFmBox}
//         children='Connect to Last FM'
//       />
//     </Flex>
//   )
// }

// <Flex align='center'>
//   <Button
//     onClick={this.props.logout}
//     children='Logout'
//   />
//   <Box mx={1} />
//   {spStatus}
//   <Box mx={1} />
//   {lfStatus}
// </Flex>

class ServiceStatus extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      settingLastFm: false
    };
  }

  render() {
    console.log('hiii', this.props, this.state)
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
            close={()=>this.setState({settingLastFm: false})}/>
        )}
      </Box>
    );
  }
}

ServiceStatus.propTypes = {

};

export default ServiceStatus;
