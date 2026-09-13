const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  // dimmed profile behind
  s += U.avatar(Cb.u('u4'),24,108,76,{ring:false});
  s += U.txt(116,140,'Jun','headline',C.text3);
  s += U.txt(116,170,'@hanriver','caption',C.text3);
  s += `<rect width="390" height="844" fill="#000" opacity="0.66"/>`;
  // dialog
  const x=40,y=300,w=310;
  s += U.rect(x,y,w,268,C.surface2,U.R.xl);
  s += U.circle(x+w/2,y+44,24,C.accentSoft); s += U.icon('close',x+w/2-11,y+33,22,C.accent,1.8);
  s += U.txt(x+w/2,y+96,'Block @hanriver?','title2',C.text1,{align:'center',weight:700});
  s += U.para(x+28,y+120,'They won\u2019t be able to see your posts or message you, and you won\u2019t see theirs. You can unblock anytime in Privacy.','caption',w-56,C.text2,17);
  s += U.button(x+20,y+170,w-40,'Block',{kind:'danger',h:44});
  s += U.button(x+20,y+222,w-40,'Cancel',{kind:'ghost',h:40});
  return U.screen(s);
}
module.exports={render};
