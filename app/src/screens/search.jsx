import React, { useState, useMemo, useEffect } from 'react';
import { Icon } from '../components/icons.jsx';
import { Avatar, JoinButton, Overline, PostCard, SearchBar } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';
import { track } from '../data/analytics.js';
import * as C from '../data/content.js';

const TABS = ['Dramas', 'Actors', 'Users', 'Communities', 'Posts'];

export function SearchScreen({ tab: initialTab = 'Dramas' }) {
  const store = useStore();
  const { s } = store;
  const nav = useNav();
  const [q, setQ] = useState('');
  const [tab, setTab] = useState(initialTab);
  useEffect(() => setTab(initialTab), [initialTab]);
  const query = q.trim().toLowerCase();
  const empty = query.length < 2;
  useEffect(() => {
    const t = setTimeout(() => { if (q.trim().length >= 2) track('search_performed', { query_length: q.trim().length, tab }); }, 300);
    return () => clearTimeout(t);
  }, [q, tab]);

  const dramas = C.dramas.filter(d => d.title.toLowerCase().includes(query));
  const actors = C.actors.filter(a => a.name.toLowerCase().includes(query));
  const users = C.users.filter(u => !u.me && (u.name.toLowerCase().includes(query) || u.handle.includes(query)));
  const comms = s.communities.filter(c => c.name.toLowerCase().includes(query));
  const posts = s.posts.filter(p => p.text?.toLowerCase().includes(query));

  return (
    <div className="screen">
      <div style={{ padding: 'calc(14px + env(safe-area-inset-top)) 16px 10px', display: 'flex', gap: 10, alignItems: 'center', flex: 'none' }}>
        <button className="back" style={{ marginLeft: -6 }} onClick={() => nav.pop()}><Icon name="back" size={24} /></button>
        <div style={{ flex: 1 }}><SearchBar value={q} onChange={setQ} placeholder="Search dramas, actors, communities" autoFocus /></div>
      </div>
      <div style={{ padding: '0 16px 10px', overflowX: 'auto', flex: 'none' }}>
        <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
          {TABS.map(t => <button key={t} className={`chip small ${tab === t ? 'on' : ''}`} onClick={() => setTab(t)}>{t}</button>)}
        </div>
      </div>

      <div className="scroll pad no-tabbar">
        {empty && (
          <>
            <Overline>TRENDING NOW</Overline>
            {['The Weight of Snow', 'Signal Fire ending', 'Seo Ji-won', 'OST Appreciation', 'Episode threads'].map((t, i) => (
              <button key={t} className="row-item" onClick={() => setQ(t.split(' ')[0])}>
                <span className="t-title2 c3" style={{ width: 28 }}>{i + 1}</span>
                <Icon name={i < 2 ? 'flame' : 'search'} size={18} color="var(--text3)" />
                <span className="t-body" style={{ flex: 1, textAlign: 'left' }}>{t}</span>
              </button>
            ))}
            <Overline>RECENT</Overline>
            {['Midnight in Seongsu', 'Han Do-yun'].map(t => (
              <button key={t} className="row-item" onClick={() => setQ(t)}>
                <Icon name="clock" size={18} color="var(--text3)" />
                <span className="t-body c2" style={{ flex: 1, textAlign: 'left' }}>{t}</span>
                <Icon name="chevr" size={16} color="var(--text3)" />
              </button>
            ))}
          </>
        )}

        {!empty && tab === 'Dramas' && dramas.map(d => (
          <div key={d.id}>
            <div className="row-item" role="button" tabIndex={0} onClick={() => nav.push('drama', { id: d.id })}>
              <img src={d.poster} alt="" style={{ width: 84, height: 110, objectFit: 'cover', borderRadius: 10 }} />
              <div className="grow" style={{ alignSelf: 'flex-start', paddingTop: 8 }}>
                <p className="t-title2">{d.title}</p>
                <p className="t-caption c2" style={{ marginTop: 4 }}>{C.dramaLabel(d)}</p>
                <p className="t-caption c2">★ {d.rating} {d.airing ? `· airing ${d.nextLabel}` : ''}</p>
                <div style={{ marginTop: 10 }} onClick={e => e.stopPropagation()}>
                  <button className={`btn xs ${s.followedDramas.includes(d.id) ? 'secondary' : 'primary'}`}
                    onClick={() => store.toggleFollowDrama(d.id)}>
                    {s.followedDramas.includes(d.id) ? 'Following' : '+ Follow'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!empty && tab === 'Actors' && actors.map(a => (
          <button key={a.id} className="row-item" onClick={() => nav.push('actor', { id: a.id })}>
            <Avatar photo={a.photo} size={50} />
            <div className="grow"><p className="t-body-em">{a.name}</p><p className="t-caption c3">{C.compact(a.fans)} fans</p></div>
            <Icon name="chevr" size={16} color="var(--text3)" />
          </button>
        ))}

        {!empty && tab === 'Users' && users.map(u => (
          <div key={u.id} className="row-item" role="button" tabIndex={0} onClick={() => nav.push('user', { id: u.id })}>
            <Avatar user={u} size={50} />
            <div className="grow"><p className="t-body-em">{u.name}</p><p className="t-caption c3">@{u.handle}</p></div>
            <div onClick={e => e.stopPropagation()}>
              <button className={`btn xs ${s.followingUsers.includes(u.id) ? 'secondary' : 'primary'}`}
                onClick={() => store.toggleFollowUser(u.id)}>{s.followingUsers.includes(u.id) ? 'Following' : 'Follow'}</button>
            </div>
          </div>
        ))}

        {!empty && tab === 'Communities' && comms.map(c => (
          <div key={c.id} className="row-item" role="button" tabIndex={0} onClick={() => nav.push('community', { id: c.id })}>
            <Avatar initials={c.name[0]} size={50} />
            <div className="grow"><p className="t-body-em">{c.name}</p><p className="t-caption c3">{C.compact(c.members)} members</p></div>
            <div onClick={e => e.stopPropagation()}><JoinButton joined={s.joinedCommunities.includes(c.id)} onToggle={() => store.toggleJoin(c.id)} /></div>
          </div>
        ))}

        {!empty && tab === 'Posts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 6 }}>
            {posts.length === 0 ? <p className="t-body c3" style={{ textAlign: 'center', marginTop: 40 }}>No posts match “{q}”.</p>
              : posts.map(p => <PostCard key={p.id} post={p} showCommunity />)}
          </div>
        )}

        {!empty && (
          (tab === 'Dramas' && dramas.length === 0) ||
          (tab === 'Actors' && actors.length === 0) ||
          (tab === 'Users' && users.length === 0) ||
          (tab === 'Communities' && comms.length === 0)
        ) && <p className="t-body c3" style={{ textAlign: 'center', marginTop: 50 }}>No {tab.toLowerCase()} for “{q}”.</p>}

        {!empty && tab === 'Dramas' && dramas.length > 0 && (
          <>
            <Overline>RELATED COMMUNITIES</Overline>
            <div className="card">
              {dramas.slice(0, 2).map(d => {
                const c = C.community(d.community);
                return c ? (
                  <div key={c.id} className="row-item" role="button" tabIndex={0} onClick={() => nav.push('community', { id: c.id })}>
                    <Avatar initials={c.name[0]} size={44} />
                    <div className="grow"><p className="t-body-em">{c.name}</p><p className="t-caption c3">{C.compact(c.members)} members</p></div>
                    <div onClick={e => e.stopPropagation()}><JoinButton joined={s.joinedCommunities.includes(c.id)} onToggle={() => store.toggleJoin(c.id)} /></div>
                  </div>
                ) : null;
              })}
            </div>
            <Overline>POSTS</Overline>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {s.posts.filter(p => p.dramaId && dramas.some(d => d.id === p.dramaId)).slice(0, 2).map(p => <PostCard key={p.id} post={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
