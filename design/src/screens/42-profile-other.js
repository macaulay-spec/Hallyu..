const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(195,76,'@kdrama_diarist','title2',C.text1,{align:'center',weight:700});
  s += U.icon('more',352,58,22,C.text1,2);
  s += U.avatar(Cb.u('u3'),24,108,76);
  s += U.txt(116,130,'Hana','headline',C.text1);
  s += U.verified(172,114,15);
  s += U.txt(116,160,'@kdrama_diarist','caption',C.text2);
  s += U.txt(116,182,'812 following \u00B7 24.6K followers','caption',C.text3);
  s += U.button(24,208,166,'Follow',{kind:'primary'});
  s += U.button(202,208,164,'Message',{kind:'secondary'});
  s += U.para(24,268,'Weekly episode essays. Currently: The Weight of Snow, one scene at a time.','body',342,C.text2);
  s += U.txt(24,316,'FOLLOWS','overline',C.text3);
  ['snow','seongsu','court'].forEach((id,i)=>{
    const d=Cb.d(id); const x=24+i*118;
    s += U.img(d.poster,x,332,102,148,10);
    s += U.txt(x,498,d.title.length>15?d.title.slice(0,14)+'\u2026':d.title,'caption',C.text1,{weight:500});
  });
  s += U.hair(0,524,390);
  ['Posts','Media','Liked'].forEach((t,i)=>{
    const x=24+i*110;
    s+=U.txt(x,512,t,'bodyEm',i===0?C.text1:C.text3,{weight:i===0?600:400});
    if(i===0) s+=U.rect(x,522,38,2,C.text1,1);
  });
  let y=544;
  const r1=U.postCard(12,y,366,{user:Cb.u('u3'),time:'12m',text:'The hallway scene in ep 10 was blocked like a duel. Two people saying goodbye and the camera treats it like warfare.',poster:Cb.d('snow').poster,mediaH:200,likes:'1.2K',comments:'148'});
  s+=r1.svg;
  s += U.tabBar('Profile');
  return U.screen(s);
}
module.exports={render};
