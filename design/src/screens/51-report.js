const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += `<rect width="390" height="844" fill="#000" opacity="0.6"/>`;
  const sy=264;
  s += `<path d="M0 ${sy+28} a28 28 0 0 1 28-28 h334 a28 28 0 0 1 28 28 V844 H0 Z" fill="${C.surface1}"/>`;
  s += U.rect(171,sy+10,48,4,C.surface3,2);
  s += U.txt(24,sy+52,'Report this post','title',C.text1);
  s += U.icon('close',346,sy+42,22,C.text2,1.8);
  s += U.txt(24,sy+78,'Reports are anonymous to the author. A moderator reviews within 24 hours.','caption',C.text3);
  const reasons=['Harassment or bullying','Spam','Hate speech','Sexual content','Spoilers without warning','Impersonation','Other'];
  let y=sy+104;
  reasons.forEach((r,i)=>{
    const on = i===4;
    s += U.circle(34,y+12,9,on?C.accent:'none',on?{stroke:C.accent,sw:0}:{stroke:C.text3,sw:1.4});
    if(on) s += U.circle(34,y+12,4,C.accent);
    s += U.txt(58,y+17,r,'body',on?C.text1:C.text2,{weight:on?600:400});
    s += U.hair(58,y+32,308,C.hairSoft);
    y+=44;
  });
  s += U.button(24,y+16,342,'Submit report',{kind:'danger'});
  return U.screen(s);
}
module.exports={render};
