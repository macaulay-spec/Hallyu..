const U = require('../ui');
const B = require('../brand');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,60,24,C.text1,1.8);
  s += U.txt(24,150,'Create your account','headline',C.text1);
  s += U.txt(24,178,'Your fandom starts here.','body',C.text2);
  let f = U.field(24,226,342,'EMAIL',{placeholder:'you@example.com'}); s+=f.svg;
  f = U.field(24,f.bottom+24,342,'PASSWORD',{placeholder:'At least 8 characters'}); s+=f.svg;
  s += U.para(24,f.bottom+28,'By continuing you agree to Hallyu\u2019s Terms of Service and Privacy Policy.','caption',342,C.text3,17);
  s += U.button(24,f.bottom+64,342,'Continue',{kind:'primary'});
  const dy=f.bottom+152;
  s += U.hair(24,dy,130,C.hairSoft); s += U.hair(236,dy,130,C.hairSoft); s += U.txt(195,dy+4,'OR','overline',C.text3,{align:'center'});
  s += U.button(24,dy+24,342,'Continue with Apple',{kind:'secondary',iconName:'apple'});
  s += U.button(24,dy+84,342,'Continue with Google',{kind:'secondary',iconName:'google'});
  return U.screen(s);
}
module.exports={render};
