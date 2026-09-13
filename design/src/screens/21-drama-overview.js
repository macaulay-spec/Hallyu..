const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  const d=Cb.d('snow');
  let s='';
  s += U.img(d.poster,-40,-140,470,470,0);
  s += `<defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0.1" stop-color="#000" stop-opacity="0.1"/><stop offset="0.85" stop-color="#000" stop-opacity="1"/></linearGradient></defs>`;
  s += `<rect y="80" width="390" height="250" fill="url(#dg)"/>`;
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.circle(331,64,18,C.scrim); s+=U.icon('share',322,55,18,C.text1,1.7);
  s += U.circle(371,64,18,C.scrim); s+=U.icon('more',362,55,18,C.text1,2);
  s += U.txt(24,300,d.title,'display',C.text1);
  s += U.txt(24,330,'Melodrama \u00B7 Romance  \u00B7  16 ep  \u00B7  \u2605 9.1','caption',C.text2);
  // countdown card
  s += U.rect(24,352,342,64,C.surface1,U.R.lg,{stroke:C.hairline,sw:1});
  s += U.liveDot(40,380,'AIRING');
  s += U.txt(40,402,'Next episode Fri 9:30 PM \u00B7 in 2d 14h','caption',C.text2);
  s += U.icon('clock',322,372,22,C.text2,1.7);
  // actions
  s += U.button(24,436,218,'Following',{kind:'secondary',iconName:'check'});
  s += U.button(254,436,112,'Discuss',{kind:'primary'});
  // tabs
  s += U.hair(0,540,390);
  ['Overview','Cast','Episodes'].forEach((t,i)=>{
    const x=24+i*110;
    s+=U.txt(x,528,t,'bodyEm',i===0?C.text1:C.text3,{weight:i===0?600:400});
    if(i===0) s+=U.rect(x,538,56,2,C.text1,1);
  });
  s += U.txt(24,584,'SYNOPSIS','overline',C.text3);
  s += U.para(24,606,'A grief counselor who has stopped feeling and a funeral director who feels too much inherit the same failing practice in a snowbound mountain town. Over one winter, they learn whether mourning is a debt or a craft.','body',342,C.text2,22);
  s += U.txt(24,742,'Director Lee Seo-jin  \u00B7  Writer Park Ha-eun','caption',C.text3);
  return U.screen(s);
}
module.exports={render};
