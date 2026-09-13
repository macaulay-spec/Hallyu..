const U = require('../ui');
const Cb = require('../content');
const { C } = U;
function render(){
  const d=Cb.d('snow');
  let s='';
  s += U.icon('back',16,58,24,C.text1,1.8);
  s += U.txt(52,76,d.title,'title',C.text1);
  s += U.txt(52,96,'16 episodes \u00B7 airing','caption',C.text3);
  s += U.hair(0,124,390);
  ['Overview','Cast','Episodes'].forEach((t,i)=>{
    const x=24+i*110;
    s+=U.txt(x,112,t,'bodyEm',i===2?C.text1:C.text3,{weight:i===2?600:400});
    if(i===2) s+=U.rect(x,122,64,2,C.text1,1);
  });
  const eps=[
    [10,'Aired Feb 21','2.4K',true],
    [9,'Aired Feb 20','1.9K',false],
    [8,'Aired Feb 14','2.2K',false],
    [7,'Aired Feb 13','1.6K',false],
    [6,'Aired Feb 7','1.8K',false],
  ];
  let y=148;
  for(const [n,date,count,next] of eps){
    s += U.rect(20,y,350,64,C.surface1,U.R.md,{stroke:C.hairSoft,sw:1});
    s += U.txt(36,y+26,'EP '+n,'title2',C.text1,{weight:700});
    s += U.txt(36,y+46,date,'caption',C.text3);
    s += U.icon('comment',236,y+24,18,C.text3,1.6);
    s += U.txt(258,y+38,count,'caption',C.text3);
    if(next){ s+=U.liveDot(292,y+56,'NEXT'); }
    s += U.icon('chevr',332,y+22,20,C.text3,1.8);
    y+=76;
  }
  s += U.txt(24,y+8,'Episode 11 airs Friday 9:30 PM','caption',C.text2);
  return U.screen(s);
}
module.exports={render};
