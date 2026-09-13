const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,60,24,C.text1,1.8);
  s += U.txt(24,150,'Set a new password','headline',C.text1);
  s += U.txt(24,178,'Make it something you don\u2019t use elsewhere.','body',C.text2);
  let f = U.field(24,226,342,'NEW PASSWORD',{value:'wintersonep16!',secure:true}); s+=f.svg;
  // strength meter
  s += U.rect(24,f.bottom+12,110,3,C.success,1.5); s += U.rect(138,f.bottom+12,110,3,C.success,1.5); s += U.rect(252,f.bottom+12,114,3,C.surface3,1.5);
  s += U.txt(24,f.bottom+32,'Strong password','caption',C.success);
  f = U.field(24,f.bottom+56,342,'CONFIRM PASSWORD',{value:'wintersonep16!',secure:true}); s+=f.svg;
  s += U.button(24,f.bottom+40,342,'Save password',{kind:'primary'});
  return U.screen(s);
}
module.exports={render};
