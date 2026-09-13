const U = require('../ui');
const B = require('../brand');
const { C } = U;
function render(){
  let s='';
  s += B.wordmark(20,78,22);
  s += U.icon('search',312,58,22,C.text1,1.8);
  s += U.icon('bell',350,58,22,C.text1,1.8);
  s += B.mark(181,330,28,C.text3);
  s += U.txt(195,412,'Your feed is quiet','title',C.text1,{align:'center'});
  s += U.para(70,442,'Follow a few dramas and your feed fills with the people watching them right now.','body',250,C.text2);
  s += U.button(95,506,200,'Find dramas',{kind:'primary'});
  s += U.tabBar('Home');
  return U.screen(s);
}
module.exports={render};
