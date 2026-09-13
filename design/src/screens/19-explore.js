const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  // full-bleed video frame
  s += U.img(Cb.d('seongsu').poster,-60,0,510,844,0);
  s += `<defs><linearGradient id="et" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0.65"/><stop offset="0.25" stop-color="#000" stop-opacity="0"/><stop offset="0.7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.8"/></linearGradient></defs>`;
  s += `<rect width="390" height="844" fill="url(#et)"/>`;
  // top: segmented + mute
  s += U.txt(150,76,'Following','title2',C.text2,{align:'center'});
  s += U.txt(240,76,'For You','title2',C.text1,{align:'center',weight:700});
  s += U.rect(222,86,36,2,C.text1,1);
  s += U.icon('mute',346,58,22,C.text1,1.7);
  // right rail
  const rx=346;
  s += U.avatar(Cb.u('u1'),rx-4,300,44); s += U.circle(rx+18,340,10,C.text1); s+=U.icon('plus',rx+13,335,10,C.bg,2.6);
  s += U.icon('heart',rx+2,382,26,C.text1,1.8); s+=U.txt(rx+13,422,'48.2K','caption',C.text1,{align:'center',weight:600});
  s += U.icon('comment',rx+2,452,26,C.text1,1.8); s+=U.txt(rx+13,492,'1,204','caption',C.text1,{align:'center',weight:600});
  s += U.icon('share',rx+2,522,26,C.text1,1.8); s+=U.txt(rx+13,562,'8,912','caption',C.text1,{align:'center',weight:600});
  s += U.icon('bookmark',rx+2,592,26,C.text1,1.8);
  // bottom meta
  s += U.txt(20,688,'@seoul_nights','title2',C.text1,{weight:700});
  s += U.para(20,714,'that alley scene lives in my head rent free. midnight runs never hit like this','body',290,C.text1,21);
  s += U.chip(20,752,'Midnight in Seongsu');
  s += U.icon('radio',20,796,16,C.text1,1.6);
  s += U.txt(42,808,'OST \u00B7 Seongsu Nights \u2014 The Blue Hour','caption',C.text1);
  s += U.homeIndicator();
  return U.screen(s);
}
module.exports={render};
