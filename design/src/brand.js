// Vector brand mark — the canonical in-app version of the Hallyu "H" (two stems + rising crossbar).
const { C } = require('./tokens');

function mark(x, y, s, color = C.text1){
  const lw = s*0.16;
  const left  = `<rect x="${x}" y="${y}" width="${lw}" height="${s}" fill="${color}"/>`;
  const right = `<rect x="${x+s*0.64}" y="${y+s*0.06}" width="${lw}" height="${s*0.72}" fill="${color}"/>`;
  const bar = `<polygon points="${x-s*0.16},${y+s*0.68} ${x-s*0.16},${y+s*0.54} ${x+s*0.94},${y+s*0.30} ${x+s*0.94},${y+s*0.44}" fill="${color}"/>`;
  return left+right+bar;
}
function wordmark(x, y, size, color = C.text1, align='start'){
  return `<text x="${x}" y="${y}" font-family="Inter" font-weight="600" font-size="${size}" letter-spacing="${(-size*0.02).toFixed(2)}" fill="${color}" text-anchor="${align==='center'?'middle':'start'}">hallyu</text>`;
}
module.exports = { mark, wordmark };
