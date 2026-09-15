import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../components/icons.jsx';
import { Avatar, Header, IconButton, Overline, SearchBar, Sheet } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';
import { users, user as findUser, channels, channel as findChannel, broadcasts, compact } from '../data/content.js';

function ago(mins) {
  if (mins < 1) return 'now';
  if (mins < 60) return mins + 'm';
  if (mins < 1440) return Math.round(mins / 60) + 'h';
  return Math.round(mins / 1440) + 'd';
}

export function MessagesScreen() {
  const { s } = useStore();
  const nav = useNav();
  const [q, setQ] = useState('');
  const convos = [...s.conversations].sort((a, b) => b.lastMin - a.lastMin)
    .filter(c => { const u = findUser(c.userId); return u.name.toLowerCase().includes(q.toLowerCase()) || u.handle.includes(q.toLowerCase()); });

  return (
    <div className="screen">
      <div className="h1">
        <div className="row">
          <h1 className="t-headline">Messages</h1>
          <IconButton icon="edit" onClick={() => nav.push('new-message')} />
        </div>
        <div style={{ marginTop: 16 }}><SearchBar value={q} onChange={setQ} placeholder="Search conversations" /></div>
      </div>
      <div className="scroll pad no-tabbar">
        <button className="row-item" onClick={() => nav.push('channels')}
          style={{ borderBottom: '1px solid var(--hairline)', marginBottom: 8 }}>
          <div className="av" style={{ background: 'var(--surface2)' }}><Icon name="radio" size={22} color="var(--text2)" /></div>
          <div className="grow"><p className="t-title2" style={{ fontSize: 17 }}>Channels</p>
            <p className="t-caption c2">One-way broadcasts from creators</p></div>
          <Icon name="chevr" size={18} color="var(--text3)" />
        </button>
        {convos.map(c => {
          const u = findUser(c.userId);
          return (
            <button key={c.id} className="row-item" onClick={() => nav.push('dm', { id: c.id })}>
              <div style={{ position: 'relative' }}>
                <Avatar user={u} size={52} />
                {c.unread && <span className="notif-dot" style={{ position: 'absolute', top: 2, right: 2 }} />}
              </div>
              <div className="grow">
                <p className="t-title2" style={{ fontSize: 17 }}>{u.name}</p>
                <p className="t-caption" style={{ color: c.unread ? 'var(--text2)' : 'var(--text3)' }}>{c.last}</p>
              </div>
              <span className="t-caption c3">{ago(c.lastMin)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DMThread({ id }) {
  const store = useStore();
  const nav = useNav();
  const convo = store.s.conversations.find(c => c.id === id);
  const u = findUser(convo.userId);
  const [text, setText] = useState('');
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView?.({ behavior: 'smooth' }); }, [convo.messages.length]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setText('');
    store.sendMessage(convo.id, t);
    store.fakeReply(convo.id, convo.id);
  };

  return (
    <div className="screen">
      <div className="top">
        <button className="back" onClick={() => nav.pop()}><Icon name="back" size={26} /></button>
        <Avatar user={u} size={40} />
        <div className="title-wrap">
          <h1 className="t-title2">{u.name}</h1>
          <p className="t-caption success">active now</p>
        </div>
        <IconButton icon="more" size={20} />
      </div>
      <div className="scroll" style={{ padding: '12px 16px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {convo.messages.map(m => (
          <div key={m.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={`bubble ${m.from === 'me' ? 'me' : 'them'}`}>{m.text}</div>
            {m.time && m.from === 'me' && <span className="t-caption c3" style={{ alignSelf: 'flex-end', marginTop: 3 }}>{m.time}</span>}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="dm-input">
        <input className="input" placeholder="Message…" value={text}
          onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
        <button className="send" onClick={send}><Icon name="send" size={20} /></button>
      </div>
    </div>
  );
}

export function NewMessage() {
  const store = useStore();
  const nav = useNav();
  const [q, setQ] = useState('');
  const list = users.filter(u => !u.me && (u.name.toLowerCase().includes(q.toLowerCase()) || u.handle.includes(q.toLowerCase())));
  return (
    <div className="screen">
      <Header title="New message" />
      <div style={{ padding: '0 16px 12px' }}><SearchBar value={q} onChange={setQ} placeholder="Search people" autoFocus /></div>
      <div className="scroll pad no-tabbar">
        {list.map(u => (
          <button key={u.id} className="row-item" onClick={() => {
            const cid = store.s.conversations.find(x => x.userId === u.id)?.id || store.startConversation(u.id);
            nav.replace('dm', { id: cid });
          }}>
            <Avatar user={u} size={46} />
            <div className="grow"><p className="t-body-em">{u.name}</p><p className="t-caption c3">@{u.handle}</p></div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ChannelsList() {
  const { s } = useStore();
  const nav = useNav();
  const subs = channels.filter(c => s.subscribedChannels.includes(c.id));
  return (
    <div className="screen">
      <Header title="Channels" sub="One-way broadcasts from creators" />
      <div className="scroll pad no-tabbar">
        <Overline>SUBSCRIBED</Overline>
        {subs.map(c => (
          <button key={c.id} className="row-item" onClick={() => nav.push('channel', { id: c.id })}>
            <div style={{ position: 'relative' }}>
              <Avatar initials={c.initials} size={52} />
              <span style={{ position: 'absolute', bottom: -2, left: -2, width: 20, height: 20, borderRadius: '50%',
                background: 'var(--bg)', display: 'grid', placeItems: 'center' }}>
                <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--text1)', color: '#000', display: 'grid', placeItems: 'center' }}>
                  <Icon name="check" size={10} sw={3.4} />
                </span>
              </span>
            </div>
            <div className="grow">
              <p className="t-title2" style={{ fontSize: 17 }}>{c.name} {c.verified && <Icon name="check" size={13} sw={0} fill color="var(--text1)" style={{ display: 'inline', verticalAlign: -2 }} />}</p>
              <p className="t-caption c2">{compact(c.subs)} subscribers · broadcast 2h ago</p>
            </div>
            <Icon name="chevr" size={18} color="var(--text3)" />
          </button>
        ))}
        <Overline>FIND CHANNELS</Overline>
        <SearchBar value="" onChange={() => {}} placeholder="Search channels…" />
        <p className="t-body c2" style={{ marginTop: 22, fontSize: 15, lineHeight: '23px' }}>
          Channels broadcast to subscribers. You can react, and replies go to the owner’s DMs — not the channel.
        </p>
      </div>
    </div>
  );
}

export function ChannelDetail({ id }) {
  const store = useStore();
  const nav = useNav();
  const c = findChannel(id);
  const posts = broadcasts[id] || [];
  const subbed = store.s.subscribedChannels.includes(id);
  const actorOwner = c.ownerActor ? findUser // not used
    : null;

  return (
    <div className="screen">
      <div className="top">
        <button className="back" onClick={() => nav.pop()}><Icon name="back" size={26} /></button>
        <div style={{ position: 'relative' }}>
          <Avatar initials={c.initials} size={42} />
          <span style={{ position: 'absolute', bottom: -2, left: -2, width: 18, height: 18, borderRadius: '50%',
            background: 'var(--text1)', color: '#000', display: 'grid', placeItems: 'center' }}>
            <Icon name="check" size={10} sw={3.4} />
          </span>
        </div>
        <div className="title-wrap">
          <h1 className="t-title2">{c.name}</h1>
          <p className="t-caption c2">{compact(c.subs)} subscribers</p>
        </div>
        <button className={`btn xs ${subbed ? 'secondary' : 'primary'}`}
          style={{ minWidth: 118 }} onClick={() => store.toggleSubscribe(c.id)}>
          {subbed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      <div className="scroll pad no-tabbar" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {posts.map(b => (
          <div key={b.id} className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="t-title2" style={{ fontSize: 16 }}>{c.name}</p>
              <Icon name="radio" size={18} color="var(--text3)" />
            </div>
            <p className="t-caption c3">{b.time}</p>
            <p className="t-body" style={{ marginTop: 10 }}>{b.text}</p>
            {b.media && <div className="post-media" style={{ marginTop: 12, height: 200 }}>
              <img src={b.media} alt="" style={{ height: 200 }} />
            </div>}
            <div className="reactions-pill" style={{ marginTop: 14 }}>
              {b.reactions.map((r, i) => {
                const mine = store.s.reactions[`${c.id}:${b.id}`]?.[i];
                return (
                  <button key={i} className={[i === 0 ? '' : 'mid', i === b.reactions.length - 1 ? '' : 'mid', mine ? 'on' : ''].join(' ')}
                    onClick={() => store.reactBroadcast(c.id, b.id, i)}>
                    {r.label} {compact(r.count + (mine ? 1 : 0))}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '10px 16px calc(14px + env(safe-area-inset-bottom))', borderTop: '1px solid var(--hairline)', display: 'flex', gap: 10, alignItems: 'center', color: 'var(--text3)' }}>
        <Icon name="radio" size={18} />
        <span className="t-caption c2">Broadcast channel · replies go to the owner’s DMs</span>
      </div>
    </div>
  );
}
