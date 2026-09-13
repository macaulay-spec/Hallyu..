const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.txt(20,78,'Messages','title',C.text1);
  s += U.icon('edit',352,58,22,C.text1,1.7);
  s += U.searchBar(24,96,342,{placeholder:'Search conversations'});
  const convs=[
    ['u1','Miso','that OST drop at the door close\u2026','2m',true],
    ['u3','Hana','sending you the recap draft, be brutal','41m',true],
    ['u2','Dae','ep 15. tonight. you in?','3h',false],
    ['u4','Jun','no spoilers I\u2019m only on ep 6!!','1d',false],
    ['u5','Rin','the sageuk rec list you asked for','2d',false],
  ];
  let y=168;
  for(const [id,name,prev,time,unread] of convs){
    s += U.avatar(Cb.u(id),24,y,50);
    if(unread) s += U.circle(66,y+6,5,C.accent);
    s += U.txt(90,y+18,name,'bodyEm',C.text1,{weight:unread?700:500});
    s += U.txt(90,y+40,prev,'caption',unread?C.text1:C.text3);
    s += U.txt(366,y+18,time,'caption',unread?C.text1:C.text3,{align:'right'});
    s += U.hair(90,y+64,276,C.hairSoft);
    y+=65;
  }
  s += U.tabBar('Messages');
  return U.screen(s);
}
module.exports={render};
