const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function bubble(x,y,w,text,mine){
  const lines=U.wrap(text,w-28,'body');
  const h=lines.length*20+18;
  let s=U.rect(x,y,w,h,mine?C.text1:C.surface2,16);
  lines.forEach((l,i)=>{ s+=U.txt(x+14,y+24+i*20,l,'body',mine?C.bg:C.text1); });
  return {svg:s,h};
}
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.avatar(Cb.u('u1'),52,52,40);
  s += U.txt(104,68,'Miso','title2',C.text1,{weight:600});
  s += U.txt(104,86,'active now','caption',C.success);
  s += U.icon('more',352,62,22,C.text2,2);
  let y=130;
  const seq=[
    [false,'ok so I finished ep 10 at 2am'],
    [false,'the hallway. THE HALLWAY.'],
    [true,'I TOLD YOU. the blocking is a duel'],
    [true,'and the sound design \u2014 footsteps only, no score'],
    [false,'rewatching tonight, you free at 9?'],
    [true,'obviously. bring the good snacks'],
  ];
  for(const [mine,text] of seq){
    const w=Math.min(270, text.length*8+40);
    if(mine){ const r=bubble(366-w,y,w,text,true); s+=r.svg; s+=U.txt(366,y+r.h+14,'9:41 PM','caption',C.text3,{align:'right'}); y+=r.h+24; }
    else { const r=bubble(24,y,w,text,false); s+=r.svg; y+=r.h+16; }
  }
  s += U.rect(0,778,390,66,C.bg); s+=U.hair(0,778,390);
  s += U.rect(20,792,286,38,C.surface1,U.R.pill);
  s += U.txt(36,816,'Message\u2026','body',C.text3);
  s += U.circle(344,811,19,C.text1); s += U.icon('send',335,802,18,C.bg,1.8);
  return U.screen(s);
}
module.exports={render};
