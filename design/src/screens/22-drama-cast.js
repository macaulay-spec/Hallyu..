const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  const d=Cb.d('snow');
  let s='';
  s += U.img(d.poster,-40,-160,470,430,0);
  s += `<defs><linearGradient id="dg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0.1" stop-color="#000" stop-opacity="0.1"/><stop offset="0.9" stop-color="#000" stop-opacity="1"/></linearGradient></defs>`;
  s += `<rect y="60" width="390" height="210" fill="url(#dg2)"/>`;
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(24,252,d.title,'display',C.text1);
  s += U.txt(24,282,'Melodrama \u00B7 Romance  \u00B7  16 ep','caption',C.text2);
  s += U.hair(0,320,390);
  ['Overview','Cast','Episodes'].forEach((t,i)=>{
    const x=24+i*110;
    s+=U.txt(x,308,t,'bodyEm',i===1?C.text1:C.text3,{weight:i===1?600:400});
    if(i===1) s+=U.rect(x,318,34,2,C.text1,1);
  });
  s += U.txt(24,364,'TOP BILLED','overline',C.text3);
  const cast=[['jiwon','Kang Seo-yeon'],['doyun','Baek Jun-ho'],['sera','Dr. Oh Hyemi']];
  cast.forEach(([id,role],i)=>{
    const col=i%3,row=Math.floor(i/3);
    const x=24+col*118, y=388+row*190;
    const a=Cb.a(id);
    s += U.img(a.photo,x,y,102,130,10);
    s += U.txt(x,y+150,a.name,'bodyEm',C.text1,{weight:600});
    s += U.txt(x,y+168,role,'caption',C.text3);
  });
  s += U.txt(24,772,'View all 14 cast members','caption',C.text2,{weight:500});
  return U.screen(s);
}
module.exports={render};
