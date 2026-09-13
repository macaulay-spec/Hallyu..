const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function row(y,iconName,tint,title,sub,time,unread,thumb){
  let s='';
  if(thumb) s += U.img(thumb,24,y,44,60,8);
  else { s += U.circle(46,y+22,22,C.surface2); s += U.icon(iconName,35,y+11,22,tint,1.7); }
  const lx = thumb? 84: 84;
  s += U.txt(lx,y+16,title,'body',C.text1,{weight:unread?600:450});
  s += U.txt(lx,y+38,sub,'caption',C.text3);
  s += U.txt(366,y+16,time,'caption',C.text3,{align:'right'});
  if(unread) s += U.circle(362,y+36,4,C.accent);
  return s + U.hair(84,y+70,282,C.hairSoft);
}
function render(){
  let s='';
  s += U.txt(20,78,'Notifications','title',C.text1);
  s += U.txt(24,132,'NEW EPISODES','overline',C.text3);
  let y=148;
  s += row(y,null,C.accent,'The Weight of Snow \u00B7 Ep 11','Airs tonight 9:30 PM \u2014 tap for the live thread','2h',true,Cb.d('snow').poster); y+=72;
  s += row(y,null,C.accent,'Midnight in Seongsu \u00B7 Ep 9','Now streaming \u00B7 discuss with 1.2K watching','1d',false,Cb.d('seongsu').poster); y+=84;
  s += U.txt(24,y+8,'REPLIES & MENTIONS','overline',C.text3); y+=24;
  s += row(y,'comment',C.text2,'@hanriver replied','\u201cthe empty hallway callback would destroy me\u201d','3h',true,null); y+=72;
  s += row(y,'comment',C.text2,'@ep15 mentioned you','\u201c@you called this in the thread, receipts\u201d','8h',true,null); y+=72;
  s += U.txt(24,y+8,'CHANNELS','overline',C.text3); y+=24;
  s += row(y,'radio',C.text2,'Seo Ji-won Official','\u201cScript read for episode 11 today\u2026\u201d','2h',true,null); y+=72;
  s += row(y,'radio',C.text2,'Signal Fire Writers Room','\u201cOne week since the finale. Thank you.\u201d','3d',false,null);
  s += U.tabBar('Home');
  return U.screen(s);
}
module.exports={render};
