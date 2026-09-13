const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(52,76,'Channels','title',C.text1);
  s += U.txt(52,96,'One-way broadcasts from creators','caption',C.text3);
  s += U.txt(24,150,'SUBSCRIBED','overline',C.text3);
  let y=166;
  for(const ch of Cb.channels){
    s += U.circle(44,y+26,20,C.surface2,{stroke:C.hairline,sw:1});
    s += U.txt(44,y+31,ch.name[0],'bodyEm',C.text2,{align:'center',weight:600});
    s += U.verified(58,y+12,13);
    s += U.txt(78,y+22,ch.name,'bodyEm',C.text1,{weight:600});
    s += U.txt(78,y+40,`${ch.subs} subscribers \u00B7 broadcast 2h ago`,'caption',C.text3);
    s += U.icon('chevr',348,y+18,20,C.text3,1.8);
    s += U.hair(78,y+60,292,C.hairSoft);
    y+=61;
  }
  s += U.txt(24,y+28,'FIND CHANNELS','overline',C.text3);
  s += U.rect(24,y+44,342,64,C.surface1,U.R.lg,{stroke:C.hairSoft,sw:1});
  s += U.icon('search',44,y+66,20,C.text3,1.7);
  s += U.txt(76,y+72+''.length? y+72:y+72,'Search channels\u2026','body',C.text3);
  s += U.para(24,y+140,'Channels broadcast to subscribers. You can react, and replies go to the owner\u2019s DMs \u2014 not the channel.','caption',342,C.text3,17);
  s += U.tabBar('Messages');
  return U.screen(s);
}
module.exports={render};
