/**
*
* Footer
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components'
import {
  Flex,
  Box,
  Text,
} from 'rebass'
import messages from './messages';

import poweredByStrava from './powered_by_strava.png';

function Footer() {
  return (
    <Flex align='center' width={1} justify='space-between' style={{'cursor':'crosshair'}}>
      <Box w={1/3} px={2}>
    		<Text p={1} onClick={()=>{window.open('http://joerowley.net','_blank')}}>
          <FormattedMessage {...messages.madeby} />
    		</Text>
    	</Box>
    	<Box w={1/3} px={2}>
        <Flex width={1} justify='center' >
          <a href='https://strava.com' target='_blank'>
            <img height='34' href='https://strava.com' src={poweredByStrava}/>
          </a>
        </Flex>
    	</Box>
      <Box w={1/3} px={2}>
      </Box>
    </Flex>
  );
}

Footer.propTypes = {

};

export default Footer;
