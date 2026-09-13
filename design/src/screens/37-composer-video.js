const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(195,76,'Add video','title',C.text1,{align:'center'});
  s += U.txt(366,76,'Next','bodyEm',C.text1,{align:'right',weight:600});
  s += U.rect(0,110,390,430,'#050506');
  s += U.img('../assets/poster-signal-fire.png',95,110,200,430,0);
  s += U.circle(195,325,30,C.scrim); s += U.icon('play',186,313,22,C.text1,1.6);
  s += U.txt(366,134,'0:42 / 1:00','caption',C.text1,{align:'right'});
  // trim timeline
  s += U.txt(24,568,'TRIM','overline',C.text3);
  s += U.txt(366,568,'60s max','caption',C.text3,{align:'right'});
  s += U.rect(24,584,342,44,C.surface2,8);
  // filmstrip ticks
  for(let i=0;i<12;i++) s += U.rect(30+i*28,590,1.5,32,C.surface3);
  // selected window
  s += U.rect(96,584,190,44,'rgba(245,245,247,0.10)',8,{stroke:C.text1,sw:1.5});
  s += U.rect(92,580,8,52,C.text1,3); s += U.rect(286,580,8,52,C.text1,3);
  s += U.txt(96,652,'0:12','caption',C.text2); s += U.txt(286,652,'0:42','caption',C.text2,{align:'right'});
  s += U.txt(24,700,'CAPTION','overline',C.text2);
  s += U.rect(24,710,342,64,C.surface1,U.R.md,{stroke:C.hairline,sw:1});
  s += U.txt(40,738,'Say something about this\u2026','body',C.text3);
  return U.screen(s);
}
module.exports={render};
