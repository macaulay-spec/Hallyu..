const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  let s='';
  s += U.txt(24,72,'STEP 1 OF 3','overline',C.text3);
  s += U.txt(24,110,'What do you love?','headline',C.text1);
  s += U.txt(24,142,'Pick at least 3 genres to shape your feed.','body',C.text2);
  const picked = new Set(['Romance','Thriller','Historical','Medical']);
  let x=24, y=196;
  for(const g of Cb.genres){
    const w = g.length*7.4+28;
    if(x+w>366){ x=24; y+=42; }
    s += U.chip(x,y,g,{on:picked.has(g)});
    x += w+10;
  }
  s += U.txt(24,y+76,`${picked.size} selected \u00B7 minimum 3`,'caption',C.text2);
  s += U.button(24,756,342,'Continue',{kind:'primary'});
  return U.screen(s);
}
module.exports={render};
