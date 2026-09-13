const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.txt(24,72,'STEP 3 OF 3 \u00B7 OPTIONAL','overline',C.text3);
  s += U.txt(24,110,'Any favorite actors?','headline',C.text1);
  s += U.txt(366,76,'Skip','caption',C.text3,{align:'right',weight:500});
  s += U.txt(366,142,'You can do this later.','body',C.text2,{align:'right'});
  let y=196; const cw=106, gap=12;
  Cb.actors.forEach((a,i)=>{
    const col=i%3, row=Math.floor(i/3);
    const x=24+col*(cw+gap); const yy=y+row*(106+44);
    const on=a.id==='jiwon';
    s += U.img(a.photo,x,yy,cw,106,53);
    if(on) s += `<rect x="${x}" y="${yy}" width="${cw}" height="106" rx="53" fill="none" stroke="${C.text1}" stroke-width="2"/>`+U.circle(x+cw-8,yy+8,11,C.text1)+U.icon('check',x+cw-14,yy+2,12,C.bg,2.6);
    s += U.txt(x+cw/2,yy+124,a.name,'caption',C.text1,{align:'center',weight:500});
    s += U.txt(x+cw/2,yy+140,a.fans+' fans','caption',C.text3,{align:'center'});
  });
  s += U.button(24,756,342,'Finish',{kind:'primary'});
  return U.screen(s);
}
module.exports={render};
