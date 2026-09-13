const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(52,76,'Post','title',C.text1);
  s += U.icon('more',352,60,22,C.text2,2);
  // post
  let y=100;
  s += U.avatar(Cb.u('u3'),20,y,40);
  s += U.txt(72,y+16,Cb.u('u3').name,'bodyEm',C.text1);
  s += U.txt(72,y+34,'@kdrama_diarist \u00B7 12m','caption',C.text3);
  s += U.chip(216,y+6,'The Weight of Snow');
  y+=54;
  s += U.para(20,y,'The hallway scene in ep 10 was blocked like a duel. Two people saying goodbye and the camera treats it like warfare. The cut to snowfall when the door closes \u2014 I\u2019ve replayed it eleven times.','body',350,C.text1,22);
  y+= 5*22+10;
  s += U.img(Cb.d('snow').poster,20,y,350,220,U.R.md);
  y+=234;
  s += U.icon('heart',20,y,22,C.accent,1.7,{fill:true}); s+=U.txt(48,y+16,'1.2K','caption',C.text2);
  s += U.icon('comment',96,y,22,C.text2,1.7); s+=U.txt(124,y+16,'148','caption',C.text2);
  s += U.icon('share',176,y,22,C.text2,1.7);
  s += U.icon('bookmark',350,y,22,C.text1,1.7);
  y+=34;
  s += U.hair(20,y,350); y+=20;
  s += U.txt(20,y+4,'148 COMMENTS','overline',C.text3); y+=22;
  const comments=[
    {user:Cb.u('u1'),text:'The sound design there \u2014 all footsteps, no score. Devastating.',time:'9m',likes:'212'},
    {user:Cb.u('u2'),text:'rewatching right now, the door close is perfectly on the beat cut',time:'6m',likes:'84'},
    {user:Cb.u('u5'),text:'this is why I follow you. essay when?',time:'2m',likes:'31'},
  ];
  for(const c of comments){ const r=U.commentRow(20,y,350,c); s+=r.svg; y+=r.h+14; }
  // comment input
  s += U.rect(0,778,390,66,C.bg); s+=U.hair(0,778,390);
  s += U.avatar(Cb.u('me'),20,792,36);
  s += U.rect(66,792,258,38,C.surface1,U.R.pill);
  s += U.txt(82,816,'Add a comment\u2026','body',C.text3);
  s += U.icon('send',340,800,22,C.text3,1.7);
  return U.screen(s);
}
module.exports={render};
