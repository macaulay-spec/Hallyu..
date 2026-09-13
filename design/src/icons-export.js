// Deterministic app icon exports from the canonical vector mark.
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');
const { mark } = require('./brand');
const FONTS = '/home/user/hallyu-design/fonts';
const OUT = path.join(__dirname, '..', 'brand');
fs.mkdirSync(OUT, { recursive: true });
const fontFiles = fs.readdirSync(FONTS).filter(f=>f.endsWith('.ttf')).map(f=>path.join(FONTS,f));

function render(svg, px, file){
  const r = new Resvg(svg, { font:{ fontFiles, loadSystemFonts:false, defaultFontFamily:'Inter' }, fitTo:{ mode:'width', value:px } });
  fs.writeFileSync(path.join(OUT, file), r.render().asPng());
  console.log('icon', file, px);
}
// iOS rounded square tiles — black, white mark, generous safe-zone
for (const [px, file] of [[1024,'icon-ios-1024.png'],[512,'icon-ios-512.png'],[180,'icon-ios-180.png'],[120,'icon-ios-120.png']]){
  const m = 1024*0.26; // mark inset
  render(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><rect width="1024" height="1024" fill="#000"/>${mark(m, m+1024*0.05, 1024-2*m, '#F5F5F7')}</svg>`, px, file);
}
// Android adaptive — full-bleed background + safe-zone mark (66% inner)
{
  const m = 1024*0.34;
  render(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><rect width="1024" height="1024" fill="#000"/>${mark(m, m, 1024-2*m, '#F5F5F7')}</svg>`, 432, 'icon-android-432.png');
}
// favicon
for (const px of [32,16]) render(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#000"/>${mark(14,15,34,'#F5F5F7')}</svg>`, px, `favicon-${px}.png`);
// monochrome mark on transparent (for splash/watermarks/dark surfaces)
render(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">${mark(56,66,400,'#F5F5F7')}</svg>`, 512, 'mark-mono-512.png');
