const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,60,24,C.text1,1.8);
  s += U.circle(195,220,34,C.surface2); s += U.icon('send',183,208,24,C.text1,1.7);
  s += U.txt(195,300,'Check your email','headline',C.text1,{align:'center'});
  s += U.para(60,332,'We sent a link to you@example.com. It expires in 30 minutes.','body',270,C.text2);
  s += U.button(24,430,342,'Open mail app',{kind:'primary'});
  s += U.button(24,490,342,'Resend email',{kind:'secondary'});
  s += U.txt(195,560,'Wrong address? Go back','caption',C.text3,{align:'center'});
  return U.screen(s);
}
module.exports={render};
