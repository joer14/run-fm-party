/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.HomePage.header',
    defaultMessage: 'Run FM Party',
  },
  subheader: {
    id: 'app.components.HomePage.subheader',
    defaultMessage: 'The Strictly Unofficial Strava Song Syncer for Last.fm and Spotify',
  },
  body: {
    id: 'app.components.HomePage.body',
    defaultMessage: "Automatically add a list of the songs you've listened to your Strava activity's description."
  },
});
