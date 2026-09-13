const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(195,76,'Add image','title',C.text1,{align:'center'});
  s += U.txt(366,76,'Next','bodyEm',C.text1,{align:'right',weight:600});
  // crop stage
  s += U.rect(0,110,390,430,'#050506');
  s += U.img('../assets/poster-midnight-seongsu.png',60,130,270,338,0);
  // crop frame
  s += `<rect x="80" y="150" width="230" height="288" fill="none" stroke="${C.text1}" stroke-width="1.5"/>`;
  for(const [hx,hy] of [[80,150],[310,150],[80,438],[310,438]]) s += U.rect(hx-6,hy-6,12,12,'none',{stroke:C.text1,sw:1.5});
  s += U.line(80,246,310,246,'rgba(245,245,247,0.35)',0.8); s += U.line(80,342,310,342,'rgba(245,245,247,0.35)',0.8);
  s += U.line(156,150,156,438,'rgba(245,245,247,0.35)',0.8); s += U.line(233,150,233,438,'rgba(245,245,247,0.35)',0.8);
  // aspect options
  const asp=[['4:5',true],['1:1',false],['16:9',false],['Original',false]];
  let x=24;
  for(const [a,on] of asp){ const w=a.length*8+28; s+=U.chip(x,568,a,{on}); x+=w+10; }
  s += U.txt(24,640,'CAPTION','overline',C.text2);
  s += U.rect(24,650,342,88,C.surface1,U.R.md,{stroke:C.hairline,sw:1});
  s += U.txt(40,678,'Say something about this\u2026','body',C.text3);
  return U.screen(s);
}
module.exports={render};
