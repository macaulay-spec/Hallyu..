const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('close',16,58,24,C.text1,1.8);
  s += U.txt(195,76,'Create a community','title',C.text1,{align:'center'});
  s += U.txt(366,76,'Create','bodyEm',C.text3,{align:'right'});
  let f=U.field(24,120,342,'NAME',{placeholder:'e.g. Needle-drop OST Club'}); s+=f.svg;
  s += U.txt(24,f.bottom+24,'DESCRIPTION','overline',C.text2);
  s += U.rect(24,f.bottom+34,342,110,C.surface1,U.R.md,{stroke:C.hairline,sw:1});
  s += U.para(40,f.bottom+62,'What is this community about? Who is it for?','body',300,C.text3);
  s += U.txt(24,f.bottom+176,'TYPE','overline',C.text2);
  s += U.chip(24,f.bottom+190,'Topic',{on:true});
  s += U.chip(110,f.bottom+190,'Drama-linked',{on:false});
  s += U.para(24,f.bottom+246,'Drama-linked communities are created automatically for each drama. Topic communities are open to anyone.','caption',342,C.text3,17);
  s += U.rect(24,f.bottom+300,342,52,'rgba(185,138,63,0.08)',U.R.md,{stroke:'rgba(185,138,63,0.35)',sw:1});
  s += U.icon('shield',38,f.bottom+316,20,C.warning,1.6);
  s += U.txt(68,f.bottom+322,'Communities follow the Community Guidelines.','caption',C.warning);
  s += U.txt(68,f.bottom+338,'Moderation applies from the first post.','caption',C.text3);
  return U.screen(s);
}
module.exports={render};
