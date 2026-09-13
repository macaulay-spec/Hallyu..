const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('close',16,58,24,C.text1,1.8);
  s += U.txt(195,76,'New post','title',C.text1,{align:'center'});
  s += U.button(300,56,74,'Post',{kind:'primary',h:36});
  s += U.avatar({initials:'YO'},24,116,40);
  s += U.txt(76,132,'You','bodyEm',C.text1,{weight:600});
  s += U.txt(76,150,'@you','caption',C.text3);
  s += U.para(24,204,'The hallway scene was blocked like a duel and I will be thinking about it all week\u2026','body',342,C.text1,22);
  s += U.rect(24,212+5*22-16,1.5,18,C.text1);
  s += U.txt(366,340,'112 / 500','caption',C.text3,{align:'right'});
  s += U.hair(24,360,342);
  // tag row
  s += U.icon('tag',24,384,20,C.text2,1.7);
  s += U.chip(48,378,'The Weight of Snow',{small:true});
  s += U.chip(196,378,'+ Actor',{small:true});
  s += U.chip(272,378,'+ Community',{small:true});
  // spoiler toggle
  s += U.icon('eyeoff',24,440,20,C.text2,1.7);
  s += U.txt(56,456,'Contains spoilers','body',C.text1);
  s += U.txt(56,474,'Blurs media and truncates text in feeds','caption',C.text3);
  s += U.toggle(320,440,false);
  return U.screen(s);
}
module.exports={render};
