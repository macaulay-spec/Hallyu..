const U = require('../ui');
const B = require('../brand');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += B.wordmark(20,78,22);
  s += U.icon('search',312,58,22,C.text3,1.8);
  s += U.icon('bell',350,58,22,C.text3,1.8);
  // offline banner
  s += U.rect(12,96,366,44,C.surface2,U.R.md,{stroke:C.hairline,sw:1});
  s += U.icon('wifiOff',26,108,20,C.warning,1.7);
  s += U.txt(56,118,'You\u2019re offline','caption',C.text1,{weight:600});
  s += U.txt(56,132,'Showing cached posts','caption',C.text3);
  let y=156;
  const r=U.postCard(12,y,366,{user:Cb.u('u3'),time:'cached',text:'The hallway scene in ep 10 was blocked like a duel. Two people saying goodbye and the camera treats it like warfare.',poster:Cb.d('snow').poster,mediaH:200,likes:'1.2K',comments:'148'});
  s += `<g opacity="0.55">`+r.svg+`</g>`;
  y+=r.h+14;
  const r2=U.postCard(12,y,366,{user:Cb.u('u4'),time:'cached',text:'Hot take: Signal Fire\u2019s ending only works if you accept the flare was never literal.',likes:'864',comments:'203',media:false});
  s += `<g opacity="0.4">`+r2.svg+`</g>`;
  s += U.tabBar('Home');
  return U.screen(s);
}
module.exports={render};
