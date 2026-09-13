const U = require('../ui');
const B = require('../brand');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(52,76,'About','title',C.text1);
  s += B.mark(177,160,36);
  s += B.wordmark(195,246,24,C.text1,'center');
  s += U.txt(195,272,'Version 1.0.0 (build 42)','caption',C.text3,{align:'center'});
  let g = U.settingsGroup(16,320,358,[
    {iconName:'lock',label:'Terms of Service'},
    {iconName:'shield',label:'Privacy Policy'},
    {iconName:'users2',label:'Community Guidelines'},
  ],'LEGAL');
  s += g.svg;
  g = U.settingsGroup(16,g.bottom+28,358,[
    {iconName:'grid',label:'Open-source licenses'},
    {iconName:'comment',label:'Send feedback'},
  ],'');
  s += g.svg;
  s += U.txt(195,760,'Made for the people who stay for the credits.','caption',C.text3,{align:'center'});
  return U.screen(s);
}
module.exports={render};
