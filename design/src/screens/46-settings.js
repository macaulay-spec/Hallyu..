const U = require('../ui');
const B = require('../brand');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(52,76,'Settings','title',C.text1);
  let g = U.settingsGroup(16,116,358,[
    {iconName:'profile',label:'Account',value:'Email \u00B7 password'},
    {iconName:'bell',label:'Notifications',value:'Per-category'},
    {iconName:'shield',label:'Privacy',value:'Blocked users, data'},
  ],'YOUR ACCOUNT');
  s += g.svg;
  g = U.settingsGroup(16,g.bottom+28,358,[
    {iconName:'moon',label:'Appearance',value:'Dark'},
    {iconName:'globe',label:'Language',value:'English'},
  ],'PREFERENCES');
  s += g.svg;
  g = U.settingsGroup(16,g.bottom+28,358,[
    {iconName:'lock',label:'Terms of Service'},
    {iconName:'shield',label:'Privacy Policy'},
    {iconName:'settings',label:'Licenses & version',value:'1.0.0'},
  ],'ABOUT');
  s += g.svg;
  g = U.settingsGroup(16,g.bottom+28,358,[
    {iconName:'logout',label:'Log out',chevron:false,danger:true},
  ],'');
  s += g.svg;
  s += B.wordmark(195,806,16,C.text3,'center');
  return U.screen(s);
}
module.exports={render};
