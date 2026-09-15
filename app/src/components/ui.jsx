import React, { useState, useEffect } from 'react';
import { Icon, Mark, Wordmark } from './icons.jsx';
import { useStore } from '../data/store.jsx';
import { useNav, TABS } from '../nav.jsx';
import * as C from '../data/content.js';

export function Avatar({ user, size = 40, ring = false, photo = null, initials = null, style }) {
  const src = photo || (user && user.photo);
  const txt = initials || (user && user.initials) || '?';
  return (
    <div className="av" style={{ width: size, height: size, fontSize: size * 0.36,
      ...(ring ? { boxShadow: '0 0 0 1px var(--hairline)' } : {}), ...style }}>
      {src ? <img src={src} alt="" /> : txt}
    </div>
  );
}

export function Button({ kind = 'primary', className = '', children, ...rest }) {
  return <button className={`btn ${kind} ${className}`} {...rest}>{children}</button>;
}

export function Chip({ on, small, children, onClick, style }) {
  return <button className={`chip ${small ? 'small' : ''} ${on ? 'on' : ''}`} style={style} onClick={onClick}>{children}</button>;
}

export function Toggle({ on, onChange }) {
  return <button className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)} aria-pressed={on} />;
}

export function Segmented({ tabs, active, onChange }) {
  return (
    <div className="seg">
      {tabs.map(t => <button key={t} className={t === active ? 'on' : ''} onClick={() => onChange(t)}>{t}</button>)}
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder = 'Search dramas, actors, communities', autoFocus, onClear, right }) {
  return (
    <div className="searchbar">
      <Icon name="search" size={20} color="var(--text3)" />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} autoFocus={autoFocus} />
      {value ? <button onClick={() => { onChange(''); onClear?.(); }}><Icon name="close" size={18} color="var(--text3)" /></button> : right}
    </div>
  );
}

export function Sheet({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <>
      <div className="sheet-scrim" onClick={onClose} />
      <div className="sheet">
        <div className="sheet-handle" />
        {title && <h3 className="t-title" style={{ textAlign: 'center', marginBottom: 10 }}>{title}</h3>}
        {children}
      </div>
    </>
  );
}

export function IconButton({ icon, size = 22, color = 'var(--text1)', badge, onClick, sw = 1.8, style }) {
  return (
    <button className="icon-btn" onClick={onClick} style={style}>
      <Icon name={icon} size={size} color={color} sw={sw} />
      {badge && <span className="dot-badge" />}
    </button>
  );
}

export function Header({ title, sub, back = true, right = [], transparent = false }) {
  const nav = useNav();
  return (
    <div className="top" style={transparent ? { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, background: 'linear-gradient(to bottom, rgba(0,0,0,.5), transparent)' } : {}}>
      {back && <button className="back" onClick={() => nav.pop()}><Icon name="back" size={26} /></button>}
      <div className="title-wrap">
        <h1 className="t-title" style={{ lineHeight: '24px' }}>{title}</h1>
        {sub && <p className="t-caption c2">{sub}</p>}
      </div>
      {right.map((r, i) =>
        React.isValidElement(r) ? React.cloneElement(r, { key: i }) :
        <IconButton key={i} icon={r.icon} onClick={r.onClick} badge={r.badge} />)}
    </div>
  );
}

export function SpoilerMedia({ src, h = 230, spoiler, radius = 12 }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="post-media" style={{ height: h, position: 'relative' }}>
      <img src={src} alt="" className={spoiler && !revealed ? 'spoiler-blur' : ''} style={{ height: h }} />
      {spoiler && !revealed && (
        <button className="spoiler-cover" style={{ borderRadius: radius }} onClick={() => setRevealed(true)}>
          <span style={{ textAlign: 'center' }}>
            <Icon name="eyeoff" size={22} color="var(--text3)" />
            <span className="t-overline c3" style={{ display: 'block', marginTop: 6 }}>Spoiler · tap to reveal</span>
          </span>
        </button>
      )}
    </div>
  );
}

export function PostCard({ post, showCommunity = false }) {
  const store = useStore();
  const nav = useNav();
  const u = C.user(post.userId);
  const d = post.dramaId ? C.drama(post.dramaId) : null;
  const liked = store.s.likedPosts[post.id] ?? post.liked;
  const saved = store.s.savedPosts[post.id] ?? post.saved;
  const likes = post.likes + (liked && !post.liked ? 1 : 0) - (!liked && post.liked ? 1 : 0);
  const tag = d ? d.title : (post.communityId && showCommunity ? C.community(post.communityId)?.name : null);

  return (
    <article className="card post" onClick={() => nav.push('post', { id: post.id })}>
      <div className="post-head">
        <div onClick={e => { e.stopPropagation(); nav.push('user', { id: u.id }); }}>
          <Avatar user={u} size={40} />
        </div>
        <div className="who">
          <p className="t-body-em">{u.name}</p>
          <p className="t-caption c3">@{u.handle} · {post.time}</p>
        </div>
        {tag ? (
          <button className="chip small feed-tag" onClick={e => { e.stopPropagation(); d ? nav.push('drama', { id: d.id }) : nav.push('community', { id: post.communityId }); }}>
            {tag.length > 16 ? tag.slice(0, 15) + '…' : tag}
          </button>
        ) : (
          <button onClick={e => e.stopPropagation()}><Icon name="more" size={20} color="var(--text3)" /></button>
        )}
      </div>

      {post.text && <p className="t-body c1">{post.text}</p>}
      {post.media && <div onClick={e => e.stopPropagation()}><SpoilerMedia src={post.media} h={post.mediaH || 230} spoiler={post.spoiler} /></div>}

      <div className="post-actions" onClick={e => e.stopPropagation()}>
        <span className={`act ${liked ? 'liked' : ''}`}>
          <button onClick={() => store.toggleLikePost(post.id)}><Icon className="ic" name="heart" size={20} fill={liked} color={liked ? 'var(--accent)' : 'var(--text2)'} /></button>
          {C.compact(likes)}
        </span>
        <span className="act">
          <button onClick={() => nav.push('post', { id: post.id })}><Icon name="comment" size={20} color="var(--text2)" /></button>
          {C.compact(post.comments)}
        </span>
        <span className="act"><button onClick={() => store.toast('Link copied')}><Icon name="share" size={20} color="var(--text2)" /></button></span>
        <span className="sp" />
        <span className="act"><button onClick={() => store.toggleSavePost(post.id)}><Icon className="ic" name="bookmark" size={20} color={saved ? 'var(--text1)' : 'var(--text2)'} fill={saved} /></button></span>
      </div>
    </article>
  );
}

export function EmptyState({ title = 'Your feed is quiet', body = 'Follow a few dramas to fill your feed.', icon = 'explore' }) {
  return (
    <div className="empty">
      <div className="em-mark"><Mark size={40} color="var(--text3)" /></div>
      <p className="t-title2">{title}</p>
      <p className="t-body c2" style={{ marginTop: 6 }}>{body}</p>
    </div>
  );
}

export function TabBar() {
  const nav = useNav();
  const { s } = useStore();
  const unread = s.conversations.some(c => c.unread);
  return (
    <nav className="tabbar">
      {TABS.map(t => (
        <button key={t.id} className={nav.tab === t.id ? 'on' : ''} onClick={() => nav.setTab(t.id)}>
          <Icon name={t.icon} size={24} sw={1.7} color={nav.tab === t.id ? 'var(--text1)' : 'var(--text3)'} />
          {t.id === 'messages' && unread && nav.tab !== 'messages' && <span className="dot-badge" style={{ top: 8, right: 'calc(50% - 16px)' }} />}
          <span className="lbl">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function Overline({ children, style }) {
  return <p className="t-overline c3" style={{ margin: '18px 4px 10px', ...style }}>{children}</p>;
}

export function Toast() {
  const { s } = useStore();
  if (!s.toast) return null;
  return <div className="toast">{s.toast}</div>;
}

export function FollowButton({ following, onToggle, small = false }) {
  return (
    <Button kind={following ? 'secondary' : 'primary'} className={small ? 'xs' : 'sm'}
      style={small ? {} : { minWidth: 112 }} onClick={onToggle}>
      {following ? (<><Icon name="check" size={16} sw={2.4} /> Following</>) : 'Follow'}
    </Button>
  );
}

export function JoinButton({ joined, onToggle }) {
  return (
    <Button kind={joined ? 'secondary' : 'primary'} className="xs" style={{ minWidth: 92 }} onClick={onToggle}>
      {joined ? (<><Icon name="check" size={15} sw={2.4} /> Joined</>) : 'Join'}
    </Button>
  );
}

export function Spinner() {
  return <div className="empty"><div className="skeleton" style={{ width: 60, height: 60, borderRadius: '50%', margin: '0 auto 16px', opacity: .4 }} /></div>;
}

export function PosterTile({ drama, h, onClick }) {
  return (
    <div className="poster-tile" onClick={onClick} role="button">
      <img src={drama.poster} alt={drama.title} />
    </div>
  );
}
