const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(52,76,'Followers','title',C.text1);
  s += U.txt(52,96,'96','caption',C.text3);
  s += U.segBar(24,116,['Followers','Following'],'Followers');
  let y=180;
  const rows=[['u1',true],['u3',true],['u2',false],['u4',true],['u5',false]];
  for(const [id,mutual] of rows){
    const u=Cb.u(id);
    s += U.avatar(u,24,y,48);
    s += U.txt(86,y+16,u.name,'bodyEm',C.text1,{weight:600});
    s += U.txt(86,y+36,'@'+u.handle+(mutual?' \u00B7 follows you':''),'caption',C.text3);
    s += mutual? U.button(286,y+8,80,'Follow back',{kind:'secondary',h:32}) : U.button(286,y+8,80,'Follow',{kind:'primary',h:32});
    s += U.hair(86,y+60,280,C.hairSoft);
    y+=61;
  }
  return U.screen(s);
}
module.exports={render};
