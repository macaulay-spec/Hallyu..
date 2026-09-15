import React, { useState } from 'react';
import { Icon } from '../components/icons.jsx';
import { Button, Chip, SearchBar } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';
import { genres, dramas, actors, drama, actor, compact } from '../data/content.js';

let draft = { genres: [], dramaIds: [], actorIds: [] };

function Frame({ step, total, title, sub, optional, children, footer, onSkip }) {
  const nav = useNav();
  return (
    <div className="screen">
      <div style={{ padding: 'calc(20px + env(safe-area-inset-top)) 24px 0', flex: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 }}>
          <p className="t-overline c3">{optional ? `STEP ${step} OF ${total} · OPTIONAL` : `STEP ${step} OF ${total}`}</p>
          {onSkip && <button className="t-title2 c2" onClick={onSkip}>Skip</button>}
        </div>
        <h1 className="t-display" style={{ fontSize: 30, lineHeight: '36px' }}>{title}</h1>
        {sub && <p className="t-body c2" style={{ marginTop: 10, fontSize: 17 }}>{sub}</p>}
      </div>
      <div className="scroll" style={{ padding: '22px 24px 0' }}>{children}</div>
      <div className="sticky-bottom">{footer}</div>
    </div>
  );
}

export function OnboardingGenres() {
  const nav = useNav();
  const [sel, setSel] = useState(draft.genres);
  const toggle = (g) => {
    const next = sel.includes(g) ? sel.filter(x => x !== g) : [...sel, g];
    setSel(next); draft.genres = next;
  };
  return (
    <Frame step={1} total={3} title="What do you love?" sub="Pick at least 3 genres to shape your feed."
      footer={<>
        <p className="t-body c3">{sel.length} selected · minimum 3</p>
        <Button kind="primary" disabled={sel.length < 3} onClick={() => nav.reset('onboarding-dramas')}>Continue</Button>
      </>}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {genres.map(g => <Chip key={g} on={sel.includes(g)} onClick={() => toggle(g)}>{g}</Chip>)}
      </div>
    </Frame>
  );
}

export function OnboardingDramas() {
  const nav = useNav();
  const [sel, setSel] = useState(draft.dramaIds);
  const [q, setQ] = useState('');
  const toggle = (id) => {
    const next = sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id];
    setSel(next); draft.dramaIds = next;
  };
  const list = dramas.filter(d => d.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <Frame step={2} total={3} title="Follow your first dramas"
      footer={<>
        <p className="t-body c3">{sel.length} followed</p>
        <Button kind="primary" disabled={sel.length < 1} onClick={() => nav.reset('onboarding-actors')}>Continue</Button>
      </>}>
      <div style={{ marginBottom: 20 }}><SearchBar value={q} onChange={setQ} placeholder="Search dramas" /></div>
      <div className="grid3">
        {list.map(d => (
          <div key={d.id} onClick={() => toggle(d.id)} role="button">
            <div className={`poster-card ${sel.includes(d.id) ? 'sel' : ''}`} style={{ aspectRatio: '2/3' }}>
              <img src={d.poster} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {sel.includes(d.id) && <span className="check"><Icon name="check" size={16} sw={3} /></span>}
            </div>
            <p className="t-caption" style={{ marginTop: 6 }}>{d.title.length > 18 ? d.title.slice(0, 17) + '…' : d.title}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function OnboardingActors() {
  const nav = useNav();
  const [sel, setSel] = useState(draft.actorIds);
  const toggle = (id) => {
    const next = sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id];
    setSel(next); draft.actorIds = next;
  };
  const finish = () => nav.reset('notif-permission');
  return (
    <Frame step={3} total={3} optional title="Any favorite actors?" sub="You can do this later."
      onSkip={finish}
      footer={<Button kind="primary" onClick={finish}>Finish</Button>}>
      <div className="grid3">
        {actors.map(a => (
          <div key={a.id} onClick={() => toggle(a.id)} role="button" style={{ textAlign: 'center', marginBottom: 20 }}>
            <div className={`poster-card ${sel.includes(a.id) ? 'sel' : ''}`}
              style={{ aspectRatio: '1/1', borderRadius: '50%', margin: '0 auto', width: '92%' }}>
              <img src={a.photo} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              {sel.includes(a.id) && <span className="check"><Icon name="check" size={16} sw={3} /></span>}
            </div>
            <p className="t-caption c1" style={{ marginTop: 8, fontWeight: 600 }}>{a.name}</p>
            <p className="t-caption c3">{compact(a.fans)} fans</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function NotifPermission() {
  const nav = useNav();
  const store = useStore();
  const finish = () => {
    store.completeOnboarding(draft.genres, draft.dramaIds, draft.actorIds);
    draft = { genres: [], dramaIds: [], actorIds: [] };
    nav.reset('tabs');
  };
  return (
    <div className="screen" style={{ padding: 'calc(40px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))' }}>
      <div style={{ flex: 1, textAlign: 'center', paddingTop: 60 }}>
        <div style={{ width: 96, height: 96, borderRadius: 28, background: 'var(--surface2)', display: 'grid', placeItems: 'center', margin: '0 auto 28px', border: '1px solid var(--hairline)' }}>
          <Icon name="bell" size={42} color="var(--text1)" />
        </div>
        <h1 className="t-headline">Never miss an episode</h1>
        <p className="t-body c2" style={{ marginTop: 12, fontSize: 16, lineHeight: '24px', padding: '0 8px' }}>
          Get notified when followed dramas air, when friends reply, and when channels broadcast.
        </p>
        <div className="card" style={{ marginTop: 36, textAlign: 'left', padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[['bell', 'New episodes', 'Airing alerts for followed dramas'], ['comment', 'Replies & mentions', 'When fans respond to you'], ['radio', 'Channel broadcasts', 'Posts from creators you follow']].map(([ic, t, b]) => (
            <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Icon name={ic} size={20} color="var(--text2)" />
              <div style={{ flex: 1 }}><p className="t-body-em">{t}</p><p className="t-caption c3">{b}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button kind="primary" onClick={finish}>Enable notifications</Button>
        <Button kind="ghost" onClick={finish}>Not now</Button>
      </div>
    </div>
  );
}
