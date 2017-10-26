/**
*
* Footer
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components'
import {
  Flex,
  Box,
  Button,
} from 'rebass'
import messages from './messages';

function Footer() {

  const CustomButton = styled(Button)`
    background: transparent;
    color: black;
  `
  return (
    <Flex align='center' width={1}>
      <CustomButton href='http://iha.org'>
        <FormattedMessage {...messages.madeby} />
      </CustomButton>
      <Box mx='auto' />
      <CustomButton href='https://travis-ci.org/jxnblk/rebass'>
        <img
          src='https://img.shields.io/travis/jxnblk/rebass/master.svg'
          style={{
            display: 'block',
            margin: 0
          }}
        />
      </CustomButton>
    </Flex>
  );
}

Footer.propTypes = {

};

export default Footer;
