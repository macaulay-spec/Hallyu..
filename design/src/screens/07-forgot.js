const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,60,24,C.text1,1.8);
  s += U.circle(44,158,22,C.surface2); s += U.icon('lock',33,147,22,C.text1,1.7);
  s += U.txt(24,222,'Forgot password?','headline',C.text1);
  s += U.para(24,254,'Enter the email linked to your account and we\u2019ll send a reset link.','body',320,C.text2);
  const f = U.field(24,312,342,'EMAIL',{placeholder:'you@example.com'}); s+=f.svg;
  s += U.button(24,f.bottom+32,342,'Send reset link',{kind:'primary'});
  s += U.txt(195,f.bottom+112,'Remembered it? Log in','caption',C.text2,{align:'center'});
  return U.screen(s);
}
module.exports={render};
