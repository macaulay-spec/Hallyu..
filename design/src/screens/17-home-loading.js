const U = require('../ui');
const B = require('../brand');
const { C } = U;
function card(y){
  let s = U.rect(12,y,366,330,C.surface1,U.R.lg,{stroke:C.hairSoft,sw:1});
  s += U.circle(28+19,y+16+19,19,C.surface2);
  s += U.skeleton(78,y+22,140,10,5);
  s += U.skeleton(78,y+40,90,8,4);
  s += U.skeleton(28,y+72,300,10,5);
  s += U.skeleton(28,y+90,260,10,5);
  s += U.skeleton(28,y+116,334,170,U.R.md);
  s += U.circle(38,y+304,9,C.surface2); s += U.circle(110,y+304,9,C.surface2); s += U.circle(182,y+304,9,C.surface2);
  return s;
}
function render(){
  let s='';
  s += B.wordmark(20,78,22,C.text3);
  s += U.circle(323,68,10,C.surface2); s += U.circle(361,68,10,C.surface2);
  s += card(104); s += card(448);
  s += U.tabBar('Home');
  return U.screen(s);
}
module.exports={render};
