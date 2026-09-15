// End-to-end interaction test in jsdom: full signup → onboarding → every tab →
// post creation, DM send, joins/follows. Asserts the app's state actually works.
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost/' });
global.window = dom.window;
global.document = dom.window.document;
try { global.navigator = dom.window.navigator; } catch { Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true }); }
global.localStorage = dom.window.localStorage;
global.history = dom.window.history;
global.HTMLElement = dom.window.HTMLElement;
global.requestAnimationFrame = cb => setTimeout(cb, 0);
global.IS_REACT_ACT_ENVIRONMENT = true;

async function main() {
// Dynamic imports MUST run after jsdom globals are set (static imports hoist),
// otherwise React's canUseDOM detects no DOM and breaks controlled inputs.
const React = (await import('react')).default;
const { createRoot } = await import('react-dom/client');
const { act } = await import('react');
const { default: App } = await import('../src/App.jsx');
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.error('FAIL: ' + m); } else console.log('ok   ' + m); };

const text = el => (el.textContent || '').replace(/\s+/g, ' ').trim();
const findByText = (sel, needle) => [...document.querySelectorAll(sel)].find(el => text(el) === needle || text(el).includes(needle));
const click = (el) => { if (!el) { console.error('!! missing element for click\n' + new Error().stack.split('\n').slice(2,4).join('\n')); } return act(async () => el && el.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }))); };
const type = async (el, val) => act(async () => {
  const proto = el.tagName === 'TEXTAREA' ? dom.window.HTMLTextAreaElement.prototype : dom.window.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, val);
  el.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

const root = createRoot(document.getElementById('root'));
await act(async () => root.render(<App />));

// 1. Welcome → signup
ok(text(document.body).includes('Every drama'), 'welcome renders');
await click(findByText('button', 'Create account'));
ok(text(document.body).includes('Create your account'), 'signup screen');
await click(findByText('button', 'Create account'));

// 2. Genres: pick 3
await sleep(0);
ok(text(document.body).includes('What do you love?'), 'genre onboarding');
for (const g of ['Romance', 'Thriller', 'Historical']) await click(findByText('button', g));
await click(findByText('button', 'Continue'));
await sleep(0);
ok(text(document.body).includes('Follow your first dramas'), 'drama onboarding');

// 3. Dramas: pick the snow + signal posters
const posterCards = [...document.querySelectorAll('.poster-card')];
ok(posterCards.length >= 6, 'drama grid rendered');
await click(posterCards[0]); // Weight of Snow
await click(posterCards[2]); // Signal Fire
await click(findByText('button', 'Continue'));
await sleep(0);
ok(text(document.body).includes('Any favorite actors?'), 'actor onboarding');
await click(findByText('button', 'Finish'));
await sleep(0);
ok(text(document.body).includes('Never miss an episode'), 'notification explainer');
await click(findByText('button', 'Enable notifications'));
await sleep(0);

// 4. Home feed
const body = () => text(document.body);
ok(body().includes('The hallway scene'), 'home feed seeded with followed-drama content');
ok(body().includes('Home'), 'tab bar visible');

// 5. Explore
await click(findByText('button', 'Explore'));
await sleep(0);
ok(body().includes('For You') && body().includes('OST'), 'explore video feed');

// 6. Communities → join Signal Fire
await click(findByText('button', 'Communities'));
await sleep(0);
ok(body().includes('YOUR COMMUNITIES') && body().includes('DISCOVER'), 'communities list');
const joinBtn = [...document.querySelectorAll('button')].find(b => text(b) === 'Join');
await click(joinBtn);
await sleep(0);
ok(body().includes('Joined'), 'join state toggles');

// 7. Compose a post — FAB lives on Home
await click(findByText('button', 'Home'));
await sleep(0);
const fab = document.querySelector('.fab');
await click(fab);
await sleep(0);
ok(body().includes('New post'), 'composer opens');
const ta = document.querySelector('textarea');
await type(ta, 'My test post about episode 11 — no spoilers just love');
// tag a drama
await click(findByText('button', 'Drama'));
await sleep(0);
await click(findByText('button', 'The Weight of Snow'));
await sleep(0);
await click(findByText('button', 'Post'));
await sleep(0);
ok(body().includes('My test post about episode 11'), 'new post appears in feed');
ok(body().includes('Posted'), 'post toast shown');

// 8. Post detail → comment
await click(findByText('article', 'My test post'));
await sleep(0);
ok(body().includes('0 COMMENTS') || body().includes('COMMENTS'), 'post detail opens');
const commentInput = [...document.querySelectorAll('input')].find(i => i.placeholder && i.placeholder.includes('comment'));
await type(commentInput, 'this is so real');
const sendBtns = document.querySelectorAll('.send');
await click(sendBtns[sendBtns.length - 1]);
await sleep(0);
ok(body().includes('this is so real'), 'comment posts');
// back
const backs = document.querySelectorAll('.back');
await click(backs[0]);
await sleep(0);

// 9. Messages → DM → send → receive fake reply
await click(findByText('button', 'Messages'));
await sleep(0);
await click(findByText('button', 'Miso'));
await sleep(0);
ok(body().includes('active now'), 'dm thread opens');
const dmInput = [...document.querySelectorAll('input')].find(i => i.placeholder === 'Message…');
await type(dmInput, 'ep 11 watch party when');
await click(document.querySelector('.send'));
await sleep(0);
ok(body().includes('ep 11 watch party when'), 'dm sends');

// 10. Channels
await click(document.querySelectorAll('.back')[0]);
await sleep(0);
await click(findByText('button', 'Channels'));
await sleep(0);
ok(body().includes('Seo Ji-won Official'), 'channels list');
await click(findByText('button', 'Seo Ji-won Official'));
await sleep(0);
ok(body().includes('Script read for episode 11'), 'channel broadcast detail');
const reaction = document.querySelector('.reactions-pill button');
await click(reaction);
await sleep(0);
ok(reaction.className.includes('on'), 'broadcast reaction toggles');
// back out: channel → channels list → messages tab
await click(document.querySelectorAll('.back')[0]); await sleep(0);
await click(document.querySelectorAll('.back')[0]); await sleep(0);

// 11. Profile
await click(findByText('button', 'Profile'));
await sleep(0);
ok(body().includes('Edit profile'), 'own profile');
await click(findByText('button', 'Edit profile'));
await sleep(0);
const bio = document.querySelector('textarea');
await type(bio, 'Updated bio for the test');
await click(findByText('button', 'Save'));
await sleep(0);
ok(body().includes('Updated bio for the test'), 'profile edits save');

// 12. Drama hub deep link via home tag
await click(findByText('button', 'Home'));
await sleep(0);
await click(findByText('button', 'The Weight')); // tag chip truncation
await sleep(0);
ok(body().includes('SYNOPSIS') || body().includes('AIRING'), 'drama hub opens');
// cast tab
await click(findByText('button', 'Cast'));
await sleep(0);
ok(body().includes('TOP BILLED'), 'cast tab');
// episodes tab + thread
await click(findByText('button', 'Episodes'));
await sleep(0);
ok(body().includes('EP 10'), 'episodes tab');
await click(findByText('button', 'EP 10'));
await sleep(0);
ok(body().includes('Spoiler-permissive space'), 'episode thread');
ok(/hallway scene was blocked like a duel/i.test(body()), 'canonical thread comments');
const threadInput = [...document.querySelectorAll('input')].find(i => i.placeholder && i.placeholder.includes('discussion'));
await type(threadInput, 'calling it: empty hallway callback');
await click(document.querySelector('.send'));
await sleep(0);
ok(body().includes('calling it: empty hallway callback'), 'thread comment posts');

// 13. persistence
const persisted = JSON.parse(localStorage.getItem('hallyu-state-v1'));
ok(persisted.onboarded === true, 'state persists: onboarded');
ok(persisted.followedDramas.includes('snow'), 'state persists: follows');
ok(persisted.posts.some(p => p.text && p.text.includes('My test post')), 'state persists: posts');

console.log(failures ? `\n${failures} FAILURES` : '\nALL FLOW TESTS PASS');
process.exit(failures ? 1 : 0);
}
main();
