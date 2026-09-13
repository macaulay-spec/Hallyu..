const U = require('../ui');
const { C } = U;
function pref(y,iconName,label,sub,on){
  let s = U.icon(iconName,28,y+14,20,C.text2,1.7);
  s += U.txt(62,y+20,label,'body',C.text1,{weight:500});
  s += U.txt(62,y+40,sub,'caption',C.text3);
  s += U.toggle(316,y+16,on);
  return s + U.hair(62,y+64,304,C.hairSoft);
}
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(52,76,'Notifications','title',C.text1);
  s += U.rect(16,116,358,84,C.surface1,U.R.lg,{stroke:C.hairSoft,sw:1});
  s += U.txt(32,148,'Push notifications','bodyEm',C.text1,{weight:600});
  s += U.txt(32,168,'Master switch','caption',C.text3);
  s += U.toggle(316,144,true);
  let y=224;
  s += pref(y,'clock','New episodes','Followed dramas air or drop',true); y+=66;
  s += pref(y,'comment','Replies & mentions','When someone replies or mentions you',true); y+=66;
  s += pref(y,'radio','Channel broadcasts','One-way updates from your channels',true); y+=66;
  s += pref(y,'users2','Community activity','Top posts in your communities',false); y+=66;
  s += pref(y,'heart','Likes on your posts','',false);
  s += U.para(24,y+90,'Each category can be disabled independently. In-app banners still show while the app is open.','caption',342,C.text3,17);
  return U.screen(s);
}
module.exports={render};
