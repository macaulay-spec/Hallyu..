const U = require('../ui');
const B = require('../brand');
const { C } = U;

function render(){
  let s = '';
  s += U.icon('back', 16, 60, 24, C.text1, 1.8);
  s += B.mark(24, 130, 26);
  s += U.txt(24, 208, 'Welcome back', 'headline', C.text1);
  s += U.txt(24, 236, 'Log in to continue the conversation.', 'body', C.text2);

  let f = U.field(24, 284, 342, 'EMAIL', {placeholder:'you@example.com'});
  s += f.svg;
  f = U.field(24, f.bottom + 24, 342, 'PASSWORD', {value:'correcthorsebatt', secure:true});
  s += f.svg;

  s += U.txt(366, f.bottom + 30, 'Forgot password?', 'caption', C.text2, {align:'right', weight:500});
  s += U.button(24, f.bottom + 52, 342, 'Log in', {kind:'primary'});

  // divider
  const dy = f.bottom + 140;
  s += U.hair(24, dy, 130, C.hairSoft); s += U.hair(236, dy, 130, C.hairSoft);
  s += U.txt(195, dy+4, 'OR', 'overline', C.text3, {align:'center'});

  s += U.button(24, dy+24, 342, 'Continue with Apple', {kind:'secondary', iconName:'apple'});
  s += U.button(24, dy+84, 342, 'Continue with Google', {kind:'secondary', iconName:'google'});
  s += U.txt(195, dy+160, 'No account?  Create one', 'caption', C.text2, {align:'center'});
  return U.screen(s);
}
module.exports = { render };
