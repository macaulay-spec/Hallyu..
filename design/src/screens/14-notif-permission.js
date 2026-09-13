const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.circle(195,280,36,C.surface2); s += U.icon('bell',182,267,26,C.text1,1.7);
  s += U.txt(195,368,'Never miss an episode','headline',C.text1,{align:'center'});
  s += U.para(56,400,'Get alerted when a followed drama airs, when someone replies, and when your channels broadcast.','body',278,C.text2);
  s += U.button(24,520,342,'Enable notifications',{kind:'primary'});
  s += U.button(24,580,342,'Not now',{kind:'ghost'});
  s += U.txt(195,660,'You can change this anytime in Settings.','caption',C.text3,{align:'center'});
  return U.screen(s);
}
module.exports={render};
