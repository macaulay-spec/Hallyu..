const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(52,76,'Account','title',C.text1);
  let g = U.settingsGroup(16,116,358,[
    {iconName:'profile',label:'Email',value:'you@example.com'},
    {iconName:'lock',label:'Change password'},
  ],'CREDENTIALS');
  s += g.svg;
  g = U.settingsGroup(16,g.bottom+28,358,[
    {iconName:'download',label:'Download your data',sub:'Export posts, messages, profile'},
  ],'DATA');
  s += g.svg;
  g = U.settingsGroup(16,g.bottom+28,358,[
    {iconName:'close',label:'Delete account',sub:'Permanent after 30 days',chevron:true,danger:true},
  ],'DANGER ZONE');
  s += g.svg;
  s += U.para(24,g.bottom+24,'Deleting your account removes your profile, posts and messages after a 30-day grace period. Moderation records are retained as required by policy.','caption',342,C.text3,17);
  return U.screen(s);
}
module.exports={render};
