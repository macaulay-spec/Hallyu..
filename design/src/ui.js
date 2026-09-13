// Hallyu SVG UI framework — renders iPhone screens at 390x844pt, exported at 3x.
const fs = require('fs');
const path = require('path');
const { C, T, S, R } = require('./tokens');

const ASSETS = path.join(__dirname, '..', 'assets');
const BRAND = path.join(__dirname, '..', 'brand');

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// ---- png size parser (for cover-fit) ----
function pngSize(buf){ return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }; }
function dataURI(p){
  const abs = p.startsWith('/') ? p : path.join(ASSETS, p);
  if(!fs.existsSync(abs)) return null;
  const b = fs.readFileSync(abs);
  return { uri: 'data:image/png;base64,' + b.toString('base64'), size: pngSize(b) };
}

// cover-fit an image into w x h (graceful placeholder if asset not generated yet)
function img(p, x, y, w, h, rx){
  const got = dataURI(p);
  if(!got){
    return rect(x,y,w,h,C.surface2,rx||0) + circle(x+w/2,y+h/2,Math.min(w,h)*0.18,C.surface3);
  }
  const { uri, size } = got;
  const sc = Math.max(w/size.w, h/size.h);
  const sw = size.w*sc, sh = size.h*sc;
  const dx = x + (w-sw)/2, dy = y + (h-sh)/2;
  const clip = rx!=null ? `clip-path="url(#c${(x+'_'+y+'_'+w+'_'+h+'_'+rx).replace(/\W/g,'')})"` : '';
  let def = '';
  if (rx!=null) def = `<clipPath id="c${(x+'_'+y+'_'+w+'_'+h+'_'+rx).replace(/\W/g,'')}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/></clipPath>`;
  return def + `<image ${clip} href="${uri}" x="${dx}" y="${dy}" width="${sw}" height="${sh}" preserveAspectRatio="none"/>`;
}

// ---- text ----
function txt(x, y, str, style, fill=C.text1, o={}){
  const tt = T[style] || T.body; const t = o.size? {...tt, size:o.size, lh:o.size*1.3} : tt;
  const extra = o.ls!=null ? o.ls : 0;
  const anchor = o.align==='center' ? 'middle' : o.align==='right' ? 'end' : 'start';
  const op = o.opacity!=null ? ` opacity="${o.opacity}"` : '';
  const upper = o.upper ? String(str).toUpperCase() : str;
  return `<text x="${x}" y="${y}" font-family="Inter" font-size="${t.size}" font-weight="${o.weight||t.w}" letter-spacing="${(t.ls+extra).toFixed(2)}" fill="${fill}" text-anchor="${anchor}"${op}>${esc(upper)}</text>`;
}
// approx line wrapping (Inter avg advance ~0.56em; caps/ls adjust)
function wrap(str, maxW, style){
  const t = T[style]; const avg = t.size*0.56 + t.ls;
  const words = String(str).split(' ');
  const lines=[]; let cur='';
  for(const w of words){
    const test = cur ? cur+' '+w : w;
    if (test.length*avg > maxW && cur){ lines.push(cur); cur=w; } else cur=test;
  }
  if (cur) lines.push(cur);
  return lines;
}
function para(x, y, str, style, maxW, fill=C.text2, lh){
  const t=T[style]; const lines=wrap(str,maxW,style);
  return lines.map((l,i)=>txt(x, y+i*(lh||t.lh), l, style, fill)).join('');
}

// ---- primitives ----
const rect=(x,y,w,h,fill,rx=0,o={})=>{
  rx = Math.min(rx, h/2, w/2);
  const st = o.stroke?` stroke="${o.stroke}" stroke-width="${o.sw||1}"`:'';
  const op = o.opacity!=null?` opacity="${o.opacity}"`:'';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${st}${op}/>`;
};
const line=(x1,y1,x2,y2,color,w=1)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}"/>`;
const circle=(cx,cy,r,fill,o={})=>{const st=o.stroke?` stroke="${o.stroke}" stroke-width="${o.sw||1}"`:'';return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${st}/>`;};

function hair(x,y,w,color=C.hairline){ return rect(x,y,w,1,color,0); }

// ---- icons (24 grid, stroke) ----
const IC = {
  home:'M4 11.2 12 4.6l8 6.6M6.2 9.8V19a1 1 0 0 0 1 1h3.2v-5.4h3.2V20h3.2a1 1 0 0 0 1-1V9.8',
  explore:'M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8Zm3.4 5-1.9 4.9-4.9 1.9 1.9-4.9 4.9-1.9Z',
  communities:'M8.6 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6.9-.4a2.6 2.6 0 1 0-2.4-3.9M3.8 19c.5-3 2.4-4.8 4.8-4.8S12.9 16 13.4 19m1.5-4.6c2 .3 3.5 1.9 4 4.6',
  messages:'M12 4.4c4.9 0 8.4 3.1 8.4 7.2s-3.5 7.2-8.4 7.2c-1 0-2-.1-2.8-.4L5 20l.9-3.4c-1.5-1.3-2.3-3-2.3-5 0-4.1 3.5-7.2 8.4-7.2Z',
  profile:'M12 11a3.4 3.4 0 1 0 0-6.8A3.4 3.4 0 0 0 12 11Zm-6.6 8.6c.7-3.6 3.3-5.6 6.6-5.6s5.9 2 6.6 5.6',
  search:'M10.8 4.8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm9.4 15.4-4.6-4.6',
  bell:'M12 4.2c-3.2 0-5.2 2.3-5.4 5.4-.1 2.2-.6 3.7-1.6 5h14c-1-1.3-1.5-2.8-1.6-5-.2-3.1-2.2-5.4-5.4-5.4Zm-2.2 12.6a2.3 2.3 0 0 0 4.4 0',
  heart:'M12 19.6S4.8 15 4.8 9.9c0-2.6 2-4.5 4.4-4.5 1.2 0 2.2.6 2.8 1.5.6-.9 1.6-1.5 2.8-1.5 2.4 0 4.4 1.9 4.4 4.5 0 5.1-7.2 9.7-7.2 9.7Z',
  comment:'M12 4.6c4.7 0 8.2 2.9 8.2 6.8s-3.5 6.8-8.2 6.8c-.9 0-1.9-.1-2.7-.4L5.4 19l.8-3.2c-1.4-1.2-2.4-2.8-2.4-4.4 0-3.9 3.5-6.8 8.2-6.8Z',
  share:'M13.4 5.2 19.6 11l-6.2 5.8v-3.6c-4.4 0-7.4 1.4-9.4 4.2.4-5 3.4-8.6 9.4-9.2V5.2Z',
  bookmark:'M7 4.6h10V20l-5-3.4L7 20V4.6Z',
  plus:'M12 5.4v13.2M5.4 12h13.2',
  back:'M14.6 5.4 8 12l6.6 6.6',
  close:'M6.4 6.4l11.2 11.2M17.6 6.4 6.4 17.6',
  more:'M6 12h.01M12 12h.01M18 12h.01',
  play:'M9.4 6.6v10.8L18 12 9.4 6.6Z',
  settings:'M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm8 2.8-2.2.6a6 6 0 0 1-.7 1.7l1.2 2-1.9 1.9-2-1.2a6 6 0 0 1-1.7.7L12 20h-2.7l-.6-2.3a6 6 0 0 1-1.7-.7l-2 1.2-1.9-1.9 1.2-2a6 6 0 0 1-.7-1.7L2 12l2.3-.6a6 6 0 0 1 .7-1.7l-1.2-2 1.9-1.9 2 1.2a6 6 0 0 1 1.7-.7L10 4h2.7l.6 2.3a6 6 0 0 1 1.7.7l2-1.2 1.9 1.9-1.2 2c.3.5.6 1.1.7 1.7L20 12Z',
  camera:'M8 7.4 9.4 5h5.2L16 7.4h3.4a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4.6a1 1 0 0 1-1-1V8.4a1 1 0 0 1 1-1H8Zm4 8.6a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z',
  image:'M5 5h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm3.4 5.2a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM4.6 16.4l4.6-4.6 3.4 3.4 3-3 3.8 4.2',
  video:'M4.6 6.4h10.8a1 1 0 0 1 1 1v9.2a1 1 0 0 1-1 1H4.6a1 1 0 0 1-1-1V7.4a1 1 0 0 1 1-1Zm11.8 4 4-2.6v8.4l-4-2.6',
  tag:'M4.6 4.6h7l7.8 7.8-7 7-7.8-7.8v-7Zm4 4h.01',
  eyeoff:'M4 4l16 16M9.9 5.2A9.8 9.8 0 0 1 12 5c5 0 8.6 4 9.6 7-.4 1.1-1.1 2.4-2.2 3.5M6.4 6.6C4.5 8 3.1 10 2.4 12c1 3 4.6 7 9.6 7 1.4 0 2.7-.3 3.8-.9M10 10.2a2.8 2.8 0 0 0 3.9 3.9',
  check:'M5.6 12.6l4.2 4.2 8.6-9.6',
  chevr:'M9.4 5.4 16 12l-6.6 6.6',
  chevD:'M6 9.4l6 6.2 6-6.2',
  send:'M4.4 11 19.6 4.4 14 19.6l-2.6-6L4.4 11Z',
  lock:'M7.4 10.4V8.6a4.6 4.6 0 0 1 9.2 0v1.8m-10.2 0h11.2a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H6.4a1 1 0 0 1-1-1v-7.6a1 1 0 0 1 1-1Z',
  globe:'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-8 8h16M12 4c-2.2 2.2-3.2 5-3.2 8s1 5.8 3.2 8c2.2-2.2 3.2-5 3.2-8s-1-5.8-3.2-8Z',
  users2:'M9 11a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 9 11Zm-5.6 8.4c.6-3.2 2.8-5 5.6-5s5 1.8 5.6 5M16.4 5a3.2 3.2 0 0 1 0 6.2m1 3.4c2 .5 3.4 2.1 3.9 4.6',
  edit:'M4.6 19.4l.8-3.4L16.6 4.8a1.6 1.6 0 0 1 2.3 0l.3.3a1.6 1.6 0 0 1 0 2.3L8 18.6l-3.4.8Z',
  clock:'M12 4.4a7.6 7.6 0 1 0 0 15.2A7.6 7.6 0 0 0 12 4.4Zm0 3.8V12l3 2.2',
  download:'M12 4.4v10m0 0 4-4m-4 4-4-4M5 19.6h14',
  logout:'M14 8V6a1.6 1.6 0 0 0-1.6-1.6H6A1.6 1.6 0 0 0 4.4 6v12A1.6 1.6 0 0 0 6 19.6h6.4A1.6 1.6 0 0 0 14 18v-2m-4.4-4H19.6m0 0-3-3m3 3-3 3',
  shield:'M12 4l7 2.6v5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9v-5L12 4Z',
  moon:'M19.6 14.2A8 8 0 0 1 9.8 4.4a8 8 0 1 0 9.8 9.8Z',
  apple:'M15.6 6.8c-1 0-2 .6-2.7.6-.7 0-1.6-.6-2.7-.6-2 0-4 1.8-4 5 0 3.8 3 7.6 4.6 7.6.8 0 1.4-.5 2.5-.5s1.6.5 2.5.5c1.7 0 4.2-4 4.2-5.6-2.4-1.2-2.6-4.4-.2-5.6-.7-.9-1.8-1.4-3-1.4h-1.2Zm-2-1.6c.5-.7.9-1.6.8-2.6-.9.1-1.9.7-2.4 1.4-.5.6-.9 1.6-.8 2.5 1 .1 1.9-.6 2.4-1.3Z',
  google:'M12 10.8v2.8h4.7c-.5 2-2.2 3.4-4.7 3.4a5 5 0 1 1 3.3-8.8l2.1-2.1A8 8 0 1 0 20 12c0-.4 0-.8-.1-1.2H12Z',
  radio:'M12 10.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm-4.2 5.8a6 6 0 0 1 0-8.4m8.4 0a6 6 0 0 1 0 8.4M5.6 18.4a9 9 0 0 1 0-12.8m12.8 0a9 9 0 0 1 0 12.8',
  grid:'M4.6 4.6h6v6h-6v-6Zm8.8 0h6v6h-6v-6ZM4.6 13.4h6v6h-6v-6Zm8.8 0h6v6h-6v-6Z',
  flame:'M12 3.4c3 4 6 6.8 6 10.2a6 6 0 0 1-12 0c0-2 1-3.9 2.5-5.5.2 1.4 1 2.4 2 2.9-.3-2.6.4-5.2 1.5-7.6Z',
  tear:'M12 4.2c3.8 4.8 6 8 6 10.8a6 6 0 0 1-12 0c0-2.8 2.2-6 6-10.8Z',
  volume:'M4.6 9.4v5.2h3.4l4.4 3.6V5.8L8 9.4H4.6Zm11-1.4a5 5 0 0 1 0 8m2.2-10.6a8 8 0 0 1 0 13.2',
  mute:'M4.6 9.4v5.2h3.4l4.4 3.6V5.8L8 9.4H4.6Zm10.8.8 5.2 5.2m0-5.2-5.2 5.2',
  wifiOff:'M2 8.8C4.8 6.4 8.2 5 12 5s7.2 1.4 10 3.8M5.4 12.2a10 10 0 0 1 6.6-2.6c2.5 0 4.8.9 6.6 2.6M8.8 15.6a5.4 5.4 0 0 1 6.4 0M12 19.4h.01',
};
function icon(name,x,y,size,color=C.text1,sw=1.7,o={}){
  const p = IC[name]; if(!p) return '';
  const op = o.opacity!=null?` opacity="${o.opacity}"`:'';
  const fill = o.fill ? `fill="${color}" stroke="none"` : `fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
  return `<g transform="translate(${x},${y}) scale(${size/24})"${op}><path d="${p}" ${fill}/></g>`;
}

// ---- chrome ----
function statusBar(light=true){
  const c = C.text1;
  return `
  <g>
    ${txt(30,33,'9:41','bodyEm',c,{weight:600})}
    <g transform="translate(316,20)" fill="${c}">
      <rect x="0" y="7" width="3" height="5" rx="0.8"/><rect x="4.4" y="5" width="3" height="7" rx="0.8"/><rect x="8.8" y="3" width="3" height="9" rx="0.8"/><rect x="13.2" y="1" width="3" height="11" rx="0.8"/>
      <path d="M24 4.6c2.9 0 5.6 1.1 7.6 3l-1.6 1.7a8.6 8.6 0 0 0-12 0l-1.6-1.7a11 11 0 0 1 7.6-3Zm0 4.4c1.7 0 3.3.7 4.5 1.8l-1.6 1.7a4.4 4.4 0 0 0-5.8 0l-1.6-1.7A6.7 6.7 0 0 1 24 9Zm0 4.4c.9 0 1.7.3 2.3.9L24 16.6l-2.3-2.3c.6-.6 1.4-.9 2.3-.9Z" stroke="none"/>
      <rect x="36" y="2.6" width="21" height="10.6" rx="3" fill="none" stroke="${c}" stroke-width="1" opacity="0.5"/><rect x="57.8" y="5.8" width="1.8" height="4.2" rx="0.9" opacity="0.5"/><rect x="37.6" y="4.2" width="14" height="7.4" rx="1.6"/>
    </g>
  </g>`;
}
function homeIndicator(){ return rect(128,828,134,5,C.text1,2.5,{opacity:0.9}); }

const TABS=[['home','Home'],['explore','Explore'],['communities','Communities'],['messages','Messages'],['profile','Profile']];
function tabBar(active){
  const y=778; const w=390/5;
  let s = rect(0,y,390,66,C.bg) + rect(0,y,390,1,C.hairline);
  TABS.forEach(([ic,label],i)=>{
    const cx=w*i+w/2; const on=label===active;
    s += icon(ic,cx-12,y+10,24,on?C.text1:C.text3,1.7);
    s += txt(cx,y+46,label,'caption',on?C.text1:C.text3,{align:'center',weight:on?600:400,size:11});
  });
  return s + homeIndicator();
}

function topBar(title,{back=false,actions=[],sub=null}={}){
  let s='';
  if(back) s+=icon('back',14,54,24,C.text1,1.8);
  s+=txt(back?48:20, 76, title, 'title', C.text1);
  if(sub) s+=txt(back?48:20, 96, sub, 'caption', C.text3);
  actions.forEach((a,i)=>{ s+=icon(a, 390-26-28*i, 58, 22, C.text1, 1.8); });
  return s;
}

// ---- components ----
function avatar(ref, x, y, size, ring=false){
  // ref: user obj (monogram) or {photo}
  if (ref && ref.photo){
    let s='';
    if(ring) s+=circle(x+size/2,y+size/2,size/2+1.5,'none',{stroke:C.hairline,sw:1});
    return s+img(ref.photo,x,y,size,size,size/2);
  }
  const initials = ref.initials||'HA';
  return circle(x+size/2,y+size/2,size/2,C.surface2,{stroke:C.hairline,sw:1}) +
    txt(x+size/2,y+size/2+size*0.18,initials,'caption',C.text2,{align:'center',weight:600});
}
function verified(x,y,size=14){
  return circle(x+size/2,y+size/2,size/2,C.text1) + icon('check',x+size*0.18,y+size*0.2,size*0.64,C.bg,2.6);
}
function liveDot(x,y,label='LIVE'){
  return circle(x+4,y-4,3.5,C.accent) + txt(x+12,y,label,'overline',C.accent);
}
function button(x,y,w,label,{kind='primary',h=48,iconName=null}={}){
  let s='';
  if(kind==='primary') s+=rect(x,y,w,h,C.text1,R.pill);
  else if(kind='secondary') s+=rect(x,y,w,h,C.surface2,R.pill,{stroke:C.hairline,sw:1});
  else if(kind='danger') s+=rect(x,y,w,h,C.accentSoft,R.pill,{stroke:C.accent,sw:1});
  else s+=rect(x,y,w,h,'transparent',R.pill);
  const fill = kind==='primary'?C.bg: kind==='danger'?C.accent: C.text1;
  const textW = label.length * 15 * 0.58;
  if(iconName){
    const total = 22 + 10 + textW;
    const sx = x + (w-total)/2;
    s += icon(iconName, sx, y+h/2-11, 22, fill, 1.8);
    s += txt(sx+32, y+h/2+5.5, label, 'bodyEm', fill, {weight:600});
  } else {
    s += txt(x+w/2, y+h/2+5.5, label, 'bodyEm', fill, {align:'center',weight:600});
  }
  return s;
}
function chip(x,y,label,{on=false,w=null,small=false}={}){
  const width = w || label.length*(small?6.2:7.4)+(small?20:28);
  const s = rect(x,y,width,30,on?C.text1:C.surface1,R.pill, on?{}:{stroke:C.hairline,sw:1});
  return s + txt(x+width/2,y+19.5,label,'caption',on?C.bg:C.text2,{align:'center',weight:on?600:400,size:small?11:13});
}
function toggle(x,y,on){
  return rect(x,y,46,28,on?C.text1:C.surface3,R.pill) + circle(on?x+32:x+14,y+14,11,on?C.bg:C.text3);
}
function skeleton(x,y,w,h,rx=8){ return rect(x,y,w,h,C.surface2,rx); }

function field(x,y,w,label,{placeholder='',value='',secure=false,h=52}={}){
  let s = txt(x,y,label,'overline',C.text2);
  s += rect(x,y+10,w,h,C.surface1,R.md,{stroke:C.hairline,sw:1});
  const shown = secure && value ? '•'.repeat(Math.min(value.length,12)) : (value||placeholder);
  s += txt(x+16,y+10+h/2+5,shown,'body',value?C.text1:C.text3);
  if(secure && value) s += icon('eyeoff',x+w-36,y+10+h/2-11,20,C.text3,1.7);
  return { svg:s, bottom: y+10+h };
}

function postMediaScrim(x,y,w,h){
  return `<defs><linearGradient id="sc${x}_${y}" x1="0" y1="0" x2="0" y2="1"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.72"/></linearGradient></defs><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#sc${x}_${y})"/>`;
}

function postCard(x,y,w,post,{media=true}={}){
  const u=post.user; let s='';
  const px=x+16; const iw=w-32;
  const lines = post.text ? wrap(post.text,iw,'body') : [];
  const textH = lines.length ? 10 + lines.length*21 + 4 : 0;
  const showMedia = media && !!post.poster;
  const mh = showMedia ? (post.mediaH||210) : 0;
  const total = 16 + 52 + textH + (mh? mh+12:0) + 20 + 14;
  s+=rect(x,y,w,total, C.surface1, R.lg, {stroke:C.hairSoft,sw:1});
  let cy=y+16;
  s+=avatar(u,px,cy,38);
  s+=txt(px+50,cy+15,u.name,'bodyEm',C.text1,{weight:600});
  s+=txt(px+50,cy+33,'@'+u.handle+' · '+post.time,'caption',C.text3);
  if(post.tagged) s+=chip(x+w-16-(Math.min(post.tagged.length,16)*7.4+28), cy+4, post.tagged.length>16?post.tagged.slice(0,15)+'…':post.tagged, {on:false});
  else s+=icon('more',x+w-40,cy+8,20,C.text3,2);
  cy+=52;
  if(lines.length){ s+=para(px,cy+10,post.text,'body',iw,C.text1,21); cy+=textH; }
  if(showMedia){
    s+=img(post.poster,px,cy,iw,mh,R.md);
    if(post.duration) s+=rect(px+iw-52,cy+mh-24,44,18,C.scrim,5)+txt(px+iw-30,cy+mh-11,post.duration,'caption',C.text1,{align:'center'});
    if(post.spoiler) s+=rect(px,cy,iw,mh,C.bg,0,{opacity:0.82})+txt(px+iw/2,cy+mh/2,'SPOILER','overline',C.text3,{align:'center'})+txt(px+iw/2,cy+mh/2+18,'Tap to reveal','caption',C.text3,{align:'center'});
    cy+=mh+12;
  }
  const ax=px;
  s+=icon('heart',ax,cy,20,post.liked?C.accent:C.text2,1.7,{fill:post.liked?1:0});
  s+=txt(ax+26,cy+15,post.likes,'caption',C.text2);
  s+=icon('comment',ax+72,cy,20,C.text2,1.7);
  s+=txt(ax+98,cy+15,post.comments,'caption',C.text2);
  s+=icon('share',ax+150,cy,20,C.text2,1.7);
  s+=icon('bookmark',x+w-36,cy,20,post.saved?C.text1:C.text2,1.7);
  return { svg:s, h: total };
}

function screen(body,{title=null,tab=null}={}){
  return `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844">
  <rect width="390" height="844" fill="${C.bg}"/>
  ${statusBar()}${body}</svg>`;
}

function searchBar(x,y,w,{placeholder='Search dramas, actors, communities',query='',focused=false}={}){
  let s = rect(x,y,w,44,C.surface1,R.md,{stroke:focused?C.text2:C.hairline,sw:1});
  s += icon('search',x+14,y+11,20,C.text3,1.8);
  s += txt(x+44,y+28,query||placeholder,'body',query?C.text1:C.text3);
  if(focused) s += rect(x+44+ (query.length*8)+6, y+13, 1.5, 18, C.text1);
  if(query) s += icon('close',x+w-32,y+12,18,C.text3,1.8);
  return s;
}
function segBar(x,y,segs,active,w=350){
  const sw=w/segs.length;
  let s = rect(x,y,w,36,C.surface1,R.md);
  const i = segs.indexOf(active);
  s += rect(x+4+i*(sw-4)- (i? 0:0), y+4, sw-8, 28, C.surface3, 8);
  segs.forEach((g,j)=>{ s+=txt(x+sw*j+sw/2, y+23, g, 'caption', g===active?C.text1:C.text3, {align:'center',weight:g===active?600:400}); });
  return s;
}
function listRow(x,y,w,{iconName,label,value='',chevron=true,danger=false,sub=null}){
  let s='';
  if(iconName) s+=icon(iconName,x+4,y+ (sub?6:8),20,danger?C.accent:C.text2,1.7);
  const lx = iconName? x+36: x+4;
  s+=txt(lx,y+(sub?14:20),label,'body',danger?C.accent:C.text1,{weight:450});
  if(sub) s+=txt(lx,y+32,sub,'caption',C.text3);
  if(value) s+=txt(x+w-30,y+20,value,'caption',C.text3,{align:'right'});
  if(chevron) s+=icon('chevr',x+w-22,y+8,18,C.text3,1.8);
  return s;
}
function settingsGroup(x,y,w,rows,title){
  let s = title? txt(x+4,y,'title'===''?'':title,'overline',C.text3):'';
  const h = rows.length*48+8;
  s += rect(x,y+(title?14:0),w,h,C.surface1,R.lg,{stroke:C.hairSoft,sw:1});
  rows.forEach((r,i)=>{
    s += listRow(x+12,y+(title?14:0)+8+i*48,w-24,r);
    if(i<rows.length-1) s+=hair(x+36,y+(title?14:0)+8+(i+1)*48,w-48,C.hairSoft);
  });
  return { svg:s, bottom: y+(title?14:0)+h };
}
function commentRow(x,y,w,{user,text,time,likes='12',op=false}){
  let s = avatar(user,x,y,30);
  s += txt(x+42,y+12,user.handle,'caption',C.text1,{weight:600});
  s += txt(x+42+user.handle.length*7.6+52,y+12,time,'caption',C.text3);
  s += para(x+42,y+32,text,'caption',w-70,C.text2,17);
  const lines = wrap(text,w-70,'caption').length;
  s += txt(x+42,y+32+lines*17+14,'Reply','caption',C.text3,{weight:600});
  s += icon('heart',x+w-20,y+26,16,C.text3,1.6);
  s += txt(x+w-20,y+52,likes,'caption',C.text3,{align:'right'});
  return { svg:s, h: 32+lines*17+26 };
}
module.exports = { esc, img, txt, para, wrap, rect, line, circle, hair, icon, IC, statusBar, homeIndicator, tabBar, topBar, avatar, verified, liveDot, button, chip, toggle, skeleton, postCard, field, postMediaScrim, searchBar, segBar, listRow, settingsGroup, commentRow, screen, C, T, S, R };
