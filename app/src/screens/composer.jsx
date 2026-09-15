import React, { useState } from 'react';
import { Icon } from '../components/icons.jsx';
import { Avatar, Button, Sheet } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';
import { user as findUser, dramas, actors, communities, compact } from '../data/content.js';

export function Composer({ presetCommunity = null, presetDrama = null, communityId: presetCid = null, dramaId: presetDid = null }) {
  const store = useStore();
  const nav = useNav();
  const [text, setText] = useState('');
  const [dramaId, setDramaId] = useState(presetDrama || presetDid);
  const [actorId, setActorId] = useState(null);
  const [communityId, setCommunityId] = useState(presetCommunity || presetCid);
  const [spoiler, setSpoiler] = useState(false);
  const [picker, setPicker] = useState(null); // 'drama' | 'actor' | 'community'
  const [media, setMedia] = useState(null);
  const [typePicker, setTypePicker] = useState(false);
  const me = findUser('me');

  const d = dramaId ? dramas.find(x => x.id === dramaId) : null;
  const a = actorId ? actors.find(x => x.id === actorId) : null;
  const c = communityId ? store.s.communities.find(x => x.id === communityId) : null;

  const post = () => {
    if (!text.trim() && !media) return;
    store.addPost({ text: text.trim(), dramaId, actorId, communityId, spoiler, media });
    nav.pop();
  };

  return (
    <div className="screen modal">
      <div className="top">
        <button className="back" onClick={() => nav.pop()}><Icon name="close" size={26} /></button>
        <h1 className="t-title" style={{ flex: 1, textAlign: 'center' }}>New post</h1>
        <Button kind="primary" className="xs" style={{ minWidth: 76, height: 40, fontSize: 16 }}
          disabled={!text.trim() && !media} onClick={post}>Post</Button>
      </div>

      <div className="scroll" style={{ padding: '8px 20px 16px' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Avatar user={me} size={42} />
          <div>
            <p className="t-body-em">You</p>
            <p className="t-caption c3">@you</p>
          </div>
        </div>
        <textarea
          className="input" rows={7} maxLength={500} autoFocus
          placeholder="What are you feeling about what you’re watching?"
          value={text} onChange={e => setText(e.target.value)}
          style={{ background: 'transparent', border: 0, fontSize: 17, padding: 0, lineHeight: '26px' }} />
        {media && (
          <div className="post-media" style={{ height: 220, marginBottom: 12 }}>
            <img src={media} alt="" style={{ height: 220 }} />
            <button onClick={() => setMedia(null)} style={{ position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,.6)', color: '#fff', display: 'grid', placeItems: 'center' }}>
              <Icon name="close" size={16} />
            </button>
          </div>
        )}
        <div style={{ textAlign: 'right' }}><span className="t-caption c3">{text.length} / 500</span></div>
        <hr className="hairline" style={{ margin: '12px 0' }} />

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="chip small" style={d ? { background: 'var(--surface2)', borderColor: 'var(--text2)', color: 'var(--text1)' } : {}}
            onClick={() => setPicker('drama')}>
            <Icon name="tag" size={14} color="currentColor" style={{ marginRight: 6, verticalAlign: -2 }} />
            {d ? d.title : 'Drama'}
          </button>
          <button className={`chip small ${a ? 'on' : ''}`} onClick={() => setPicker('actor')}>
            {a ? a.name : '+ Actor'}
          </button>
          <button className={`chip small ${c ? 'on' : ''}`} onClick={() => setPicker('community')}>
            {c ? c.name : '+ Community'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
          <Icon name="eyeoff" size={20} color="var(--text3)" />
          <div style={{ flex: 1 }}>
            <p className="t-body-em">Contains spoilers</p>
            <p className="t-caption c3">Blurs media and truncates text in feeds</p>
          </div>
          <button className={`toggle ${spoiler ? 'on' : ''}`} onClick={() => setSpoiler(v => !v)} />
        </div>
      </div>

      {/* attach bar */}
      <div style={{ flex: 'none', padding: '10px 20px calc(16px + env(safe-area-inset-bottom))', borderTop: '1px solid var(--hairline)', display: 'flex', gap: 22 }}>
        <button className="c2" onClick={() => setMedia('/assets/poster-weight-of-snow.png')}><Icon name="image" size={24} color="var(--text2)" /></button>
        <button className="c2" onClick={() => setMedia('/assets/poster-midnight-seongsu.png')}><Icon name="video" size={24} color="var(--text2)" /></button>
        <button className="c2" onClick={() => setTypePicker(true)}><Icon name="camera" size={24} color="var(--text2)" /></button>
      </div>

      <Sheet open={!!picker} onClose={() => setPicker(null)} title={`Tag a ${picker || ''}`}>
        <div style={{ overflowY: 'auto', maxHeight: 360 }}>
          {(picker === 'drama' ? dramas.map(x => ({ id: x.id, title: x.title, sub: x.genres.join(' · '), img: x.poster }))
            : picker === 'actor' ? actors.map(x => ({ id: x.id, title: x.name, sub: `${compact(x.fans)} fans`, img: x.photo }))
            : store.s.communities.map(x => ({ id: x.id, title: x.name, sub: `${compact(x.members)} members`, initials: x.name[0] }))
          ).map(o => (
            <button key={o.id} className="row-item" onClick={() => {
              if (picker === 'drama') setDramaId(o.id);
              if (picker === 'actor') setActorId(o.id);
              if (picker === 'community') setCommunityId(o.id);
              setPicker(null);
            }}>
              {o.img ? <img src={o.img} alt="" style={{ width: 44, height: picker === 'actor' ? 44 : 60, objectFit: 'cover', borderRadius: picker === 'actor' ? '50%' : 8 }} />
                     : <span className="av" style={{ width: 44, height: 44 }}>{o.initials}</span>}
              <div className="grow"><p className="t-body-em">{o.title}</p><p className="t-caption c3">{o.sub}</p></div>
              <Icon name="chevr" size={16} color="var(--text3)" />
            </button>
          ))}
          <button className="row-item c3" onClick={() => {
            if (picker === 'drama') setDramaId(null);
            if (picker === 'actor') setActorId(null);
            if (picker === 'community') setCommunityId(null);
            setPicker(null);
          }}>Remove tag</button>
        </div>
      </Sheet>

      <Sheet open={typePicker} onClose={() => setTypePicker(false)}>
        <button className="sheet-opt" onClick={() => { setMedia('/assets/poster-weight-of-snow.png'); setTypePicker(false); }}>
          <Icon name="image" size={22} color="var(--text2)" /> Photo from library
        </button>
        <button className="sheet-opt" onClick={() => { setMedia('/assets/poster-midnight-seongsu.png'); setTypePicker(false); }}>
          <Icon name="video" size={22} color="var(--text2)" /> Video · up to 60 seconds
        </button>
        <button className="sheet-opt" onClick={() => setTypePicker(false)}>
          <Icon name="camera" size={22} color="var(--text2)" /> Take photo
        </button>
      </Sheet>
    </div>
  );
}
