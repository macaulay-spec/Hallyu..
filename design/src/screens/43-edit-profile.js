const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('close',16,58,24,C.text1,1.8);
  s += U.txt(195,76,'Edit profile','title',C.text1,{align:'center'});
  s += U.txt(366,76,'Save','bodyEm',C.text1,{align:'right',weight:600});
  s += U.avatar({initials:'YO'},157,116,76);
  s += U.circle(222,180,15,C.surface3,{stroke:C.bg,sw:2}); s += U.icon('camera',214,172,15,C.text1,1.7);
  s += U.txt(195,222,'Change photo','caption',C.text2,{align:'center'});
  let f=U.field(24,258,342,'DISPLAY NAME',{value:'You'}); s+=f.svg;
  f=U.field(24,f.bottom+22,342,'HANDLE',{value:'you'}); s+=f.svg;
  s += U.txt(24,f.bottom+26,'BIO','overline',C.text2);
  s += U.rect(24,f.bottom+36,342,96,C.surface1,U.R.md,{stroke:C.hairline,sw:1});
  s += U.para(40,f.bottom+62,'Here for the OSTs and the ep 10 hallway scenes.','body',300,C.text1);
  s += U.txt(366,f.bottom+150,'47 / 160','caption',C.text3,{align:'right'});
  return U.screen(s);
}
module.exports={render};
