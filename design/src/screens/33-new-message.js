const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.icon('close',16,58,24,C.text1,1.8);
  s += U.txt(52,76,'New message','title',C.text1);
  s += U.txt(366,76,'Next','bodyEm',C.text1,{align:'right',weight:600});
  s += U.searchBar(24,96,342,{placeholder:'Search people',focused:true});
  s += U.txt(24,176,'SUGGESTED','overline',C.text3);
  let y=192;
  const sel=new Set(['u1']);
  for(const id of ['u1','u2','u3','u4','u5']){
    const u=Cb.u(id); const on=sel.has(id);
    s += U.avatar(u,24,y,46);
    s += U.txt(84,y+16,u.name,'bodyEm',C.text1,{weight:600});
    s += U.txt(84,y+36,'@'+u.handle,'caption',C.text3);
    s += on ? U.circle(352,y+13,11,C.text1)+U.icon('check',346,y+7,12,C.bg,2.6)
            : U.circle(352,y+13,11,'none',{stroke:C.text3,sw:1.4});
    s += U.hair(84,y+58,282,C.hairSoft);
    y+=59;
  }
  s += U.button(24,756,342,'Start conversation',{kind:'primary'});
  return U.screen(s);
}
module.exports={render};
