const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.txt(20,78,'Loading patterns','title',C.text1);
  s += U.txt(20,100,'Static surface blocks. No shimmer \u2014 motion stays calm.','caption',C.text3);
  // list skeleton
  s += U.txt(24,148,'LIST / CARD','overline',C.text3);
  s += U.rect(24,164,342,150,C.surface1,U.R.lg,{stroke:C.hairSoft,sw:1});
  s += U.circle(46,188,18,C.surface2);
  s += U.skeleton(76,178,130,10,5); s += U.skeleton(76,196,84,8,4);
  s += U.skeleton(40,228,280,10,5); s += U.skeleton(40,246,240,10,5);
  s += U.skeleton(40,270,310,28,8);
  // grid skeleton
  s += U.txt(24,352,'POSTER GRID','overline',C.text3);
  for(let i=0;i<3;i++) s += U.skeleton(24+i*118,368,102,148,10);
  // profile skeleton
  s += U.txt(24,556,'PROFILE HEADER','overline',C.text3);
  s += U.circle(52,600,28,C.surface2);
  s += U.skeleton(96,580,140,12,6); s += U.skeleton(96,602,90,9,4);
  s += U.skeleton(24,648,160,36,U.R.pill); s += U.skeleton(196,648,160,36,U.R.pill);
  // video skeleton
  s += U.txt(24,724,'VIDEO FRAME','overline',C.text3);
  s += U.rect(115,738,160,90,C.surface2,10);
  s += U.circle(195,783,16,C.surface3);
  return U.screen(s);
}
module.exports={render};
