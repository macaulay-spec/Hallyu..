import React, { useEffect } from 'react';
import { Icon } from '../components/icons.jsx';
import { Avatar, Overline } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';

const ICONS = { reply: 'comment', mention: 'comment', channel: 'radio' };

export function NotificationsScreen() {
  const { s, readAllNotifs } = useStore();
  const nav = useNav();
  useEffect(() => { const t = setTimeout(readAllNotifs, 1200); return () => clearTimeout(t); }, []);

  const groups = [
    { title: 'NEW EPISODES', items: s.notifs.filter(n => n.kind === 'episode') },
    { title: 'REPLIES & MENTIONS', items: s.notifs.filter(n => n.kind === 'reply' || n.kind === 'mention') },
    { title: 'CHANNELS', items: s.notifs.filter(n => n.kind === 'channel') },
  ];

  return (
    <div className="screen">
      <div className="h1"><h1 className="t-headline">Notifications</h1></div>
      <div className="scroll pad no-tabbar">
        {groups.map(g => g.items.length > 0 && (
          <div key={g.title}>
            <Overline>{g.title}</Overline>
            <div className="card">
              {g.items.map((n, i) => (
                <button key={n.id} className="row-item"
                  style={{ alignItems: 'center' }}
                  onClick={() => nav.push(n.target.screen, n.target.params)}>
                  {i > 0 && <span />}
                  {n.poster
                    ? <img src={n.poster} alt="" style={{ width: 52, height: 64, objectFit: 'cover', borderRadius: 8, flex: 'none' }} />
                    : <div className="av" style={{ background: 'var(--surface2)', width: 48, height: 48 }}>
                        <Icon name={ICONS[n.kind] || 'bell'} size={20} color="var(--text2)" />
                      </div>}
                  <div className="grow">
                    <p className="t-body-em" style={{ fontSize: 16 }}>{n.title}</p>
                    <p className="t-caption c2" style={{ marginTop: 2 }}>{n.body}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, alignSelf: 'flex-start', paddingTop: 6 }}>
                    <span className="t-caption c3">{n.time}</span>
                    {!n.read && <span className="notif-dot" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
