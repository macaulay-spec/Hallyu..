import React, { useState, useMemo } from 'react';
import { Icon } from '../components/icons.jsx';
import { Avatar, Button, Header, IconButton, JoinButton, Overline, SearchBar, Sheet, PostCard } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';
import { communities as allCommunities, community as findCommunity, drama } from '../data/content.js';

function CommunityRow({ c }) {
  const store = useStore();
  const nav = useNav();
  const joined = store.s.joinedCommunities.includes(c.id);
  return (
    <div className="row-item" role="button" tabIndex={0} onClick={() => nav.push('community', { id: c.id })}>
      <Avatar initials={c.name[0]} size={52} />
      <div className="grow">
        <p className="t-title2" style={{ fontSize: 17 }}>{c.name}</p>
        <p className="t-caption c2">{(c.members / 1000).toFixed(1).replace(/\.0$/, '') + 'K'} members · {c.type}</p>
      </div>
      <div onClick={e => e.stopPropagation()}>
        <JoinButton joined={joined} onToggle={() => store.toggleJoin(c.id)} />
      </div>
    </div>
  );
}

export function CommunitiesScreen() {
  const { s } = useStore();
  const nav = useNav();
  const [q, setQ] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const list = s.communities.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));
  const mine = list.filter(c => s.joinedCommunities.includes(c.id));
  const discover = list.filter(c => !s.joinedCommunities.includes(c.id));

  return (
    <div className="screen">
      <div className="h1">
        <div className="row">
          <h1 className="t-headline">Communities</h1>
          <IconButton icon="search" onClick={() => nav.push('search', { tab: 'Communities' })} />
        </div>
        <div style={{ marginTop: 16 }}><SearchBar value={q} onChange={setQ} placeholder="Search communities" /></div>
      </div>
      <div className="scroll pad no-tabbar">
        {mine.length > 0 && <Overline>YOUR COMMUNITIES</Overline>}
        <div className="card" style={{ marginBottom: 8 }}>{mine.map((c, i) =>
          <div key={c.id}>{i > 0 && <hr className="hair-soft" style={{ marginLeft: 82 }} />}<CommunityRow c={c} /></div>)}
        </div>
        <Overline>DISCOVER</Overline>
        <div className="card">{discover.map((c, i) =>
          <div key={c.id}>{i > 0 && <hr className="hair-soft" style={{ marginLeft: 82 }} />}<CommunityRow c={c} /></div>)}
        </div>
        {list.length === 0 && <p className="t-body c3" style={{ textAlign: 'center', marginTop: 40 }}>No communities match “{q}”.</p>}
      </div>

      <button className="fab" onClick={() => setCreateOpen(true)}><Icon name="plus" size={28} /></button>
      <CreateCommunity open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}

function CreateCommunity({ open, onClose }) {
  const store = useStore();
  const nav = useNav();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('topic');
  const submit = () => {
    if (!name.trim()) return;
    store.createCommunity(name.trim());
    onClose();
  };
  return (
    <Sheet open={open} onClose={onClose}>
      <div style={{ overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <button onClick={onClose}><Icon name="close" size={26} /></button>
          <h2 className="t-title2" style={{ fontSize: 18 }}>Create a community</h2>
          <button className="t-title2 c2" style={{ opacity: name.trim() ? 1 : .4 }} onClick={submit}>Create</button>
        </div>
        <p className="t-overline c2" style={{ margin: '6px 0 8px' }}>NAME</p>
        <input className="input" placeholder="e.g. Needle-drop OST Club" value={name} onChange={e => setName(e.target.value)} maxLength={48} />
        <p className="t-overline c2" style={{ margin: '18px 0 8px' }}>DESCRIPTION</p>
        <textarea className="input" rows={4} placeholder="What is this community about? Who is it for?" value={desc} onChange={e => setDesc(e.target.value)} maxLength={200} />
        <p className="t-overline c2" style={{ margin: '18px 0 10px' }}>TYPE</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className={`chip ${type === 'topic' ? 'on' : ''}`} onClick={() => setType('topic')}>Topic</button>
          <button className={`chip ${type === 'drama' ? 'on' : ''}`} onClick={() => setType('drama')}>Drama-linked</button>
        </div>
        <p className="t-caption c3" style={{ marginTop: 10 }}>
          Drama-linked communities are created automatically for each drama. Topic communities are open to anyone.
        </p>
        <div className="banner" style={{ marginTop: 18 }}>
          <Icon name="shield" size={20} color="var(--warning)" />
          <div><p className="b-t">Community Guidelines</p><p className="b-b">Moderation applies from the first post.</p></div>
        </div>
        <Button kind="primary" style={{ marginTop: 20 }} disabled={!name.trim()} onClick={submit}>Create community</Button>
      </div>
    </Sheet>
  );
}

export function CommunityDetail({ id }) {
  const store = useStore();
  const nav = useNav();
  const c = store.s.communities.find(x => x.id === id) || findCommunity(id);
  const joined = store.s.joinedCommunities.includes(c.id);
  const posts = store.s.posts.filter(p => p.communityId === c.id);
  const d = c.linkedDrama ? drama(c.linkedDrama) : null;

  return (
    <div className="screen">
      <div className="top">
        <button className="back" onClick={() => nav.pop()}><Icon name="back" size={26} /></button>
        <Avatar initials={c.name[0]} size={40} />
        <div className="title-wrap">
          <h1 className="t-title2">{c.name}</h1>
          <p className="t-caption c2">{(c.members / 1000).toFixed(1).replace(/\.0$/, '') + 'K'} members</p>
        </div>
        <IconButton icon="more" size={20} />
      </div>
      <div style={{ display: 'flex', gap: 12, padding: '4px 16px 16px' }}>
        <Button kind={joined ? 'secondary' : 'primary'} className="sm block" onClick={() => store.toggleJoin(c.id)}>
          {joined ? <><Icon name="check" size={17} sw={2.4} /> Joined</> : 'Join'}
        </Button>
        <Button kind={joined ? 'primary' : 'secondary'} className="sm block" onClick={() => nav.push('composer', { communityId: c.id })}>New post</Button>
      </div>
      <div className="scroll pad no-tabbar" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {d && <button className="card" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left' }}
          onClick={() => nav.push('drama', { id: d.id })}>
          <img src={d.poster} alt="" style={{ width: 44, height: 64, objectFit: 'cover', borderRadius: 8 }} />
          <div style={{ flex: 1 }}>
            <p className="t-body-em">{d.title}</p>
            <p className="t-caption c2">Linked drama · {d.rating} rating</p>
          </div>
          <Icon name="chevr" size={18} color="var(--text3)" />
        </button>}
        {posts.length === 0
          ? <div className="empty" style={{ paddingTop: 70 }}><Icon name="communities" size={36} color="var(--text3)" /><p className="t-body c2" style={{ marginTop: 12 }}>No posts yet. Start the conversation.</p></div>
          : posts.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </div>
  );
}
