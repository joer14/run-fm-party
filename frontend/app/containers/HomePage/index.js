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
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Lead,
  Link,
  NavLink,
  Subhead,
  Text,
  Toolbar,
} from 'rebass'

import request from 'utils/request';

import {
  addService,
  fetchActivities,
  login,
  logout,
 } from '../App/actions';

import {
  selectLoginStatus,
  selectLoginUrl,
  selectUser,
} from '../App/selectors';

import FetchActivities from 'components/FetchActivities';
import ServiceStatus from 'components/ServiceStatus';
import SpotifyLogin from 'components/SpotifyLogin';
import StravaLogin from 'components/StravaLogin';

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
    let stravaUrl = request('/api/v1/load_activities/')
      .then((x)=>{

    })
  }
  render() {
    let loggedOutView = (
      <div>
        <Heading is='h1'><FormattedMessage {...messages.header} /></Heading>
        <Lead><FormattedMessage {...messages.subheader} /></Lead>
        <p>
          <FormattedMessage {...messages.body} />
        </p>
        <StravaLogin/>
      </div>
    )

    let view = loggedOutView;

    if(this.props.user != null){
      view = (
        <Box width={500+'px'}>
          <Flex mx={0}>
            <Box width={1/2} pr={2} pb={2}>
              <Flex>
                <Text pr={2}>
                  User: {this.props.user.strava.username}
                </Text>
                <Avatar size={24} src={this.props.user.strava.profile_medium}/>
              </Flex>
            </Box>
            <Box mx='auto'/>
            <Box >
              <Button
                onClick={this.props.logout}
                children='Logout'
              />
            </Box>
          </Flex>
          <Box pr={3} width={200+'px'}>
            {/*
              Temporarily disable spotify for the time being. I don't need this, and I'm building this for me. ;)

              <ServiceStatus name='Spotify' data={this.props.user.spotify} />
            */}
            <ServiceStatus name='Last.fm' data={this.props.user.lastfm} />
            <FetchActivities fetch={this.props.fetchActivities} />

          </Box>
        </Box>
      )
    }

    return (
        <div style={sx.root}>
          <Container maxWidth={1024}>
            <Box is='body' p={3}>
              {view}
            </Box>
          </Container>
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
    fetchActivities: () => dispatch(fetchActivities()),
    addService: (service) => dispatch(addService(service)),
    logout: () => dispatch(logout()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
