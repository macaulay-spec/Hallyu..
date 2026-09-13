const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.txt(195,76,'@you','title2',C.text1,{align:'center',weight:700});
  s += U.icon('settings',352,58,22,C.text1,1.7);
  s += U.avatar({initials:'YO'},24,108,76);
  s += U.txt(116,130,'You','headline',C.text1);
  s += U.txt(116,160,'@you','caption',C.text2);
  s += U.txt(116,182,'128 following \u00B7 96 followers','caption',C.text3);
  s += U.button(24,208,166,'Edit profile',{kind:'secondary'});
  s += U.button(202,208,164,'Share',{kind:'secondary',iconName:'share'});
  s += U.para(24,268,'Here for theOSTs and the ep 10 hallway scenes.','body',342,C.text2);
  s += U.txt(24,316,'FOLLOWING','overline',C.text3);
  ['snow','signal','seongsu'].forEach((id,i)=>{
    const d=Cb.d(id); const x=24+i*118;
    s += U.img(d.poster,x,332,102,148,10);
    s += U.txt(x,x? x:x, ''); // noop
  });
  // fix: titles under posters
  ['snow','signal','seongsu'].forEach((id,i)=>{
    const d=Cb.d(id); const x=24+i*118;
    s += U.txt(x,498,d.title.length>15?d.title.slice(0,14)+'\u2026':d.title,'caption',C.text1,{weight:500});
  });
  s += U.hair(0,524,390);
  ['Posts','Media','Liked'].forEach((t,i)=>{
    const x=24+i*110;
    s+=U.txt(x,512,t,'bodyEm',i===0?C.text1:C.text3,{weight:i===0?600:400});
    if(i===0) s+=U.rect(x,522,38,2,C.text1,1);
  });
  let y=544;
  const r1=U.postCard(12,y,366,{user:Cb.u('me'),time:'3h',text:'First time finishing a drama before it finished airing. Who am I now?',likes:'42',comments:'9',media:false});
  s+=r1.svg; y+=r1.h+12;
  const r2=U.postCard(12,y,366,{user:Cb.u('me'),time:'2d',text:'Signal Fire finale essay incoming. Give me 48 hours.',likes:'87',comments:'21',media:false});
  s+=r2.svg;
  s += U.tabBar('Profile');
  return U.screen(s);
}
module.exports={render};
