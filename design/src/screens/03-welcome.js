const U = require('../ui');
const B = require('../brand');
const Cb = require('../content');
const { C } = U;

function render(){
  let s = '';
  s += B.mark(24, 66, 26);
  s += B.wordmark(62, 88, 20);
  // headline
  s += U.txt(24, 176, 'Every drama.', 'display', C.text1);
  s += U.txt(24, 214, 'Every fan.', 'display', C.text1);
  s += U.txt(24, 252, 'One home.', 'display', C.text3);
  s += U.para(24, 288, 'Follow the shows you love, talk episode by episode, and find the people watching right now.', 'body', 300, C.text2);
  // poster fan
  const p1=Cb.d('snow'), p2=Cb.d('signal'), p3=Cb.d('seongsu');
  s += `<g transform="rotate(-6 120 560)">`+U.img(p1.poster, 52, 440, 136, 204, 12)+`</g>`;
  s += U.img(p2.poster, 150, 420, 150, 225, 12);
  s += `<g transform="rotate(6 300 560)">`+U.img(p3.poster, 232, 440, 136, 204, 12)+`</g>`;
  // scrim under posters into CTAs
  const grad = `<linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="1"/></linearGradient>`;
  s += `<defs>${grad}</defs><rect x="0" y="560" width="390" height="120" fill="url(#wg)"/>`;
  // CTAs
  s += U.button(24, 700, 342, 'Create account', {kind:'primary'});
  s += U.button(24, 760, 342, 'Log in', {kind:'secondary'});
  return U.screen(s);
}
module.exports = { render };
