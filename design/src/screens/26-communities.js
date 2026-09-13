const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function row(y,c,joined){
  let s = U.circle(40,y+24,20,C.surface2,{stroke:C.hairline,sw:1});
  s += U.txt(40,y+29,c.name[0],'bodyEm',C.text2,{align:'center',weight:600});
  s += U.txt(72,y+20,c.name,'bodyEm',C.text1,{weight:600});
  s += U.txt(72,y+38,`${c.members} members \u00B7 ${c.type==='drama'?'drama':'topic'}`,'caption',C.text3);
  s += joined
    ? U.button(286,y+10,80,'Joined',{kind:'secondary',h:30})
    : U.button(286,y+10,80,'Join',{kind:'primary',h:30});
  return s + U.hair(72,y+56,298,C.hairSoft);
}
function render(){
  let s='';
  s += U.txt(20,78,'Communities','title',C.text1);
  s += U.icon('search',352,58,22,C.text1,1.8);
  s += U.searchBar(24,96,342,{placeholder:'Search communities'});
  s += U.txt(24,172,'YOUR COMMUNITIES','overline',C.text3);
  let y=188;
  [Cb.communities[0],Cb.communities[2]].forEach(c=>{ s+=row(y,c,true); y+=57; });
  s += U.txt(24,y+26,'DISCOVER','overline',C.text3); y+=42;
  [Cb.communities[1],Cb.communities[3],Cb.communities[4],Cb.communities[5]].forEach(c=>{ s+=row(y,c,false); y+=57; });
  s += U.circle(330,700,27,C.text1); s += U.icon('plus',319,689,22,C.bg,2.2);
  s += U.tabBar('Communities');
  return U.screen(s);
}
module.exports={render};
