const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(52,68,'Episode 10','title',C.text1);
  s += U.txt(52,88,'The Weight of Snow \u00B7 2.4K discussing','caption',C.text3);
  s += U.icon('more',352,62,22,C.text2,2);
  // spoiler banner
  s += U.rect(16,108,358,52,'rgba(185,138,63,0.10)',U.R.md,{stroke:'rgba(185,138,63,0.4)',sw:1});
  s += U.icon('eyeoff',30,124,20,C.warning,1.7);
  s += U.txt(60,130,'Spoiler-permissive space','caption',C.warning,{weight:600});
  s += U.txt(60,148,'You\u2019ve opted into Episode 10 spoilers here.','caption',C.text3);
  let y=182;
  const comments=[
    {user:Cb.u('u3'),text:'The hallway scene was blocked like a duel. Saying goodbye staged as warfare. I\u2019m not okay.',time:'2h',likes:'1.2K'},
    {user:Cb.u('u1'),text:'all footsteps no score. the SOUND DESIGN',time:'2h',likes:'212'},
    {user:Cb.u('u4'),text:'and the door close lands exactly on the cut to snowfall. eleven rewrites and I still cry',time:'1h',likes:'184'},
    {user:Cb.u('u2'),text:'prediction: ep 11 opens with the same hallway, empty. calling it',time:'44m',likes:'96'},
    {user:Cb.u('u5'),text:'no because the empty hallway callback would destroy me, stop',time:'20m',likes:'61'},
  ];
  for(const c of comments){ const r=U.commentRow(20,y,350,c); s+=r.svg; y+=r.h+14; }
  s += U.rect(0,778,390,66,C.bg); s+=U.hair(0,778,390);
  s += U.avatar(Cb.u('me'),20,792,36);
  s += U.rect(66,792,258,38,C.surface1,U.R.pill);
  s += U.txt(82,816,'Join the discussion\u2026','body',C.text3);
  s += U.icon('send',340,800,22,C.text3,1.7);
  return U.screen(s);
}
module.exports={render};
