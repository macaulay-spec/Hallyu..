const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  const a=Cb.a('jiwon');
  let s='';
  s += U.img(a.photo,125,96,140,140,70);
  s += U.circle(195,166,74,'none',{stroke:C.hairline,sw:1});
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.icon('share',352,58,22,C.text1,1.8);
  s += U.txt(195,272,a.name,'headline',C.text1,{align:'center'});
  s += U.txt(195,298,a.fans+' fans  \u00B7  2 dramas this season','caption',C.text2,{align:'center'});
  s += U.button(105,324,180,'Follow',{kind:'primary'});
  s += U.txt(24,412,'ABOUT','overline',C.text3);
  s += U.para(24,434,'Seo Ji-won leads some of the most quietly devastating performances on television, from grief counselors to overworked residents. First lead role in Blue Hour Clinic (2023).','body',342,C.text2,22);
  s += U.txt(24,560,'DRAMAS','overline',C.text3);
  ['snow','clinic'].forEach((id,i)=>{
    const d=Cb.d(id); const x=24+i*178;
    s += U.img(d.poster,x,584,160,224,12);
    s += U.txt(x,830,d.title,'bodyEm',C.text1,{weight:600});
  });
  return U.screen(s);
}
module.exports={render};
