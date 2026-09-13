const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.searchBar(48,56,318,{query:'snow'});
  const tabs=['Dramas','Actors','Users','Communities','Posts'];
  let x=16;
  tabs.forEach((t,i)=>{
    const w=t.length*7+20;
    const on=i===0;
    s += U.chip(x,108,t,{on,small:true});
    x+=w+8;
  });
  let y=164;
  for(const d of [Cb.d('snow')]){
    s += U.img(d.poster,24,y,92,132,10);
    s += U.txt(132,y+22,d.title,'title2',C.text1,{weight:700});
    s += U.txt(132,y+46,'Melodrama \u00B7 Romance \u00B7 16 ep','caption',C.text2);
    s += U.txt(132,y+66,'\u2605 9.1 \u00B7 airing Fri 9:30 PM','caption',C.text3);
    s += U.button(132,y+92,110,'Following',{kind:'secondary',h:34});
  }
  y+=164;
  s += U.hair(24,y,342,C.hairSoft); y+=20;
  s += U.txt(24,y+4,'RELATED COMMUNITIES','overline',C.text3); y+=24;
  s += U.circle(44,y+22,20,C.surface2,{stroke:C.hairline,sw:1}); s+=U.txt(44,y+27,'T','bodyEm',C.text2,{align:'center',weight:600});
  s += U.txt(78,y+16,'The Weight of Snow','bodyEm',C.text1,{weight:600});
  s += U.txt(78,y+36,'48.2K members','caption',C.text3);
  s += U.button(286,y+10,80,'Joined',{kind:'secondary',h:30});
  y+=64;
  s += U.txt(24,y+4,'POSTS','overline',C.text3); y+=20;
  const r=U.postCard(12,y,366,{user:Cb.u('u3'),time:'12m',text:'The hallway scene in ep 10 was blocked like a duel\u2026',likes:'1.2K',comments:'148',media:false});
  s+=r.svg;
  return U.screen(s);
}
module.exports={render};
