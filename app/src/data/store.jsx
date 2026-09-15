import React, { createContext, useContext, useEffect, useMemo, useReducer, useCallback } from 'react';
import * as C from './content.js';
import { track } from './analytics.js';

const KEY = 'hallyu-state-v1';

function freshState() {
  return {
    auth: null,                 // {email, name, handle}
    onboarded: false,
    genres: [],
    followedDramas: [],
    followedActors: [],
    followingUsers: [],
    joinedCommunities: ['c1', 'c3'],
    subscribedChannels: ['ch1', 'ch2', 'ch3'],
    likedPosts: { p1: true, p9: true },
    savedPosts: { p7: true },
    likedClips: { v2: true },
    savedClips: { v3: true },
    posts: C.posts.map(p => ({ ...p })),
    extraComments: {},         // postId -> [comments]
    threadComments: {},        // 'drama:ep' -> [comments]
    clips: C.clips.map(v => ({ ...v })),
    conversations: JSON.parse(JSON.stringify(C.conversations)),
    reactions: {},             // `${chId}:${bId}`: { idx: true }
    notifs: C.notificationsSeed.map(n => ({ ...n })),
    notifPrefs: { episode: true, reply: true, channel: true, dm: true },
    communities: C.communities.map(x => ({ ...x })),
    profile: { name: 'You', handle: 'you', bio: 'Here for the OSTs and the ep 10 hallway scenes.' },
    toast: null,
  };
}

function init() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // fresh content updates always win for the demo's fixed universe
      return { ...freshState(), ...parsed, toast: null };
    }
  } catch {}
  return freshState();
}

function reducer(s, a) {
  const t = (patch) => ({ ...s, ...patch });
  switch (a.type) {
    case 'AUTH': return t({ auth: a.auth });
    case 'LOGOUT': return { ...freshState(), auth: null };
    case 'ONBOARD':
      return t({
        onboarded: true,
        genres: a.genres,
        followedDramas: a.dramaIds,
        followedActors: a.actorIds,
      });
    case 'TOGGLE_SET': {
      const set = new Set(s[a.field]);
      set.has(a.id) ? set.delete(a.id) : set.add(a.id);
      return t({ [a.field]: [...set] });
    }
    case 'TOGGLE_KEYED': {
      const map = { ...s[a.field] };
      map[a.id] = !map[a.id];
      return t({ [a.field]: map });
    }
    case 'ADD_POST': {
      const p = {
        id: 'np' + Date.now(), userId: 'me', time: 'now', agoMin: 0,
        text: a.text, media: a.media || null, mediaH: a.media ? 230 : null,
        dramaId: a.dramaId || null, actorId: a.actorId || null, communityId: a.communityId || null,
        likes: 0, comments: 0, liked: false, saved: false, spoiler: !!a.spoiler, duration: a.duration || null,
      };
      const communities = s.communities.map(c => c.id === p.communityId ? { ...c } : c);
      return t({ posts: [p, ...s.posts] });
    }
    case 'ADD_COMMENT': {
      const list = [...(s.extraComments[a.postId] || [])];
      list.push({ id: 'c' + Date.now(), userId: 'me', time: 'now', text: a.text, likes: 0, liked: false });
      const posts = s.posts.map(p => p.id === a.postId ? { ...p, comments: p.comments + 1 } : p);
      return t({ extraComments: { ...s.extraComments, [a.postId]: list }, posts });
    }
    case 'ADD_THREAD_COMMENT': {
      const list = [...(s.threadComments[a.key] || [])];
      list.push({ id: 'tc' + Date.now(), userId: 'me', time: 'now', text: a.text, likes: 0, liked: false });
      return t({ threadComments: { ...s.threadComments, [a.key]: list } });
    }
    case 'SEND_MESSAGE': {
      const conversations = s.conversations.map(c => {
        if (c.id !== a.convoId) return c;
        const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        return { ...c, unread: false, lastMin: 0, last: a.text,
          messages: [...c.messages, { id: 'mm' + Date.now(), from: 'me', text: a.text, time }] };
      });
      return t({ conversations });
    }
    case 'RECV_MESSAGE': {
      const conversations = s.conversations.map(c => {
        if (c.id !== a.convoId) return c;
        return { ...c, unread: c.id !== a.activeConvo, lastMin: 0, last: a.text,
          messages: [...c.messages, { id: 'mm' + Date.now(), from: 'them', text: a.text }] };
      });
      return t({ conversations });
    }
    case 'START_CONVO': {
      if (s.conversations.find(c => c.userId === a.userId)) return s;
      const u = C.user(a.userId);
      return t({ conversations: [...s.conversations,
        { id: a.id, userId: u.id, unread:false, last:'', lastMin:0, messages: [] }] });
    }
    case 'REACT_BROADCAST': {
      const key = `${a.chId}:${a.bId}`;
      const cur = { ...(s.reactions[key] || {}) };
      cur[a.idx] = !cur[a.idx];
      return t({ reactions: { ...s.reactions, [key]: cur } });
    }
    case 'READ_ALL_NOTIFS':
      return t({ notifs: s.notifs.map(n => ({ ...n, read: true })) });
    case 'SET_NOTIF_PREF':
      return t({ notifPrefs: { ...s.notifPrefs, [a.kind]: a.value } });
    case 'UPDATE_PROFILE':
      return t({ profile: { ...s.profile, ...a.patch } });
    case 'CREATE_COMMUNITY': {
      const c = { id: 'cc' + Date.now(), name: a.name, type: 'topic', members: 1, linkedDrama: null, mine: true };
      return t({ communities: [...s.communities, c], joinedCommunities: [...s.joinedCommunities, c.id] });
    }
    case 'TOAST':
      return t({ toast: a.message });
    default: return s;
  }
}

const StoreCtx = createContext(null);

export function StoreProvider({ children }) {
  const [s, dispatch] = useReducer(reducer, undefined, init);
  useEffect(() => {
    const { toast, ...persist } = s;
    try { localStorage.setItem(KEY, JSON.stringify(persist)); } catch {}
  }, [s]);

  const toast = useCallback((message) => {
    dispatch({ type: 'TOAST', message });
    setTimeout(() => dispatch({ type: 'TOAST', message: null }), 1800);
  }, []);

  const toggleSet = (field, id) => dispatch({ type: 'TOGGLE_SET', field, id });
  // helpers for analytics-friendly toggles (only IDs/categories, never content)
  const toggleTracked = (field, id, eventName, extra) => {
    const had = s[field].includes(id);
    dispatch({ type: 'TOGGLE_SET', field, id });
    track(eventName, { id, state: had ? 'off' : 'on', ...extra });
  };
  const toggleKeyedTracked = (field, id, eventName) => {
    const had = !!s[field][id];
    dispatch({ type: 'TOGGLE_KEYED', field, id });
    track(eventName, { id, state: had ? 'off' : 'on' });
  };

  const api = useMemo(() => ({
    s,
    signup: (email, name, method = 'email') => { dispatch({ type: 'AUTH', auth: { email, name: name || email.split('@')[0] } }); track('signup_completed', { method }); },
    login: (email, method = 'email') => { dispatch({ type: 'AUTH', auth: { email, name: email.split('@')[0] } }); track('login_completed', { method }); },
    logout: () => { dispatch({ type: 'LOGOUT' }); track('logout'); },
    completeOnboarding: (genres, dramaIds, actorIds) => {
      dispatch({ type: 'ONBOARD', genres, dramaIds, actorIds });
      track('onboarding_completed', { genres_count: genres.length, dramas_count: dramaIds.length, actors_count: actorIds.length });
    },
    toggleFollowDrama: (id) => toggleTracked('followedDramas', id, 'drama_followed', { drama_id: id }),
    toggleFollowActor: (id) => toggleTracked('followedActors', id, 'actor_followed', { actor_id: id }),
    toggleJoin: (id) => {
      const c = C.community(id);
      toggleTracked('joinedCommunities', id, c?.type === 'drama' ? 'drama_community' : 'community_joined', { community_id: id, type: c?.type });
    },
    toggleSubscribe: (id) => toggleTracked('subscribedChannels', id, 'channel_subscribed', { channel_id: id }),
    toggleFollowUser: (id) => toggleTracked('followingUsers', id, 'user_followed', { user_id: id }),
    toggleLikePost: (id) => toggleKeyedTracked('likedPosts', id, 'post_liked'),
    toggleSavePost: (id) => toggleKeyedTracked('savedPosts', id, 'post_saved'),
    toggleLikeClip: (id) => toggleKeyedTracked('likedClips', id, 'clip_liked'),
    toggleSaveClip: (id) => toggleKeyedTracked('savedClips', id, 'clip_saved'),
    addPost: (p) => {
      dispatch({ type: 'ADD_POST', ...p });
      track('post_created', {
        type: p.media ? (p.duration ? 'video' : 'image') : 'text',
        has_drama_tag: !!p.dramaId, has_actor_tag: !!p.actorId, has_community_tag: !!p.communityId,
        spoiler: !!p.spoiler, caption_length: (p.text || '').length,
      });
      toast('Posted');
    },
    addComment: (postId, text, source = 'post') => { dispatch({ type: 'ADD_COMMENT', postId, text }); track('comment_created', { post_id: postId, length: text.length, source }); },
    addThreadComment: (key, text) => { dispatch({ type: 'ADD_THREAD_COMMENT', key, text }); const [drama_id, episode_number] = key.split(':'); track('episode_thread_commented', { drama_id, episode_number: Number(episode_number), length: text.length }); },
    sendMessage: (convoId, text) => { dispatch({ type: 'SEND_MESSAGE', convoId, text }); track('dm_sent', { conversation_id: convoId, has_media: false }); },
    fakeReply: (convoId, activeConvo) => setTimeout(() => dispatch({
      type: 'RECV_MESSAGE', convoId, activeConvo,
      text: ['relatable 😭','NO because same','ok but the soundtrack though','adding this to my watchlist'][Math.floor(Math.random()*4)],
    }), 2600 + Math.random()*2000),
    startConversation: (userId) => {
      const existing = s.conversations.find(c => c.userId === userId);
      if (existing) return existing.id;
      const id = 'dm' + Date.now();
      dispatch({ type: 'START_CONVO', userId, id });
      return id;
    },
    reactBroadcast: (chId, bId, idx) => dispatch({ type: 'REACT_BROADCAST', chId, bId, idx }),
    readAllNotifs: () => dispatch({ type: 'READ_ALL_NOTIFS' }),
    setNotifPref: (kind, value) => dispatch({ type: 'SET_NOTIF_PREF', kind, value }),
    updateProfile: (patch) => { dispatch({ type: 'UPDATE_PROFILE', patch }); toast('Profile updated'); },
    createCommunity: (name) => { dispatch({ type: 'CREATE_COMMUNITY', name }); toast('Community created'); },
    toast,
  }), [s]);

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>;
}

export const useStore = () => useContext(StoreCtx);

// ---------- selectors / feed ranking (rule-based, per PRD #3) ----------
export function useRankedFeed() {
  const { s } = useStore();
  return useMemo(() => {
    const score = (p) => {
      let x = 0;
      if (p.dramaId && s.followedDramas.includes(p.dramaId)) x += 3;
      if (p.communityId && s.joinedCommunities.includes(p.communityId)) x += 2;
      if (p.userId !== 'me' && s.followingUsers.includes(p.userId)) x += 2;
      if (p.actorId && s.followedActors.includes(p.actorId)) x += 2;
      return x;
    };
    return [...s.posts].sort((a, b) => (score(b) - score(a)) || (b.agoMin - a.agoMin));
  }, [s.posts, s.followedDramas, s.joinedCommunities, s.followingUsers, s.followedActors]);
}
