import React, { useState } from 'react';
import { Icon } from '../components/icons.jsx';
import { Avatar, Button, FollowButton, Header, IconButton, Overline, PostCard } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';
import * as C from '../data/content.js';

function ProfileHead({ u, me }) {
  const store = useStore();
  const nav = useNav();
  const following = me || store.s.followingUsers.includes(u.id);
  const followedDramas = me ? store.s.followedDramas : [];
  return (
    <>
      <div style={{ textAlign: 'center', padding: '8px 20px 18px' }}>
        <Avatar user={u} size={108} style={{ margin: '0 auto 14px' }} />
        <h1 className="t-headline">{me ? store.s.profile.name : u.name}</h1>
        <p className="t-body c2" style={{ marginTop: 4 }}>@{me ? store.s.profile.handle : u.handle}</p>
        <p className="t-caption c2" style={{ marginTop: 6 }}>
          {me ? `${store.s.profile.followingCount ?? 128} following · ${store.s.profile.followerCount ?? 96} followers`
              : `${C.compact(u.followers)} followers · ${u.following} following`}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18 }}>
          {me ? <>
            <Button kind="secondary" className="sm" onClick={() => nav.push('edit-profile')} style={{ minWidth: 150 }}>Edit profile</Button>
            <Button kind="secondary" className="sm" onClick={() => store.toast('Link copied')}><Icon name="share" size={17} /> Share</Button>
          </> : <>
            <FollowButton following={following} onToggle={() => store.toggleFollowUser(u.id)} />
            <Button kind="secondary" className="sm" onClick={() => {
              const cid = store.s.conversations.find(x => x.userId === u.id)?.id || store.startConversation(u.id);
              nav.push('dm', { id: cid });
            }}>Message</Button>
          </>}
        </div>
        <p className="t-body c2" style={{ marginTop: 16, textAlign: 'left' }}>{me ? store.s.profile.bio : u.bio}</p>
      </div>

      {me && followedDramas.length > 0 && (
        <div style={{ padding: '0 16px' }}>
          <Overline style={{ margin: '4px 0 10px' }}>FOLLOWING</Overline>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6 }}>
            {followedDramas.map(id => {
              const d = C.drama(id);
              if (!d) return null;
              return (
                <div key={id} role="button" onClick={() => nav.push('drama', { id })} style={{ width: 110, flex: 'none' }}>
                  <div className="poster-tile"><img src={d.poster} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <p className="t-caption" style={{ marginTop: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export function OwnProfile() {
  const { s } = useStore();
  const nav = useNav();
  const [tab, setTab] = useState('Posts');
  const me = C.user('me');
  const mine = s.posts.filter(p => p.userId === 'me');
  const liked = s.posts.filter(p => s.likedPosts[p.id] ?? p.liked);
  const list = tab === 'Posts' ? mine : tab === 'Liked' ? liked : mine.filter(p => p.media);
  return (
    <div className="screen">
      <div className="h1">
        <div className="row" style={{ justifyContent: 'flex-end' }}>
          <span style={{ flex: 1, textAlign: 'center' }}><p className="t-title">@{s.profile.handle}</p></span>
          <IconButton icon="settings" onClick={() => nav.push('settings')} />
        </div>
      </div>
      <div className="scroll pad" style={{ paddingBottom: 120 }}>
        <ProfileHead u={me} me />
        <div className="utabs" style={{ margin: '10px 0 14px' }}>
          {['Posts', 'Media', 'Liked'].map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {list.length === 0
            ? <p className="t-body c3" style={{ textAlign: 'center', marginTop: 40 }}>Nothing here yet.</p>
            : list.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      </div>
    </div>
  );
}

export function OtherProfile({ id }) {
  const { s } = useStore();
  const u = C.user(id);
  const [tab, setTab] = useState('Posts');
  const posts = s.posts.filter(p => p.userId === id);
  return (
    <div className="screen">
      <Header title="" right={[{ icon: 'more' }]} />
      <div className="scroll pad no-tabbar">
        <ProfileHead u={u} />
        <div className="utabs" style={{ margin: '10px 0 14px' }}>
          {['Posts', 'Media', 'Liked'].map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.length === 0
            ? <p className="t-body c3" style={{ textAlign: 'center', marginTop: 40 }}>{u.name} hasn’t posted here yet.</p>
            : posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      </div>
    </div>
  );
}

export function EditProfile() {
  const store = useStore();
  const nav = useNav();
  const [name, setName] = useState(store.s.profile.name);
  const [handle, setHandle] = useState(store.s.profile.handle);
  const [bio, setBio] = useState(store.s.profile.bio);
  const save = () => { store.updateProfile({ name, handle, bio }); nav.pop(); };
  return (
    <div className="screen">
      <div className="top">
        <button className="back" onClick={() => nav.pop()}><Icon name="close" size={24} /></button>
        <h1 className="t-title" style={{ flex: 1 }}>Edit profile</h1>
        <button className="t-title2" onClick={save}>Save</button>
      </div>
      <div className="scroll pad no-tabbar">
        <div style={{ position: 'relative', width: 92, margin: '10px auto 28px' }}>
          <Avatar initials="YO" size={92} />
          <span style={{ position: 'absolute', right: -4, bottom: -4, width: 30, height: 30, borderRadius: '50%', background: 'var(--text1)', color: '#000', display: 'grid', placeItems: 'center' }}>
            <Icon name="camera" size={16} />
          </span>
        </div>
        <p className="t-overline c2" style={{ margin: '0 4px 8px' }}>DISPLAY NAME</p>
        <input className="input" value={name} maxLength={40} onChange={e => setName(e.target.value)} />
        <p className="t-overline c2" style={{ margin: '20px 4px 8px' }}>HANDLE</p>
        <input className="input" value={handle} maxLength={24} onChange={e => setHandle(e.target.value.replace(/[^a-z0-9_]/gi, '').toLowerCase())} />
        <p className="t-overline c2" style={{ margin: '20px 4px 8px', display: 'flex', justifyContent: 'space-between' }}>
          <span>BIO</span><span className="c3">{bio.length}/160</span>
        </p>
        <textarea className="input" rows={4} maxLength={160} value={bio} onChange={e => setBio(e.target.value)} />
        <Button kind="primary" style={{ marginTop: 28 }} onClick={save}>Save changes</Button>
      </div>
    </div>
  );
}
