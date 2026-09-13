const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.txt(24,72,'STEP 2 OF 3','overline',C.text3);
  s += U.txt(24,110,'Follow your first dramas','headline',C.text1);
  s += U.searchBar(24,138,342,{});
  const picked=new Set(['snow','signal']);
  let y=206; const cw=106, gap=12;
  Cb.dramas.forEach((d,i)=>{
    const col=i%3, row=Math.floor(i/3);
    const x=24+col*(cw+gap); const yy=y+row*(158+34);
    const on=picked.has(d.id);
    s += U.img(d.poster,x,yy,cw,158,10);
    s += `<rect x="${x}" y="${yy}" width="${cw}" height="158" rx="10" fill="none" stroke="${on?C.text1:'rgba(245,245,247,0.12)'}" stroke-width="${on?2:1}"/>`;
    if(on) s += U.circle(x+cw-14,yy+14,11,C.text1)+U.icon('check',x+cw-20,yy+8,12,C.bg,2.6);
    s += U.txt(x,yy+176,d.title.length>15?d.title.slice(0,14)+'\u2026':d.title,'caption',C.text1,{weight:500});
  });
  s += U.txt(24,756-38,'2 followed','caption',C.text2);
  s += U.button(24,756,342,'Continue',{kind:'primary'});
  return U.screen(s);
}
module.exports={render};
