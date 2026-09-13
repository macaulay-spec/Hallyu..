// Hallyu design tokens — single source of truth.
// Drives BOTH the SVG screen renderer and the emitted Compose theme (Color.kt/Type.kt/Shape.kt).
// Aesthetic: OLED black, editorial restraint, monochrome-dominant. One muted crimson accent,
// used ONLY for live/airing, like, and destructive. Never decorative.

const C = {
  bg:        '#000000',
  surface1:  '#0C0C0E', // card
  surface2:  '#141417', // raised
  surface3:  '#1D1D22', // pressed / overlay
  hairline:  'rgba(245,245,247,0.10)',
  hairSoft:  'rgba(245,245,247,0.06)',
  text1:     '#F5F5F7',
  text2:     '#A4A4AC',
  text3:     '#6C6C75',
  accent:    '#C6483F', // muted crimson — live / like / destructive ONLY
  accentSoft:'rgba(198,72,63,0.16)',
  success:   '#4E9B72',
  warning:   '#B98A3F',
  scrim:     'rgba(0,0,0,0.55)',
};

const T = {
  display:  { size: 32, lh: 38, w: 700, ls: -0.6 },
  headline: { size: 26, lh: 32, w: 700, ls: -0.4 },
  title:    { size: 20, lh: 26, w: 600, ls: -0.2 },
  title2:   { size: 17, lh: 24, w: 600, ls: -0.2 },
  body:     { size: 15, lh: 22, w: 400, ls: 0 },
  bodyEm:   { size: 15, lh: 22, w: 600, ls: 0 },
  caption:  { size: 13, lh: 18, w: 400, ls: 0.1 },
  overline: { size: 11, lh: 14, w: 600, ls: 1.4 },
};

const S = { s1:4, s2:8, s3:12, s4:16, s5:20, s6:24, s7:32, s8:40, s9:48, s10:64 };
const R = { sm:8, md:12, lg:16, xl:20, sheet:28, pill:999 };

module.exports = { C, T, S, R };
