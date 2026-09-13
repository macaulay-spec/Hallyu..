const U = require('../ui');
const { C } = U;
function opt(y,iconName,title,sub){
  let s = U.rect(24,y,342,76,C.surface2,U.R.lg,{stroke:C.hairline,sw:1});
  s += U.circle(62,y+38,20,C.surface3); s += U.icon(iconName,51,y+27,22,C.text1,1.7);
  s += U.txt(96,y+32,title,'bodyEm',C.text1,{weight:600});
  s += U.txt(96,y+52,sub,'caption',C.text3);
  s += U.icon('chevr',332,y+28,20,C.text3,1.8);
  return s;
}
function render(){
  let s='';
  s += `<rect width="390" height="844" fill="#000" opacity="0.6"/>`;
  const sy=470;
  s += `<path d="M0 ${sy+28} a28 28 0 0 1 28-28 h334 a28 28 0 0 1 28 28 V844 H0 Z" fill="${C.surface1}"/>`;
  s += U.rect(171,sy+10,48,4,C.surface3,2);
  s += U.txt(24,sy+56,'Create a post','title',C.text1);
  s += U.icon('close',346,sy+46,22,C.text2,1.8);
  s += opt(sy+84,'edit','Text','Up to 500 characters');
  s += opt(sy+172,'image','Image','One photo, cropped your way');
  s += opt(sy+260,'video','Video','Up to 60 seconds');
  return U.screen(s);
}
module.exports={render};
