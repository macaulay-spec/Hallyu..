import React, { useState } from 'react';
import { Icon } from '../components/icons.jsx';
import { Avatar, Button, FollowButton, Header, JoinButton, Overline } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';
import { track } from '../data/analytics.js';
import * as C from '../data/content.js';

export function DramaHub({ id, initialTab = 'Overview' }) {
  const store = useStore();
  const nav = useNav();
  const d = C.drama(id);
  const [tab, setTab] = useState(initialTab);
  React.useEffect(() => { track('drama_viewed', { drama_id: id, tab: initialTab.toLowerCase(), airing: d.airing }); }, [id]);
  const following = store.s.followedDramas.includes(d.id);
  const communityJoined = store.s.joinedCommunities.includes(d.community);

  return (
    <div className="screen">
      <div className="scroll no-tabbar">
        <div className="hero">
          <img src={d.poster} alt={d.title} />
          <div className="veil" />
          <div className="hero-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="back" onClick={() => nav.pop()} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,.35)' }}><Icon name="back" size={24} /></button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="icon-btn" style={{ background: 'rgba(0,0,0,.35)' }} onClick={() => store.toast('Link copied')}><Icon name="share" size={20} /></button>
                <button className="icon-btn" style={{ background: 'rgba(0,0,0,.35)' }}><Icon name="more" size={20} /></button>
              </div>
            </div>
            <div>
              <h1 className="t-display">{d.title}</h1>
              <p className="t-body c2" style={{ marginTop: 8, fontSize: 16 }}>
                {d.genres.join(' · ')} · {d.episodeCount} ep · ★ {d.rating}
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {d.airing && (
            <div className="airing-card" style={{ marginBottom: 14 }}>
              <span className="live-dot" />
              <div style={{ flex: 1 }}>
                <p className="t-overline accent" style={{ letterSpacing: 1.2 }}>AIRING</p>
                <p className="t-body c2">Next episode {d.nextLabel} · {d.nextIn}</p>
              </div>
              <Icon name="clock" size={22} color="var(--text2)" />
            </div>
          )}
          <div style={{ display: 'flex', gap: 12 }}>
            <Button kind={following ? 'secondary' : 'primary'} className="sm block"
              onClick={() => store.toggleFollowDrama(d.id)}>
              {following ? <><Icon name="check" size={17} sw={2.4} /> Following</> : '+ Follow'}
            </Button>
            <Button kind="primary" className="sm block" onClick={() => nav.push('community', { id: d.community })}>Discuss</Button>
          </div>
        </div>

        <div className="utabs" style={{ padding: '0 16px' }}>
          {['Overview', 'Cast', 'Episodes'].map(t =>
            <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
        </div>

        <div style={{ padding: '20px 20px 40px' }}>
          {tab === 'Overview' && (
            <>
              <Overline style={{ margin: '0 0 10px' }}>SYNOPSIS</Overline>
              <p className="t-body c1" style={{ lineHeight: '24px' }}>{d.synopsis}</p>
              <p className="t-body c3" style={{ marginTop: 14, fontSize: 14 }}>{d.credits}</p>
              <Overline style={{ margin: '28px 0 12px' }}>COMMUNITY</Overline>
              <div className="card row-item" role="button" tabIndex={0} onClick={() => nav.push('community', { id: d.community })}>
                <Avatar initials={d.title[0]} size={46} />
                <div className="grow">
                  <p className="t-body-em">{d.title}</p>
                  <p className="t-caption c2">{C.compact(C.community(d.community)?.members)} members</p>
                </div>
                <div onClick={e => e.stopPropagation()}>
                  <JoinButton joined={communityJoined} onToggle={() => store.toggleJoin(d.community)} />
                </div>
              </div>
            </>
          )}

          {tab === 'Cast' && (
            <>
              <Overline style={{ margin: '0 0 14px' }}>TOP BILLED</Overline>
              <div className="grid3">
                {d.cast.map(aid => {
                  const a = C.actor(aid);
                  return (
                    <div key={aid} className="cast-card" role="button" onClick={() => nav.push('actor', { id: aid })}>
                      <div className="ph"><img src={a.photo} alt={a.name} /></div>
                      <p className="t-caption c1" style={{ fontWeight: 600, marginTop: 8 }}>{a.name}</p>
                      <p className="t-caption c3">{d.roles[aid]}</p>
                    </div>
                  );
                })}
              </div>
              <button className="t-title2 c2" style={{ marginTop: 24 }} onClick={() => {}}>View all {14} cast members</button>
            </>
          )}

          {tab === 'Episodes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[...(d.episodes || [])].reverse().map((ep, i) => {
                const isNext = d.airing && ep.number === d.aired;
                return (
                  <button key={ep.number} className="card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', textAlign: 'left', width: '100%' }}
                    onClick={() => nav.push('episode', { dramaId: d.id, ep: ep.number })}>
                    <div style={{ flex: 1 }}>
                      <p className="t-title2">EP {ep.number}</p>
                      <p className="t-caption c2" style={{ marginTop: 2 }}>Aired {ep.airDate}</p>
                    </div>
                    <span className="t-body c2" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Icon name="comment" size={18} color="var(--text2)" /> {C.compact(ep.discussCount)}
                    </span>
                    <span style={{ width: 56, textAlign: 'right' }}>
                      {isNext ? <span className="t-overline accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <span className="live-dot" style={{ position: 'static', display: 'inline-block' }} />NEXT</span>
                        : <Icon name="chevr" size={20} color="var(--text3)" />}
                    </span>
                  </button>
                );
              })}
              {d.airing && <p className="t-body c2" style={{ marginTop: 8 }}>Episode {d.aired + 1} airs {d.nextLabel}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function EpisodeThread({ dramaId, ep }) {
  const store = useStore();
  const nav = useNav();
  const d = C.drama(dramaId);
  const key = `${dramaId}:${ep}`;
  const seed = C.episodeThreads[key] || [
    { id: 'x1', userId: 'u2', time: '3h', text: `Episode ${ep} is everything. Thread begins — be kind to first-timers, tag your spoilers.`, likes: 140, liked: false },
    { id: 'x2', userId: 'u5', time: '2h', text: 'the final five minutes. I am unwell.', likes: 88, liked: false },
  ];
  const extra = store.s.threadComments[key] || [];
  const comments = [...seed, ...extra];
  const [text, setText] = useState('');
  React.useEffect(() => { track('episode_thread_viewed', { drama_id: dramaId, episode_number: ep }); }, [dramaId, ep]);

  const send = () => { if (!text.trim()) return; store.addThreadComment(key, text.trim()); setText(''); };

  return (
    <div className="screen">
      <Header title={`Episode ${ep}`} sub={`${d.title} · ${C.compact((d.episodes?.[ep - 1]?.discussCount) || 2000)} discussing`} />
      <div className="scroll" style={{ padding: '0 16px' }}>
        <div className="banner" style={{ margin: '6px 0 10px' }}>
          <Icon name="eyeoff" size={20} color="var(--warning)" />
          <div><p className="b-t">Spoiler-permissive space</p><p className="b-b">You’ve opted into Episode {ep} spoilers here.</p></div>
        </div>
        <div>
          {comments.map(c => {
            const u = C.user(c.userId);
            return (
              <div key={c.id} className="thread-comment" style={{ borderBottom: '1px solid var(--hair-soft)' }}>
                <Avatar user={u} size={34} />
                <div className="body">
                  <p className="t-body-em" style={{ fontSize: 14 }}>{u.handle} <span className="c3" style={{ fontWeight: 400, float: 'right' }}>{c.time}</span></p>
                  <p className="t-body c1" style={{ fontSize: 14, lineHeight: '21px', marginTop: 2 }}>{c.text}</p>
                  <p className="t-caption c3" style={{ fontWeight: 600, marginTop: 8 }}>Reply</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Icon name="heart" size={16} color="var(--text3)" />
                  <p className="t-caption c3">{C.compact(c.likes)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="dm-input">
        <Avatar user={C.user('me')} size={36} />
        <input className="input" placeholder="Join the discussion…" value={text}
          onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
        <button className="send" onClick={send}><Icon name="send" size={18} /></button>
      </div>
    </div>
  );
}

export function ActorProfile({ id }) {
  const store = useStore();
  const nav = useNav();
  const a = C.actor(id);
  const following = store.s.followedActors.includes(id);
  return (
    <div className="screen">
      <div className="scroll no-tabbar">
        <div style={{ padding: 'calc(58px + env(safe-area-inset-top)) 20px 24px', position: 'relative' }}>
          <button className="back" style={{ position: 'absolute', left: 10, top: 'calc(50px + env(safe-area-inset-top))' }} onClick={() => nav.pop()}><Icon name="back" size={26} /></button>
          <button className="icon-btn" style={{ position: 'absolute', right: 12, top: 'calc(50px + env(safe-area-inset-top))' }} onClick={() => store.toast('Link copied')}><Icon name="share" size={22} /></button>
          <div style={{ textAlign: 'center' }}>
            <img src={a.photo} alt={a.name} style={{ width: 190, height: 190, borderRadius: '50%', objectFit: 'cover', margin: '0 auto', border: '1px solid var(--hairline)' }} />
            <h1 className="t-headline" style={{ marginTop: 20 }}>{a.name}</h1>
            <p className="t-body c2" style={{ marginTop: 6 }}>{C.compact(a.fans)} fans · {a.dramaIds.length} dramas this season</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18 }}>
              <Button kind={following ? 'secondary' : 'primary'} className="sm" style={{ minWidth: 140 }}
                onClick={() => store.toggleFollowActor(id)}>
                {following ? <><Icon name="check" size={16} sw={2.4} /> Following</> : 'Follow'}
              </Button>
              {a.channel && <Button kind="secondary" className="sm" onClick={() => nav.push('channel', { id: a.channel })}>
                <Icon name="radio" size={16} /> Channel
              </Button>}
            </div>
          </div>
        </div>
        <div style={{ padding: '0 20px' }}>
          {a.about && <>
            <Overline style={{ margin: '8px 0 10px' }}>ABOUT</Overline>
            <p className="t-body c2" style={{ lineHeight: '24px' }}>{a.about}</p>
          </>}
          <Overline style={{ margin: '26px 0 14px' }}>DRAMAS</Overline>
          <div className="grid2">
            {a.dramaIds.map(did => {
              const d = C.drama(did);
              return (
                <div key={did} role="button" onClick={() => nav.replace('drama', { id: did })}>
                  <div className="poster-tile"><img src={d.poster} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <p className="t-body-em" style={{ marginTop: 8, fontSize: 14 }}>{d.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
