const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function reaction(x,y,ic,count,on){
  let s = U.rect(x,y,70,32,on?C.surface3:C.surface1,U.R.pill,{stroke:on?C.hairline:C.hairSoft,sw:1});
  s += U.icon(ic,x+12,y+8,16,on?C.text1:C.text2,1.6,{fill:ic==='heart'?1:0});
  s += U.txt(x+36,y+21,count,'caption',on?C.text1:C.text3);
  return s;
}
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.circle(58,70,16,C.surface2,{stroke:C.hairline,sw:1}); s+=U.txt(58,75,'S','caption',C.text2,{align:'center',weight:600});
  s += U.verified(70,54,13);
  s += U.txt(92,66,'Seo Ji-won Official','title2',C.text1,{weight:600});
  s += U.txt(92,86,'412K subscribers','caption',C.text3);
  s += U.button(286,56,80,'Subscribed',{kind:'secondary',h:32});
  // broadcast card
  let y=120;
  s += U.rect(12,y,366,336,C.surface1,U.R.lg,{stroke:C.hairSoft,sw:1});
  s += U.circle(34,y+24,14,C.surface2); s+=U.txt(34,y+29,'S','caption',C.text2,{align:'center',weight:600});
  s += U.txt(56,y+22,'Seo Ji-won Official','bodyEm',C.text1,{weight:600});
  s += U.txt(56,y+38,'2h','caption',C.text3);
  s += U.icon('radio',336,y+16,18,C.text3,1.6);
  s += U.para(28,y+66,'Script read for episode 11 today. It\u2019s the quietest script we\u2019ve had \u2014 which means it\u2019s the loudest episode. See you Friday.','body',334,C.text1,21);
  s += U.img('../assets/actor-seo-jiwon.png',28,y+140,334,140,U.R.md);
  // reactions
  s += reaction(28,y+296,'\u2764\uFE0F','12.4K',true);
  s += reaction(100,y+296,'\uD83D\uDD25','4,812',false);
  s += reaction(172,y+296,'\uD83D\uDE2D','9,120',false);
  y+=352;
  // second broadcast
  s += U.rect(12,y,366,150,C.surface1,U.R.lg,{stroke:C.hairSoft,sw:1});
  s += U.circle(34,y+24,14,C.surface2); s+=U.txt(34,y+29,'S','caption',C.text2,{align:'center',weight:600});
  s += U.txt(56,y+22,'Seo Ji-won Official','bodyEm',C.text1,{weight:600});
  s += U.txt(56,y+38,'1d','caption',C.text3);
  s += U.para(28,y+66,'Thank you for 400K. I read every reply you send \u2014 yes, really.','body',334,C.text1,21);
  s += reaction(28,y+108,'\u2764\uFE0F','31K',false); s += reaction(100,y+108,'\uD83C\uDF89','8,204',false);
  // no input bar — deliberate distinction from DMs
  s += U.rect(0,778,390,66,C.bg); s+=U.hair(0,778,390);
  s += U.icon('radio',20,802,18,C.text3,1.6);
  s += U.txt(48,816,'Broadcast channel \u00B7 replies go to @jiwon\u2019s DMs','caption',C.text3);
  return U.screen(s);
}
module.exports={render};
