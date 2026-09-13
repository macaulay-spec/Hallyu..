const U = require('../ui');
const B = require('../brand');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,60,24,C.text1,1.8);
  s += B.mark(171,300,48);
  s += U.txt(195,412,'Join Hallyu','headline',C.text1,{align:'center'});
  s += U.txt(195,440,'The social home for K-drama fans.','body',C.text2,{align:'center'});
  s += U.button(24,506,342,'Continue with Apple',{kind:'primary',iconName:'apple'});
  s += U.button(24,566,342,'Continue with Google',{kind:'secondary',iconName:'google'});
  s += U.hair(24,664,130,C.hairSoft); s += U.hair(236,664,130,C.hairSoft); s += U.txt(195,668,'OR CONTINUE WITH EMAIL','overline',C.text3,{align:'center'});
  s += U.button(24,688,342,'Use email instead',{kind:'secondary'});
  s += U.txt(195,780,'Terms of Service \u00B7 Privacy Policy','caption',C.text3,{align:'center'});
  return U.screen(s);
}
module.exports={render};
