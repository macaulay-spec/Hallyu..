const U = require('../ui');
const B = require('../brand');
const Cb = require('../content');
const { C, T, S, R } = U;

const W=390;
function sw(x,y,hex,label,h=44,w=100){
  let s = U.rect(x,y,w,h,hex,10,{stroke:'rgba(245,245,247,0.12)',sw:1});
  s += U.txt(x,y+h+16,label,'caption',C.text2);
  s += U.txt(x,y+h+32,hex,'caption',C.text3);
  return s;
}
function sec(y,title){ return U.txt(24,y,title,'overline',C.text3) ; }

function render(){
  const H=2560;
  let s='';
  // header
  s += B.mark(24,56,30);
  s += B.wordmark(66,82,22);
  s += U.txt(366,82,'v1.0 \u00B7 dark','caption',C.text3,{align:'right'});
  s += U.txt(24,128,'Design System','display',C.text1);
  s += U.txt(24,158,'OLED black \u00B7 editorial restraint \u00B7 one accent, used rarely.','body',C.text2);

  // COLOR
  let y=204;
  s += sec(y,'COLOR \u2014 SURFACES'); y+=22;
  s += sw(24,y,C.bg,'bg #000000',44,80); s += sw(116,y,C.surface1,'surface-1',44,80); s += sw(208,y,C.surface2,'surface-2',44,80); s += sw(300,y,'#1D1D22','surface-3',44,66);
  y+=100;
  s += sec(y,'COLOR \u2014 TEXT'); y+=22;
  s += sw(24,y,C.text1,'text-1',40,80); s += sw(116,y,C.text2,'text-2',40,80); s += sw(208,y,C.text3,'text-3',40,80);
  s += sw(300,y,'rgba(245,245,247,0.10)','hairline',40,66);
  y+=96;
  s += sec(y,'COLOR \u2014 ACCENT & SEMANTIC (rare)'); y+=22;
  s += sw(24,y,C.accent,'accent \u00B7 live/like'); s += sw(132,y,C.success,'success'); s += sw(240,y,C.warning,'warning'); s += sw(300+48,y,C.accent,'destructive',44,18);
  y+=104;
  s += U.para(24,y,'Accent appears only on: live/airing dots, liked hearts, destructive actions. Everything else is grayscale \u2014 color is signal, never decoration.','caption',342,C.text3,17);

  // TYPOGRAPHY
  y+=70; s += sec(y,'TYPOGRAPHY \u2014 INTER'); y+=34;
  const rows=[['display','32/38 \u00B7 700 \u00B7 -0.6'],['headline','26/32 \u00B7 700 \u00B7 -0.4'],['title','20/26 \u00B7 600'],['title2','17/24 \u00B7 600'],['body','15/22 \u00B7 400/600'],['caption','13/18 \u00B7 400'],['overline','11/14 \u00B7 600 \u00B7 +1.4']];
  const keys=['display','headline','title','title2','body','caption','overline'];
  keys.forEach((k,i)=>{
    const st=T[k];
    s += U.txt(24,y,'The weight of snow',k,C.text1);
    s += U.txt(366,y,rows[i][1],'caption',C.text3,{align:'right'});
    y += st.lh+16;
  });

  // SPACING & RADIUS
  y+=12; s += sec(y,'SPACING \u2014 4/8PT'); y+=20;
  let x=24;
  [4,8,12,16,20,24,32,40,48].forEach(v=>{ s += U.rect(x,y,v,v,C.surface3,2); s += U.txt(x,y+v+14,String(v),'caption',C.text3); x+=v+16; });
  y+=86; s += sec(y,'RADIUS'); y+=20;
  x=24;
  [[8,'8'],[12,'12'],[16,'16'],[20,'20'],[28,'sheet'],[999,'pill']].forEach(([r,l])=>{
    const rr=Math.min(r,24);
    s += U.rect(x,y,48,48,'none',{stroke:C.text2,sw:1.2});
    s += U.rect(x+6,y+6,36,36,C.surface2,rr);
    s += U.txt(x+24,y+66,l,'caption',C.text3,{align:'center'});
    x+=64;
  });

  // ELEVATION
  y+=100; s += sec(y,'ELEVATION \u2014 FLAT + HAIRLINE'); y+=22;
  s += U.rect(24,y,100,64,C.surface1,R.lg,{stroke:C.hairSoft,sw:1});
  s += U.rect(140,y,100,64,C.surface2,R.lg,{stroke:C.hairline,sw:1});
  s += U.rect(256,y,100,64,C.surface3,R.xl,{stroke:C.hairline,sw:1});
  s += U.txt(24,y+84,'card','caption',C.text3); s += U.txt(140,y+84,'raised','caption',C.text3); s += U.txt(256,y+84,'overlay','caption',C.text3);
  s += U.para(24,y+110,'Dark theme elevates by surface lightness steps + hairlines, not shadows. Shadows reserved for modals: 0 8 24 rgba(0,0,0,.5).','caption',342,C.text3,17);

  // ICONOGRAPHY
  y+=160; s += sec(y,'ICONOGRAPHY \u2014 1.7 STROKE, ROUND CAPS'); y+=26;
  const icons=['home','explore','communities','messages','profile','search','bell','heart','comment','share','bookmark','plus','back','close','more','play','settings','camera','image','video','tag','eyeoff','check','chevr','clock','shield','radio','lock'];
  x=24; let iy=y;
  icons.forEach((n,i)=>{
    s += U.icon(n,x,iy,22,C.text1,1.7);
    x+=40; if((i+1)%9===0){x=24; iy+=40;}
  });

  // IMAGERY
  y=iy+60; s += sec(y,'IMAGERY \u2014 SCRIM + DESATURATE'); y+=20;
  s += U.img(Cb.d('seongsu').poster,24,y,120,170,12);
  s += U.postMediaScrim(24,y,120,170);
  s += U.circle(84,y+85,17,C.scrim); s += U.icon('play',78,y+77,13,C.text1,1.5);
  s += U.rect(96,y+146,40,16,C.scrim,5); s += U.txt(116,y+158,'0:42','caption',C.text1,{align:'center'});
  s += U.img(Cb.d('snow').poster,160,y,120,170,12);
  s += U.postMediaScrim(160,y,120,170);
  s += U.para(296,y+8,'Posters crop 2:3. Bottom scrim 0\u21920.72 for legibility. Slight desaturation toward black keeps mixed sources unified.','caption',70,C.text3,16);

  // EMPTY / LOADING
  y+=200; s += sec(y,'EMPTY \u2014 TYPE-LED'); y+=20;
  s += B.mark(74,y+8,16,C.text3);
  s += U.txt(104,y+22,'Your feed is quiet','bodyEm',C.text1,{weight:600});
  s += U.txt(104,y+40,'Follow a few dramas\u2026','caption',C.text3);
  s += sec(220,y,'LOADING \u2014 STATIC BLOCKS');
  s += U.circle(252,y+14,14,C.surface2); s += U.skeleton(276,y+4,90,9,4); s += U.skeleton(276,y+20,60,7,4); s += U.skeleton(220,y+40,146,40,8);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${C.bg}"/>${s}</svg>`;
}
module.exports={render};
