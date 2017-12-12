/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Provider } from 'rebass'
import { Heading, Subhead, Button, Flex, Box, Lead, Container, NavLink, Toolbar } from 'rebass'
import Footer from 'components/Footer'


import { login } from './actions';
import { selectUser } from './selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };
  componentDidMount(){
    this.props.attemptLogin();
  }
  render() {
    const theme = {

      fontSizes: [
        12, 16, 18, 24, 36, 48, 72
      ],
      weights: [
        400, 600
      ],
      // colors: {
      //   black: '#111',
      //   white: '#fff',
      //   blue: '#07c'
      // },
      fontFamily: 'SF Mono, Menlo, monospace',
      monospace: 'SF Mono, Menlo, monospace',
      // radius: 2
    }

    const sx = {
      root: {
        position: 'relative'
      },
      // top: {
      //   minHeight: '70vh',
      //   display: 'flex',
      //   alignItems: 'center',
      // },
      // preview: {
      //   width: '100%'
      // },
      // controls: {
      //   color: 'magenta',
      //   backgroundColor: '#000',
      //   WebkitFontSmoothing: 'antialiased'
      // },
      // bottom: {
      //   minHeight: '40vh',
      //   fontFamily: 'SF Mono, Menlo, monospace',
      //   fontSize: 12,
      //   margin: 0,
      //   padding: 16,
      //   overflow: 'auto',
      //   color: 'cyan',
      //   backgroundColor: '#000',
      //   outline: 'none',
      //   WebkitFontSmoothing: 'antialiased'
      // },
      // error: {
      //   fontFamily: 'SF Mono, Menlo, monospace',
      //   fontSize: 12,
      //   position: 'fixed',
      //   zIndex: 1,
      //   top: 0,
      //   right: 0,
      //   left: 0,
      //   padding: 16,
      //   color: '#fff',
      //   backgroundColor: '#f00'
      // },
      // xray: {
      //   transition: 'background-color .3s ease-out'
      // }
    }
    return (
      <div>
        <Provider theme={theme}>
          <div style={sx.root}>
            <Flex wrap>
              <Toolbar width={1}>
                <NavLink href='/'>
                  Home
                </NavLink>
                <NavLink href='/about'>
                  About
                </NavLink>
                <NavLink ml='auto' href='https://github.com/joer14/run-fm-party'>
                  Code
                </NavLink>
              </Toolbar>
              {React.Children.map(this.props.children, (child) => React.cloneElement(child, {
                 user: this.props.user
               }))
              }
              <Footer/>
            </Flex>
          </div>
        </Provider>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin: () => dispatch(login()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
