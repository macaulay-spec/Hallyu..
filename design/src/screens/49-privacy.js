const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(52,76,'Privacy','title',C.text1);
  let g = U.settingsGroup(16,116,358,[
    {iconName:'profile',label:'Private account',sub:'Only followers see your posts',chevron:false},
  ],'VISIBILITY');
  s += g.svg;
  // private toggle overlay
  s += U.toggle(332,140,false);
  g = U.settingsGroup(16,g.bottom+28,358,[
    {iconName:'close',label:'Blocked users',value:'2'},
    {iconName:'eyeoff',label:'Hidden communities',value:'1'},
  ],'PEOPLE');
  s += g.svg;
  g = U.settingsGroup(16,g.bottom+28,358,[
    {iconName:'download',label:'Export my data',sub:'Posts, DMs, profile \u2014 JSON'},
    {iconName:'logout',label:'Delete account',sub:'30-day grace period',danger:true},
  ],'YOUR DATA');
  s += g.svg;
  s += U.para(24,g.bottom+24,'We do not sell your personal data. See the Privacy Policy for how Firebase processes it and your regional rights.','caption',342,C.text3,17);
  return U.screen(s);
}
module.exports={render};
