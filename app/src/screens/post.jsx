import React, { useState } from 'react';
import { Icon } from '../components/icons.jsx';
import { Avatar, Header, IconButton, SpoilerMedia } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';
import * as C from '../data/content.js';

export function PostDetail({ id }) {
  const store = useStore();
  const nav = useNav();
  const post = store.s.posts.find(p => p.id === id) || C.posts.find(p => p.id === id);
  const u = C.user(post.userId);
  const d = post.dramaId ? C.drama(post.dramaId) : null;
  const [text, setText] = useState('');
  const liked = store.s.likedPosts[post.id] ?? post.liked;
  const saved = store.s.savedPosts[post.id] ?? post.saved;
  const likes = post.likes + (liked && !post.liked ? 1 : 0) - (!liked && post.liked ? 1 : 0);
  const seedComments = C.postComments[id] || [];
  const comments = [...seedComments, ...(store.s.extraComments[id] || [])];

  const send = () => { if (!text.trim()) return; store.addComment(id, text.trim()); setText(''); };

  return (
    <div className="screen">
      <Header title="Post" right={[{ icon: 'more' }]} />
      <div className="scroll" style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', gap: 12, margin: '8px 0 12px' }}>
          <div role="button" onClick={() => nav.push('user', { id: u.id })}><Avatar user={u} size={42} /></div>
          <div style={{ flex: 1 }}>
            <p className="t-body-em">{u.name}</p>
            <p className="t-caption c3">@{u.handle} · {post.time}</p>
          </div>
          {d && <button className="chip small" onClick={() => nav.replace('drama', { id: d.id })}>{d.title}</button>}
        </div>
        <p className="t-body c1" style={{ lineHeight: '24px' }}>{post.text}</p>
        {post.media && <div style={{ margin: '14px 0' }}><SpoilerMedia src={post.media} h={post.mediaH || 250} spoiler={post.spoiler} /></div>}

        <div className="post-actions" style={{ padding: '14px 0', borderBottom: '1px solid var(--hairline)' }}>
          <span className={`act ${liked ? 'liked' : ''}`}>
            <button onClick={() => store.toggleLikePost(post.id)}><Icon name="heart" size={21} fill={liked} color={liked ? 'var(--accent)' : 'var(--text2)'} /></button>
            {C.compact(likes)}
          </span>
          <span className="act"><Icon name="comment" size={21} color="var(--text2)" />{C.compact(post.comments)}</span>
          <span className="act"><button onClick={() => store.toast('Link copied')}><Icon name="share" size={21} color="var(--text2)" /></button></span>
          <span className="sp" />
          <span className="act"><button onClick={() => store.toggleSavePost(post.id)}><Icon name="bookmark" size={21} fill={saved} color={saved ? 'var(--text1)' : 'var(--text2)'} /></button></span>
        </div>

        <p className="t-overline c2" style={{ margin: '16px 0 4px' }}>{post.comments} COMMENTS</p>
        {comments.map(c => {
          const cu = C.user(c.userId);
          return (
            <div key={c.id} className="thread-comment" style={{ borderBottom: '1px solid var(--hair-soft)' }}>
              <Avatar user={cu} size={32} />
              <div className="body">
                <p className="t-body-em" style={{ fontSize: 14 }}>{cu.handle} <span className="c3" style={{ fontWeight: 400, float: 'right' }}>{c.time}</span></p>
                <p className="t-body c2" style={{ fontSize: 14, lineHeight: '21px', marginTop: 2 }}>{c.text}</p>
                <p className="t-caption c3" style={{ fontWeight: 600, marginTop: 8 }}>Reply</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Icon name="heart" size={15} color="var(--text3)" /><p className="t-caption c3">{C.compact(c.likes)}</p>
              </div>
            </div>
          );
        })}
        {comments.length === 0 && <p className="t-body c3" style={{ padding: '30px 0', textAlign: 'center' }}>Be the first to comment.</p>}
      </div>
      <div className="dm-input">
        <Avatar user={C.user('me')} size={36} />
        <input className="input" placeholder="Add a comment…" value={text}
          onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
        <button className="send" onClick={send}><Icon name="send" size={18} /></button>
      </div>
    </div>
  );
}
