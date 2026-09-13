const U = require('../ui');
const B = require('../brand');
const Cb = require('../content');
const { C } = U;

const posts = [
  { user:Cb.u('u3'), time:'12m', text:'The hallway scene in ep 10 was blocked like a duel. Two people saying goodbye and the camera treats it like warfare. I\u2019m not okay.', poster:Cb.d('snow').poster, mediaH:230, likes:'1.2K', comments:'148', tagged:'The Weight of Snow', liked:true },
  { user:Cb.u('u4'), time:'48m', text:'Hot take: Signal Fire\u2019s ending only works if you accept that the flare was never literal. It\u2019s the one signal he never sent.', likes:'864', comments:'203', tagged:'Signal Fire' },
];

function render(){
  let s='';
  s += B.wordmark(20,78,22);
  s += U.icon('search',312,58,22,C.text1,1.8);
  s += U.icon('bell',350,58,22,C.text1,1.8);
  s += U.circle(357,60,3.5,C.accent);
  let y=104;
  for(const p of posts){ const r=U.postCard(12,y,366,p); s+=r.svg; y+=r.h+14; }
  s += U.tabBar('Home');
  return U.screen(s);
}
module.exports={render};
