import React, { useState } from 'react';
import { Icon, Wordmark } from '../components/icons.jsx';
import { IconButton, PostCard, EmptyState, Spinner } from '../components/ui.jsx';
import { useStore, useRankedFeed } from '../data/store.jsx';
import { useNav } from '../nav.jsx';

export function HomeScreen() {
  const store = useStore();
  const nav = useNav();
  const feed = useRankedFeed();
  const [loading, setLoading] = useState(false);
  const unreadNotifs = store.s.notifs.some(n => !n.read);

  // Pull-to-refresh: re-ranks the feed (per PRD #3, not a page-1 refetch).
  const startY = React.useRef(null);
  const onTouchStart = e => { if (e.currentTarget.scrollTop === 0) startY.current = e.touches[0].clientY; };
  const onTouchEnd = e => {
    if (startY.current == null) return;
    if (e.changedTouches[0].clientY - startY.current > 90) {
      setLoading(true);
      setTimeout(() => setLoading(false), 650);
    }
    startY.current = null;
  };

  return (
    <div className="screen">
      <div className="h1">
        <div className="row">
          <Wordmark size={30} />
          <div style={{ display: 'flex', gap: 4 }}>
            <IconButton icon="search" onClick={() => nav.push('search')} />
            <IconButton icon="bell" badge={unreadNotifs} onClick={() => nav.push('notifications')} />
          </div>
        </div>
      </div>
      <div className="scroll pad" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {loading ? (
          <>
            {[0, 1, 2].map(i => (
              <div key={i} className="card" style={{ padding: 16, marginBottom: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                  <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton" style={{ width: 110, height: 13, marginBottom: 8 }} />
                    <div className="skeleton" style={{ width: 160, height: 10 }} />
                  </div>
                </div>
                <div className="skeleton" style={{ width: '90%', height: 12, marginBottom: 8 }} />
                <div className="skeleton" style={{ width: '70%', height: 12, marginBottom: 14 }} />
                <div className="skeleton" style={{ width: '100%', height: 210 }} />
              </div>
            ))}
          </>
        ) : feed.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {feed.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </div>
      <button className="fab" onClick={() => nav.push('composer')} aria-label="New post"><Icon name="plus" size={28} /></button>
    </div>
  );
}
