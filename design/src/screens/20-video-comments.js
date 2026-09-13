const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.img(Cb.d('seongsu').poster,-60,0,510,844,0);
  s += `<rect width="390" height="844" fill="#000" opacity="0.55"/>`;
  s += U.icon('play',175,300,40,C.text1,1.6);
  // sheet
  const sy=340;
  s += `<path d="M0 ${sy+28} a28 28 0 0 1 28 -28 h334 a28 28 0 0 1 28 28 v416 h-390 Z" fill="${C.surface1}"/>`;
  s += U.rect(171,sy+10,48,4,C.surface3,2);
  s += U.txt(20,sy+52,'1,204 comments','title2',C.text1);
  s += U.icon('close',352,sy+42,22,C.text2,1.8);
  let y=sy+78;
  const comments=[
    {user:Cb.u('u2'),text:'the color grade in this clip alone >>>',time:'1h',likes:'320'},
    {user:Cb.u('u4'),text:'pause at 0:41 \u2014 the reflection shows them holding hands before they actually do',time:'44m',likes:'1.1K'},
    {user:Cb.u('u5'),text:'OK that detail is insane, verified by rewatch',time:'30m',likes:'208'},
    {user:Cb.u('u3'),text:'adding this to the weekly recap, credit in bio',time:'12m',likes:'44'},
  ];
  for(const c of comments){ const r=U.commentRow(20,y,350,c); s+=r.svg; y+=r.h+12; }
  s += U.hair(0,778,390);
  s += U.avatar(Cb.u('me'),20,792,36);
  s += U.rect(66,792,258,38,C.surface2,U.R.pill);
  s += U.txt(82,816,'Add a comment\u2026','body',C.text3);
  s += U.icon('send',340,800,22,C.text3,1.7);
  return U.screen(s);
}
module.exports={render};
