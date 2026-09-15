// Smoke render: server-render every screen under providers to catch runtime crashes.
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost/' });
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.localStorage = dom.window.localStorage;
global.history = dom.window.history;
global.HTMLElement = dom.window.HTMLElement;

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StoreProvider } from '../src/data/store.jsx';
import { NavProvider } from '../src/nav.jsx';
import { Welcome, Signup, Login, Forgot } from '../src/screens/auth.jsx';
import { OnboardingGenres, OnboardingDramas, OnboardingActors, NotifPermission } from '../src/screens/onboarding.jsx';
import { HomeScreen } from '../src/screens/home.jsx';
import { ExploreScreen } from '../src/screens/explore.jsx';
import { CommunitiesScreen, CommunityDetail } from '../src/screens/communities.jsx';
import { MessagesScreen, DMThread, NewMessage, ChannelsList, ChannelDetail } from '../src/screens/messages.jsx';
import { OwnProfile, OtherProfile, EditProfile } from '../src/screens/profile.jsx';
import { DramaHub, EpisodeThread, ActorProfile } from '../src/screens/drama.jsx';
import { SearchScreen } from '../src/screens/search.jsx';
import { NotificationsScreen } from '../src/screens/notifications.jsx';
import { Composer } from '../src/screens/composer.jsx';
import { PostDetail } from '../src/screens/post.jsx';
import {
  SettingsMain, AccountSettings, NotifPrefs, PrivacySettings, About,
  Terms, PrivacyPolicyPage, Guidelines, Followers,
} from '../src/screens/settings.jsx';

const wrap = (el) => renderToString(
  <StoreProvider><NavProvider>{el}</NavProvider></StoreProvider>
);

const cases = [
  ['welcome', <Welcome />],
  ['signup', <Signup />],
  ['login', <Login />],
  ['forgot', <Forgot />],
  ['onboard-genres', <OnboardingGenres />],
  ['onboard-dramas', <OnboardingDramas />],
  ['onboard-actors', <OnboardingActors />],
  ['onboard-notif', <NotifPermission />],
  ['home', <HomeScreen />],
  ['explore', <ExploreScreen />],
  ['communities', <CommunitiesScreen />],
  ['community-c1', <CommunityDetail id="c1" />],
  ['community-c2', <CommunityDetail id="c2" />],
  ['messages', <MessagesScreen />],
  ['dm', <DMThread id="dm1" />],
  ['new-message', <NewMessage />],
  ['channels', <ChannelsList />],
  ['channel-ch1', <ChannelDetail id="ch1" />],
  ['profile', <OwnProfile />],
  ['user-other', <OtherProfile id="u3" />],
  ['edit-profile', <EditProfile />],
  ['drama-snow', <DramaHub id="snow" />],
  ['drama-signal', <DramaHub id="signal" />],
  ['episode', <EpisodeThread dramaId="snow" ep={10} />],
  ['episode-new', <EpisodeThread dramaId="seongsu" ep={3} />],
  ['actor', <ActorProfile id="jiwon" />],
  ['search', <SearchScreen />],
  ['notifications', <NotificationsScreen />],
  ['composer', <Composer />],
  ['post', <PostDetail id="p1" />],
  ['post-user', <PostDetail id="p6" />],
  ['settings', <SettingsMain />],
  ['account', <AccountSettings />],
  ['notif-prefs', <NotifPrefs />],
  ['privacy', <PrivacySettings />],
  ['about', <About />],
  ['terms', <Terms />],
  ['privacy-policy', <PrivacyPolicyPage />],
  ['guidelines', <Guidelines />],
  ['followers', <Followers />],
];

let fail = 0;
for (const [name, el] of cases) {
  try {
    const html = wrap(el);
    if (html.length < 100) throw new Error('suspiciously tiny render');
    console.log(`ok   ${name} (${html.length}b)`);
  } catch (e) {
    fail++;
    console.error(`FAIL ${name}: ${e.message}`);
    console.error(e.stack?.split('\n').slice(0, 4).join('\n'));
  }
}
process.exit(fail ? 1 : 0);
