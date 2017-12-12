/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectHomePage from './selectors';
import messages from './messages';

import {
  Avatar,
  Heading,
  Subhead,
  Button,
  Link,
  Flex,
  Box,
  Lead,
  Container,
  NavLink,
  Toolbar,
  Divider
} from 'rebass'

import request from 'utils/request';

import { login, logout, addService } from '../App/actions';
import {
  selectUser,
  selectLoginUrl,
  selectLoginStatus,
} from '../App/selectors';

import StravaLogin from 'components/StravaLogin';
import SpotifyLogin from 'components/SpotifyLogin';


export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {};
  }
  // get the redirect url from the backend, and direct the user to that link.
  goToStravaSignUp = () => {
    window.location.href = this.props.loginUrl;
  }
  goToSpotifyLogin = () => {
    window.location.href = this.props.user.spotify.login_url;
  }
  openLastFmBox = () => {
    this.setState({'edit_last_fm':true});
    // window.location.href = this.props.user.lastfm.login_url;
  }
  dumpActivities = () => {
    // let stravaUrl = request('/api/v1/strava/gen_url')
    //   .then((x)=>{
    //     window.location.href = x.data.url;
    // })
    // window.location.href = '/api/v1/strava/gen_url'
  }
  loadActivities = () => {
    // console.log('loading activities')
    let stravaUrl = request('/api/v1/load_activities/')
      .then((x)=>{

    })
  }
  render() {
    let loggedOutView = (
      <Flex align='center'>
        <Button
          onClick={this.goToStravaSignUp}
          children='Login'
        />
        <Box mx={1} />
      </Flex>
    )

    let view = loggedOutView;
    if (this.props.loggingIn){
      view = (
        <div>
          Attempting to Log In
        </div>
      )
    }
    if(this.props.user != null){
      let spStatus = (
        <Flex align='center'>
          <Button
            onClick={this.goToSpotifyLogin}
            children='Connect to SP'
          />
        </Flex>
      )
      let lfStatus = (
        <Flex align='center'>
          <Button
            onClick={this.openLastFmBox}
            children='Connect to Last FM'
          />
        </Flex>
      )
      if (this.props.user.spotify.profile){
        spStatus = (<p>Successfully Connected to SP</p>)
      }
      if (this.props.user.lastfm.profile){
        lfStatus = (<p>Successfully Connected to LF</p>)
      }
      if (this.state.edit_last_fm){
        lfStatus = (
          <Flex align='center'>
            <span>Enter your Last.Fm User Name</span>
            <input placeholder=''/>
            <Button
              onClick={this.openLastFmBox}
              children='Connect to Last FM'
            />
          </Flex>
        )
      }

      view = (
        <div>
          User Logged In: {this.props.user.toString()}
          <Flex align='center'>
            <Button
              onClick={this.props.logout}
              children='Logout'
            />
            <Box mx={1} />
            {spStatus}
            <Box mx={1} />
            {lfStatus}
          </Flex>
          <Avatar src={this.props.user.strava.profile_medium}/>
        </div>
      )
    }
    console.log('props', this.props)
    return (
        <div style={sx.root}>
          <Flex wrap>
            <Container maxWidth={1024}>
              <Box is='header' p={3} width={[1,2/3]}>
                  <Heading is='h1'><FormattedMessage {...messages.header} /></Heading>
                  <Lead><FormattedMessage {...messages.subheader} /></Lead>
                  <p>
                    <FormattedMessage {...messages.body} />
          			  </p>
                  {/*
                  <Button
                    onClick={this.loadActivities}
                    children='Load Activities'
                  />
                  <Button
                    onClick={this.loadActivities}
                    children='Load Activities'
                  />
                  <Box mx={1} />
                  <Link
                    href="/api/v1/dump_activities/?type=csv" target="_blank"
                    children='Dump Activities'
                  />
                  */}
                  {view}
                  <StravaLogin/>
                  <SpotifyLogin/>

                  {/*<pre className='pre'>npm i grid-styled</pre>*/}
                  <Divider/>
                  <ul>
                    <li> list connected services (with the ability to remove connected accounts)</li>
                    <li> have a small preference pane</li>
                    <li> have links/settings to disable this app</li>
                  </ul>
          		</Box>
            </Container>
        	</Flex>
        </div>
    );
  }
}

const sx = {
  root: {
    position: 'relative'
  },
  top: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
  },
  preview: {
    width: '100%'
  },
  controls: {
    color: 'magenta',
    backgroundColor: '#000',
    WebkitFontSmoothing: 'antialiased'
  },
  bottom: {
    minHeight: '40vh',
    fontFamily: 'SF Mono, Menlo, monospace',
    fontSize: 12,
    margin: 0,
    padding: 16,
    overflow: 'auto',
    color: 'cyan',
    backgroundColor: '#000',
    outline: 'none',
    WebkitFontSmoothing: 'antialiased'
  },
  error: {
    fontFamily: 'SF Mono, Menlo, monospace',
    fontSize: 12,
    position: 'fixed',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    padding: 16,
    color: '#fff',
    backgroundColor: '#f00'
  },
  xray: {
    transition: 'background-color .3s ease-out'
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  HomePage: makeSelectHomePage(),
  loginUrl: selectLoginUrl(),
  loggingIn: selectLoginStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    addService: (service) => dispatch(addService(service)),
    logout: () => dispatch(logout()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
