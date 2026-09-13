const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(195,76,'Episode thread','title',C.text1,{align:'center'});
  s += U.circle(195,360,34,C.surface2); s += U.icon('wifiOff',182,347,26,C.text2,1.7);
  s += U.txt(195,436,'Couldn\u2019t load this','title2',C.text1,{align:'center',weight:700});
  s += U.para(70,464,'The connection dropped mid-request. Your follows and drafts are safe on this device.','body',250,C.text2);
  s += U.button(120,532,150,'Retry',{kind:'primary',h:44});
  return U.screen(s);
}
module.exports={render};
