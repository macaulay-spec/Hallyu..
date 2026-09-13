const U = require('../ui');
const B = require('../brand');
const { C } = U;

function render(){
  let s = '';
  s += B.mark(390/2-36, 340, 72);
  s += B.wordmark(390/2, 470, 34, C.text1, 'center');
  s += U.txt(390/2, 502, 'THE SOCIAL HOME FOR K-DRAMA FANS', 'overline', C.text3, {align:'center'});
  // brief load state
  s += U.rect(155, 700, 80, 2, C.surface3, 1);
  s += U.rect(155, 700, 34, 2, C.text2, 1);
  return U.screen(s);
}
module.exports = { render };
