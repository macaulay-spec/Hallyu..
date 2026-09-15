import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../components/icons.jsx';
import { Avatar } from '../components/ui.jsx';
import { Sheet } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';
import { user as findUser, drama, compact } from '../data/content.js';

export function ExploreScreen() {
  const store = useStore();
  const nav = useNav();
  const clips = store.s.clips;
  const [muted, setMuted] = useState(true);
  const [tab, setTab] = useState('For You');
  const [commentsFor, setCommentsFor] = useState(null);
  const scrollRef = useRef(null);

  return (
    <div className="screen">
      <div className="explore" ref={scrollRef}>
        {clips.map(v => {
          const u = findUser(v.userId);
          const d = drama(v.dramaId);
          const liked = store.s.likedClips[v.id] ?? v.liked;
          const saved = store.s.savedClips[v.id] ?? v.saved;
          const likes = v.likes + (liked && !v.liked ? 1 : 0) - (!liked && v.liked ? 1 : 0);
          return (
            <section className="clip" key={v.id}>
              <img className="bg" src={v.poster} alt="" />
              <div className="veil" />

              <div className="clip-top">
                <button className={tab === 'Following' ? 'on' : ''} onClick={() => setTab('Following')}>Following</button>
                <button className={tab === 'For You' ? 'on' : ''} onClick={() => setTab('For You')}>For You</button>
                <button onClick={() => setMuted(m => !m)} style={{ position: 'absolute', right: 16, top: -6, opacity: 1 }}>
                  <Icon name={muted ? 'mute' : 'volume'} size={24} color="#fff" />
                </button>
              </div>

              <div className="rail">
                <div style={{ position: 'relative', marginBottom: 4 }}>
                  <Avatar user={u} size={46} style={{ border: '2px solid #fff' }} />
                  <span style={{ position: 'absolute', bottom: -9, left: '50%', transform: 'translateX(-50%)', width: 20, height: 20, borderRadius: '50%', background: '#fff', color: '#000', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 15 }}>+</span>
                </div>
                <span className={`rbtn ${liked ? 'liked' : ''}`}>
                  <button onClick={() => store.toggleLikeClip(v.id)}><Icon name="heart" size={34} fill={liked} color={liked ? 'var(--accent)' : '#fff'} /></button>
                  {compact(likes)}
                </span>
                <span className="rbtn">
                  <button onClick={() => setCommentsFor(v)}><Icon name="comment" size={32} color="#fff" /></button>
                  {compact(v.comments)}
                </span>
                <span className="rbtn">
                  <button onClick={() => store.toast('Link copied')}><Icon name="share" size={30} color="#fff" /></button>
                  {compact(v.shares)}
                </span>
                <span className="rbtn">
                  <button onClick={() => store.toggleSaveClip(v.id)}><Icon name="bookmark" size={28} color={saved ? '#fff' : '#fff'} fill={saved} /></button>
                </span>
              </div>

              <div className="meta">
                <p className="t-title2" style={{ color: '#fff', marginBottom: 8 }}>@{u.handle}</p>
                <p className="t-body" style={{ color: 'rgba(255,255,255,.92)', textShadow: '0 1px 8px rgba(0,0,0,.6)' }}>{v.caption}</p>
                <button className="disc-pill" onClick={() => nav.push('drama', { id: d.id })}>
                  <Icon name="play" size={14} color="#fff" /> {d.title}
                </button>
                <p className="t-caption" style={{ color: 'rgba(255,255,255,.75)', marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Icon name="radio" size={15} color="#fff" /> {v.music}
                </p>
              </div>
            </section>
          );
        })}
      </div>

      <Sheet open={!!commentsFor} onClose={() => setCommentsFor(null)}>
        <div style={{ overflowY: 'auto', minHeight: 220 }}>
          <h3 className="t-title2" style={{ marginBottom: 14, textAlign: 'center' }}>{compact(commentsFor?.comments)} comments</h3>
          {(commentsFor?.id === 'v1' || true) && [
            { u: findUser('u3'), t: 'the footsteps-only mix should be illegal. in the best way.', time: '7m', likes: 312 },
            { u: findUser('u2'), t: 'this is my whole personality now', time: '12m', likes: 98 },
            { u: findUser('u5'), t: 'the framing through the café window!!', time: '21m', likes: 54 },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0' }}>
              <Avatar user={c.u} size={34} />
              <div style={{ flex: 1 }}>
                <p className="t-caption c1" style={{ fontWeight: 600 }}>{c.u.handle} <span className="c3" style={{ fontWeight: 400 }}> · {c.time}</span></p>
                <p className="t-body" style={{ fontSize: 14, lineHeight: '20px' }}>{c.t}</p>
              </div>
              <div style={{ textAlign: 'center' }}><Icon name="heart" size={15} color="var(--text3)" /><span className="t-caption c3">{c.likes}</span></div>
            </div>
          ))}
        </div>
      </Sheet>
    </div>
  );
}
