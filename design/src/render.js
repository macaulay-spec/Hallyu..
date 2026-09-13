const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');
const FONTS = path.join(__dirname, '..', '..', '..', 'hallyu-design', 'fonts');

const out = path.join(__dirname, '..', 'out');
fs.mkdirSync(out, { recursive: true });

const which = process.argv[2] || 'all';
const files = fs.readdirSync(path.join(__dirname,'screens')).filter(f=>f.endsWith('.js'));
const fontFiles = fs.readdirSync(FONTS).filter(f=>f.endsWith('.ttf')).map(f=>path.join(FONTS,f));

let done=0;
for (const f of files){
  const name = f.replace(/\.js$/,'');
  if (which!=='all' && which!==name) continue;
  const mod = require(path.join(__dirname,'screens',f));
  const svg = mod.render();
  const r = new Resvg(svg, { font: { fontFiles, loadSystemFonts:false, defaultFontFamily:'Inter' }, fitTo:{ mode:'width', value:1170 } });
  fs.writeFileSync(path.join(out, name+'.png'), r.render().asPng());
  done++;
  console.log('rendered', name);
}
console.log('total', done);
