import React from 'react';
import { NavProvider, useNav } from './nav.jsx';
import { StoreProvider, useStore } from './data/store.jsx';
import { Toast, TabBar } from './components/ui.jsx';
import { Welcome, Signup, Login, Forgot } from './screens/auth.jsx';
import { OnboardingGenres, OnboardingDramas, OnboardingActors, NotifPermission } from './screens/onboarding.jsx';
import { HomeScreen } from './screens/home.jsx';
import { ExploreScreen } from './screens/explore.jsx';
import { CommunitiesScreen, CommunityDetail } from './screens/communities.jsx';
import { MessagesScreen, DMThread, NewMessage, ChannelsList, ChannelDetail } from './screens/messages.jsx';
import { OwnProfile, OtherProfile, EditProfile } from './screens/profile.jsx';
import { DramaHub, EpisodeThread, ActorProfile } from './screens/drama.jsx';
import { SearchScreen } from './screens/search.jsx';
import { NotificationsScreen } from './screens/notifications.jsx';
import { Composer } from './screens/composer.jsx';
import { PostDetail } from './screens/post.jsx';
import {
  SettingsMain, AccountSettings, NotifPrefs, PrivacySettings, About,
  Terms, PrivacyPolicyPage, Guidelines, Followers,
} from './screens/settings.jsx';

const TAB_SCREENS = {
  home: HomeScreen,
  explore: ExploreScreen,
  communities: CommunitiesScreen,
  messages: MessagesScreen,
  profile: OwnProfile,
};

function TabLayout() {
  const { tab } = useNav();
  const Screen = TAB_SCREENS[tab];
  return (
    <>
      <Screen />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20 }}>
        <TabBar />
      </div>
    </>
  );
}

function resolve(name, params) {
  switch (name) {
    case 'tabs': return <TabLayout key="tabs" />;
    case 'welcome': return <Welcome key="welcome" />;
    case 'signup': return <Signup key="signup" />;
    case 'login': return <Login key="login" />;
    case 'forgot': return <Forgot key="forgot" />;
    case 'onboarding-genres': return <OnboardingGenres key="g" />;
    case 'onboarding-dramas': return <OnboardingDramas key="d" />;
    case 'onboarding-actors': return <OnboardingActors key="a" />;
    case 'notif-permission': return <NotifPermission key="n" />;
    case 'search': return <SearchScreen key="s" {...params} />;
    case 'notifications': return <NotificationsScreen key="nt" />;
    case 'composer': return <Composer key="c" {...params} />;
    case 'post': return <PostDetail key={name + params.id} {...params} />;
    case 'drama': return <DramaHub key={name + params.id} {...params} />;
    case 'episode': return <EpisodeThread key={name + params.dramaId + params.ep} {...params} />;
    case 'actor': return <ActorProfile key={name + params.id} {...params} />;
    case 'community': return <CommunityDetail key={name + params.id} {...params} />;
    case 'channels': return <ChannelsList key="ch" />;
    case 'channel': return <ChannelDetail key={name + params.id} {...params} />;
    case 'dm': return <DMThread key={name + params.id} {...params} />;
    case 'new-message': return <NewMessage key="nm" />;
    case 'user': return <OtherProfile key={name + params.id} {...params} />;
    case 'edit-profile': return <EditProfile key="ep" />;
    case 'followers': return <Followers key="fl" />;
    case 'settings': return <SettingsMain key="set" />;
    case 'account': return <AccountSettings key="acc" />;
    case 'notif-prefs': return <NotifPrefs key="np" />;
    case 'privacy': return <PrivacySettings key="pr" />;
    case 'about': return <About key="ab" />;
    case 'terms': return <Terms key="ts" />;
    case 'privacy-policy': return <PrivacyPolicyPage key="pp" />;
    case 'guidelines': return <Guidelines key="gl" />;
    default: return <TabLayout key="tabs" />;
  }
}

function Shell() {
  const { s } = useStore();
  const { stack } = useNav();
  let base = 'welcome';
  if (s.auth) base = s.onboarded ? 'tabs' : 'onboarding-genres';
  const routes = stack.length ? stack : [{ name: base, params: {} }];

  return (
    <div className="stage">
      <div className="phone">
        <div className="stack">
          {routes.map((r, i) => (
            <div key={i} style={{ position: 'absolute', inset: 0, zIndex: i + 1 }}>
              {resolve(r.name, r.params || {})}
            </div>
          ))}
        </div>
        <Toast />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <NavProvider>
        <Shell />
      </NavProvider>
    </StoreProvider>
  );
}
