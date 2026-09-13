const U = require('../ui');
const { C } = U;
function tagRow(y,iconName,label,value,placeholder){
  let s = U.icon(iconName,24,y+16,20,C.text2,1.7);
  s += U.txt(58,y+22,label,'bodyEm',C.text1,{weight:500});
  s += value ? U.chip(160,y+8,value) : U.txt(366,y+22,placeholder,'caption',C.text3,{align:'right'});
  s += U.icon('chevr',348,y+14,20,C.text3,1.8);
  return s + U.hair(24,y+52,342,C.hairSoft);
}
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(195,76,'Tagging','title',C.text1,{align:'center'});
  s += U.txt(366,76,'Done','bodyEm',C.text1,{align:'right',weight:600});
  s += U.txt(24,140,'Tagging routes this post into the drama hub and community feeds of what you tag.','body',C.text2);
  let y=190;
  s += tagRow(y,'grid','Drama','The Weight of Snow','Add drama'); y+=60;
  s += tagRow(y,'profile','Actor',null,'Add actor'); y+=60;
  s += tagRow(y,'communities','Community',null,'Add community'); y+=76;
  s += U.rect(24,y,342,76,C.surface1,U.R.lg,{stroke:C.hairSoft,sw:1});
  s += U.icon('eyeoff',44,y+28,20,C.text1,1.7);
  s += U.txt(78,y+30,'Contains spoilers','bodyEm',C.text1,{weight:600});
  s += U.txt(78,y+50,'Blurs media, truncates text until tapped','caption',C.text3);
  s += U.toggle(316,y+24,true);
  s += U.para(24,y+110,'Episode discussion threads are already spoiler-permissive for their episode; this toggle matters everywhere else.','caption',342,C.text3,17);
  return U.screen(s);
}
module.exports={render};
