import React, { useState } from 'react';
import { Icon, Mark, Wordmark } from '../components/icons.jsx';
import { Button } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';
import { dramas } from '../data/content.js';

function Shell({ children }) {
  return <div className="screen" style={{ padding: 'calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))', overflowY: 'auto' }}>{children}</div>;
}

export function Welcome() {
  const nav = useNav();
  const fan = ['poster-weight-of-snow.png', 'poster-signal-fire.png', 'poster-midnight-seongsu.png']
    .map(f => `/assets/${f}`);
  return (
    <Shell>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
        <Mark size={34} /><Wordmark size={28} />
      </div>

      <div style={{ marginTop: 60 }}>
        <h1 className="t-display">Every drama.<br />Every fan.<br /><span className="c3">One home.</span></h1>
        <p className="t-body c2" style={{ marginTop: 20, fontSize: 17, lineHeight: '26px', maxWidth: 300 }}>
          Follow the shows you love, talk episode by episode, and find the people watching right now.
        </p>
      </div>

      <div style={{ position: 'relative', height: 300, margin: '48px -10px 0' }}>
        {fan.map((src, i) => (
          <img key={src} src={src} alt="" style={{
            position: 'absolute', top: 0, width: 180, height: 260, objectFit: 'cover',
            borderRadius: 20, left: '50%',
            transform: `translateX(-50%) translateX(${(i - 1) * 84}px) rotate(${(i - 1) * 7}deg)`,
            zIndex: i === 1 ? 3 : 2, opacity: i === 1 ? 1 : .9,
            boxShadow: '0 16px 48px rgba(0,0,0,.6)',
          }} />
        ))}
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button kind="primary" onClick={() => nav.push('signup')}>Create account</Button>
        <Button kind="ghost" onClick={() => nav.push('login')}>Log in</Button>
      </div>
    </Shell>
  );
}

function SocialButtons({ onSocial }) {
  return (
    <>
      <Button kind="secondary" onClick={onSocial}><Icon name="apple" size={20} fill /> Continue with Apple</Button>
      <Button kind="secondary" onClick={onSocial}><Icon name="google" size={20} /> Continue with Google</Button>
      <p className="t-caption c3" style={{ textAlign: 'center', margin: '4px 0 0' }}>or</p>
    </>
  );
}

export function Signup() {
  const nav = useNav();
  const store = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const go = () => { store.signup(email.trim() || 'fan@hallyu.app'); nav.reset('onboarding-genres'); };
  return (
    <Shell>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
        <button className="back" onClick={() => nav.pop()} style={{ marginLeft: -10 }}><Icon name="back" size={26} /></button>
        <Wordmark size={22} />
      </div>
      <h1 className="t-headline" style={{ marginBottom: 8 }}>Create your account</h1>
      <p className="t-body c2" style={{ marginBottom: 28 }}>One home for every drama you love.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SocialButtons onSocial={go} />
        <div><label className="t-overline field-label">Email</label>
          <input className="input" inputMode="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div><label className="t-overline field-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input className="input" type={show ? 'text' : 'password'} placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
            <button style={{ position: 'absolute', right: 12, top: 15 }} onClick={() => setShow(v => !v)}><Icon name="eyeoff" size={20} color="var(--text3)" /></button>
          </div>
          {password.length > 0 && <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: password.length >= (i + 1) * 4 ? (i === 2 ? 'var(--success)' : 'var(--warning)') : 'var(--surface3)' }} />)}
          </div>}
        </div>
      </div>
      <p className="t-caption c3" style={{ marginTop: 14 }}>
        By continuing you agree to our Terms and acknowledge the Privacy Policy.
      </p>
      <div style={{ marginTop: 28 }}><Button kind="primary" onClick={go}>Create account</Button></div>
    </Shell>
  );
}

export function Login() {
  const nav = useNav();
  const store = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const go = () => { store.login(email.trim() || 'fan@hallyu.app'); nav.reset(store.s.onboarded ? 'tabs' : 'onboarding-genres'); };
  return (
    <Shell>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
        <button className="back" onClick={() => nav.pop()} style={{ marginLeft: -10 }}><Icon name="back" size={26} /></button>
        <Wordmark size={22} />
      </div>
      <h1 className="t-headline" style={{ marginBottom: 28 }}>Welcome back</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div><label className="t-overline field-label">Email</label>
          <input className="input" inputMode="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div><label className="t-overline field-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input className="input" type={show ? 'text' : 'password'} placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} />
            <button style={{ position: 'absolute', right: 12, top: 15 }} onClick={() => setShow(v => !v)}><Icon name="eyeoff" size={20} color="var(--text3)" /></button>
          </div>
        </div>
        <button className="t-caption c2" style={{ alignSelf: 'flex-end' }} onClick={() => nav.push('forgot')}>Forgot password?</button>
      </div>
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button kind="primary" onClick={go}>Log in</Button>
        <SocialButtons onSocial={go} />
      </div>
    </Shell>
  );
}

export function Forgot() {
  const nav = useNav();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <Shell>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
        <button className="back" onClick={() => nav.pop()} style={{ marginLeft: -10 }}><Icon name="back" size={26} /></button>
      </div>
      <h1 className="t-headline" style={{ marginBottom: 8 }}>{sent ? 'Check your email' : 'Forgot password'}</h1>
      <p className="t-body c2" style={{ marginBottom: 28 }}>
        {sent ? `We sent a reset link to ${email || 'your inbox'}.` : 'Enter your email and we’ll send a reset link.'}
      </p>
      {!sent && <>
        <input className="input" inputMode="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        <div style={{ marginTop: 28 }}><Button kind="primary" onClick={() => setSent(true)}>Send reset link</Button></div>
      </>}
      {sent && <Button kind="primary" onClick={() => nav.pop()}>Back to log in</Button>}
    </Shell>
  );
}
