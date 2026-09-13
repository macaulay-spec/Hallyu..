const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.circle(58,70,16,C.surface2,{stroke:C.hairline,sw:1}); s+=U.txt(58,75,'S','caption',C.text2,{align:'center',weight:600});
  s += U.txt(84,66,'Signal Fire','title',C.text1);
  s += U.txt(84,86,'31.7K members','caption',C.text3);
  s += U.icon('more',352,62,22,C.text2,2);
  s += U.button(24,112,164,'Joined',{kind:'secondary',iconName:'check'});
  s += U.button(200,112,166,'New post',{kind:'primary'});
  s += U.hair(0,168,390);
  let y=184;
  const posts=[
    { user:Cb.u('u4'), time:'26m', text:'Rewatched the ep 12 rooftop scene. The flare is reflected in the glass BEFORE he lights it. The edit has been telling us since ep 3.', likes:'980', comments:'164' },
    { user:Cb.u('u2'), time:'2h', text:'Weekly rewatch thread: episodes 1\u20134, spoiler tags on. Be kind to first-timers.', likes:'312', comments:'58' },
  ];
  for(const p of posts){ const r=U.postCard(12,y,366,{...p,media:false}); s+=r.svg; y+=r.h+14; }
  s += U.tabBar('Communities');
  return U.screen(s);
}
module.exports={render};
