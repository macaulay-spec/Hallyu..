import React, { useState } from 'react';
import { Icon } from '../components/icons.jsx';
import { Avatar, Header, Overline, Toggle } from '../components/ui.jsx';
import { Button } from '../components/ui.jsx';
import { useStore } from '../data/store.jsx';
import { useNav } from '../nav.jsx';

function Row({ icon, label, sub, chevron = true, danger = false, right, onClick }) {
  return (
    <button className="row-item" onClick={onClick} style={{ padding: '13px 16px' }}>
      {icon && <Icon name={icon} size={20} color={danger ? 'var(--accent)' : 'var(--text2)'} />}
      <div className="grow">
        <p className="t-body" style={{ color: danger ? 'var(--accent)' : 'var(--text1)' }}>{label}</p>
        {sub && <p className="t-caption c3">{sub}</p>}
      </div>
      {right}
      {chevron && !right && <Icon name="chevr" size={17} color="var(--text3)" />}
    </button>
  );
}
const Group = ({ title, children }) => (
  <>
    {title && <Overline style={{ margin: '18px 4px 8px' }}>{title}</Overline>}
    <div className="card">{children}</div>
  </>
);

export function SettingsMain() {
  const store = useStore();
  const nav = useNav();
  return (
    <div className="screen">
      <Header title="Settings" />
      <div className="scroll pad no-tabbar">
        <Group title="ACCOUNT">
          <Row icon="profile" label="Account" sub="Email, handle, password" onClick={() => nav.push('account')} />
          <Row icon="bell" label="Notification preferences" onClick={() => nav.push('notif-prefs')} />
          <Row icon="lock" label="Privacy & security" onClick={() => nav.push('privacy')} />
        </Group>
        <Group title="CONTENT">
          <Row icon="eyeoff" label="Spoiler protection" sub="Blur tagged content in feeds" right={<Toggle on onChange={() => {}} />} chevron={false} />
          <Row icon="mute" label="Muted words & tags" onClick={() => store.toast('Coming soon')} />
          <Row icon="shield" label="Moderation & reporting" sub="Community Guidelines" onClick={() => nav.push('guidelines')} />
        </Group>
        <Group title="SUPPORT & ABOUT">
          <Row icon="clock" label="Watch & activity history" onClick={() => store.toast('Coming soon')} />
          <Row icon="globe" label="About Hallyu" sub="Terms · Privacy" onClick={() => nav.push('about')} />
          <Row icon="logout" label="Log out" danger onClick={() => { store.logout(); nav.reset('welcome'); }} />
        </Group>
        <p className="t-caption c3" style={{ textAlign: 'center', marginTop: 24 }}>Hallyu v0.1 · build demo</p>
      </div>
    </div>
  );
}

export function AccountSettings() {
  const nav = useNav();
  const store = useStore();
  return (
    <div className="screen">
      <Header title="Account" />
      <div className="scroll pad no-tabbar">
        <Group title="PROFILE">
          <Row icon="profile" label="Edit profile" onClick={() => nav.push('edit-profile')} />
          <Row icon="users2" label="Followers & following" onClick={() => nav.push('followers')} />
        </Group>
        <Group title="SIGN-IN">
          <Row icon="lock" label="Change password" onClick={() => nav.push('forgot')} />
          <Row icon="apple" label="Connected accounts" sub="Apple · Google" onClick={() => {}} />
          <Row icon="download" label="Export my data" sub="GDPR / CCPA export" onClick={() => store.toast('Export requested')} />
        </Group>
        <Group title="DANGER ZONE">
          <Row icon="logout" label="Log out" danger onClick={() => { store.logout(); nav.reset('welcome'); }} />
          <Row icon="close" label="Delete account" danger sub="30-day retention, then permanent" onClick={() => store.toast('Account deletion flow')} />
        </Group>
      </div>
    </div>
  );
}

export function NotifPrefs() {
  const { s, setNotifPref } = useStore();
  return (
    <div className="screen">
      <Header title="Notifications" />
      <div className="scroll pad no-tabbar">
        <Group title="NOTIFY ME ABOUT">
          <Row icon="bell" label="New episodes" sub="Airs & streaming for followed dramas"
            right={<Toggle on={s.notifPrefs.episode} onChange={v => setNotifPref('episode', v)} />} chevron={false} />
          <Row icon="comment" label="Replies & mentions"
            right={<Toggle on={s.notifPrefs.reply} onChange={v => setNotifPref('reply', v)} />} chevron={false} />
          <Row icon="radio" label="Channel broadcasts"
            right={<Toggle on={s.notifPrefs.channel} onChange={v => setNotifPref('channel', v)} />} chevron={false} />
          <Row icon="messages" label="Direct messages"
            right={<Toggle on={s.notifPrefs.dm} onChange={v => setNotifPref('dm', v)} />} chevron={false} />
        </Group>
        <p className="t-caption c3" style={{ marginTop: 14 }}>Each category can be disabled independently, per PRD §10.</p>
      </div>
    </div>
  );
}

export function PrivacySettings() {
  const store = useStore();
  return (
    <div className="screen">
      <Header title="Privacy & security" />
      <div className="scroll pad no-tabbar">
        <Group title="DISCOVERY">
          <Row icon="profile" label="Private profile" right={<Toggle on={false} onChange={() => {}} />} chevron={false} />
          <Row icon="users2" label="Blocked accounts" onClick={() => store.toast('No blocked accounts')} />
        </Group>
        <Group title="DATA">
          <Row icon="download" label="Download your data" onClick={() => store.toast('Export requested')} />
          <Row icon="globe" label="Privacy policy" onClick={() => store.toast('See About → Privacy')} />
          <Row icon="close" label="Delete account" danger onClick={() => store.toast('Account deletion flow')} />
        </Group>
      </div>
    </div>
  );
}

function LegalPage({ title, children }) {
  const nav = useNav();
  return (
    <div className="screen">
      <Header title={title} />
      <div className="scroll pad no-tabbar legal">{children}</div>
    </div>
  );
}

export function About() {
  const nav = useNav();
  return (
    <div className="screen">
      <Header title="About Hallyu" />
      <div className="scroll pad no-tabbar">
        <Group>
          <Row icon="shield" label="Community Guidelines" onClick={() => nav.push('guidelines')} />
          <Row icon="globe" label="Terms of Service" onClick={() => nav.push('terms')} />
          <Row icon="lock" label="Privacy Policy" onClick={() => nav.push('privacy-policy')} />
        </Group>
        <p className="t-caption c3" style={{ marginTop: 24, lineHeight: '18px' }}>
          Every drama. Every fan. One home.<br />Hallyu demo build — fictional content universe, no real IP.
        </p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p className="draft">Draft template — not legal advice. Fill bracketed fields and have counsel review before publish.</p>
      <h4>1. Acceptance of Terms</h4><p>By creating an account or using Hallyu, you agree to these Terms. If you do not agree, do not use the Service.</p>
      <h4>2. Eligibility</h4><p>You must be at least [13/16 — jurisdiction-dependent] years old to use Hallyu.</p>
      <h4>4. User Content</h4><p>You retain ownership of content you post, and grant Hallyu a non-exclusive, worldwide, royalty-free license to host, display, and distribute it within the Service.</p>
      <h4>5. Prohibited Conduct</h4><ul>
        <li>Illegal, harassing, hateful, or violent content</li><li>Impersonation, spam, or scraping without permission</li>
        <li>Content violating the in-app Community Guidelines</li></ul>
      <h4>6. Moderation & Enforcement</h4><p>Hallyu may remove content or suspend accounts per the graduated enforcement process (removal → warning → restriction → suspension → ban).</p>
      <h4>7. Intellectual Property</h4><p>Drama titles, posters, and cast photos belong to their respective rights holders and are used for identification/discussion purposes — rights clearance requires its own legal review before launch.</p>
      <h4>11. Governing Law</h4><p>[Jurisdiction to be determined based on incorporation/operation].</p>
    </LegalPage>
  );
}

export function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="draft">Draft template — not legal advice. Structural starting point for legal review.</p>
      <h4>1. What we collect</h4><ul>
        <li>Account data: email, auth provider ID</li><li>Profile data: handle, display name, avatar, bio</li>
        <li>Content: posts, comments, videos, messages</li><li>Usage & device data: interactions, OS, push token</li></ul>
      <h4>2. How we use it</h4><p>To provide the Service, personalize your feed (follows/genres), maintain safety via moderation, and understand aggregate usage. We do not sell your personal data.</p>
      <h4>3. Who we share it with</h4><p>Service providers (hosting/auth/storage; content-moderation APIs), and where required by law. No advertisers or data brokers.</p>
      <h4>4. Your rights</h4><p>Access, correction, deletion, export, and objection rights vary by jurisdiction (GDPR, CCPA/CPRA, others) — confirm with counsel.</p>
      <h4>5. Retention</h4><p>Account and content data is retained while active; deleted content/accounts are purged within 30 days except safety/legal retention.</p>
      <h4>6. Children’s privacy</h4><p>Not directed at children under [13/16 — confirm per COPPA/GDPR-K].</p>
    </LegalPage>
  );
}

export function Guidelines() {
  return (
    <LegalPage title="Community Guidelines">
      <p className="draft">Derived from the content moderation policy (12_content_moderation_policy.md).</p>
      <h4>Every post is screened before it’s public</h4><p>Automated pre-screening checks text and media for harassment, hate speech, spam, and explicit content. Flagged content goes to human review — it is not auto-removed.</p>
      <h4>Spoilers</h4><p>Use the “Contains spoilers” toggle when posting about a drama. Episode threads are spoiler-permissive for that episode; the Home feed is not.</p>
      <h4>Report reasons</h4><ul>
        <li>Harassment / bullying</li><li>Spam</li><li>Hate speech</li><li>Sexual content</li>
        <li>Spoilers without warning</li><li>Impersonation</li><li>Other</li></ul>
      <h4>Enforcement</h4><p>Removal → warning → temporary posting restriction → suspension → ban. Every action includes a stated reason and an appeal path.</p>
      <h4>Non-negotiable</h4><p>CSAM, credible threats of violence, and doxxing get immediate removal and reporting to authorities where required by law. These rules apply to DMs and channels too.</p>
    </LegalPage>
  );
}

export function Followers() {
  const { s } = useStore();
  const users = [
    { name: 'Miso', handle: 'seoul_nights', initials: 'MI', youFollow: true },
    { name: 'Hana', handle: 'kdrama_diarist', initials: 'HA', youFollow: true },
    { name: 'Jun', handle: 'hanriver', initials: 'JU', youFollow: false },
    { name: 'Dae', handle: 'ep15', initials: 'DA', youFollow: true },
    { name: 'Rin', handle: 'monday_episode', initials: 'RI', youFollow: false },
  ];
  const [tab, setTab] = useState('Followers');
  return (
    <div className="screen">
      <Header title={tab} />
      <div className="utabs" style={{ padding: '0 16px' }}>
        {['Followers', 'Following'].map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      <div className="scroll pad no-tabbar">
        <div className="card" style={{ marginTop: 12 }}>
          {users.map((u, i) => <div key={u.handle}>{i > 0 && <hr className="hair-soft" style={{ marginLeft: 76 }} />}
            <div className="row-item">
              <Avatar initials={u.initials} size={46} />
              <div className="grow"><p className="t-body-em">{u.name}</p><p className="t-caption c3">@{u.handle}</p></div>
              <button className={`btn xs ${u.youFollow ? 'secondary' : 'primary'}`}>{u.youFollow ? 'Following' : 'Follow back'}</button>
            </div></div>)}
        </div>
      </div>
    </div>
  );
}
