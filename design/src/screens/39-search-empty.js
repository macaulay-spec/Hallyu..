const U = require('../ui');
const { C } = U;
function render(){
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.searchBar(48,56,318,{placeholder:'Search Hallyu',focused:true});
  s += U.txt(24,140,'TRENDING','overline',C.text3);
  const t=[['The Weight of Snow','Drama \u00B7 airing'],['Seo Ji-won','Actor'],['rooftop scene','Post \u00B7 48.2K views'],['Signal Fire','Drama'],['sageuk recs','Community \u00B7 Sageuk Historians']];
  let y=158;
  t.forEach(([q,meta],i)=>{
    s += U.txt(32,y+20,String(i+1),'title2',C.text3,{weight:700});
    s += U.txt(64,y+14,q,'bodyEm',C.text1,{weight:600});
    s += U.txt(64,y+34,meta,'caption',C.text3);
    s += U.icon('search',350,y+12,18,C.text3,1.7);
    s += U.hair(64,y+48,302,C.hairSoft);
    y+=50;
  });
  s += U.txt(24,y+34,'RECENT','overline',C.text3);
  s += U.txt(24,y+62,'blue hour clinic','body',C.text2);
  s += U.icon('close',350,y+54,16,C.text3,1.7);
  return U.screen(s);
}
module.exports={render};
