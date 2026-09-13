const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,60,24,C.text1,1.8);
  s += U.txt(24,150,'Verify your email','headline',C.text1);
  s += U.para(24,182,'Enter the 6-digit code we sent to you@example.com.','body',320,C.text2);
  const code='48291';
  for(let i=0;i<6;i++){
    const x=24+i*58;
    const active=i===code.length;
    s += U.rect(x,250,50,60,C.surface1,U.R.md,{stroke:active?C.text1:C.hairline,sw:1});
    if(i<code.length) s += U.txt(x+25,288,code[i],'title',C.text1,{align:'center',weight:600});
    if(active) s += U.rect(x+23,262,2,36,C.text1);
  }
  s += U.button(24,360,342,'Verify',{kind:'primary'});
  s += U.txt(195,440,'Didn\u2019t get it? Resend in 0:42','caption',C.text2,{align:'center'});
  return U.screen(s);
}
module.exports={render};
