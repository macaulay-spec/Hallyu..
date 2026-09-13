# UI/UX Prompt — Paste into Stitch

Use this to generate the design system first, then the individual screens.
Feed the resulting design tokens back into `04_ai_studio_build_prompt.md`.

---

## Prompt 1 — Design system

```
Design a design system for "Hallyu," a mobile-first social app for K-drama
fans (feed, short-form video, communities, messaging). The aesthetic should
be sleek, modern, and premium — think a high-end streaming or media app —
NOT flashy, neon, or childish. Favor confident restraint over decoration.

Produce:
- A primary color palette: one deep, sophisticated primary color (avoid
  generic bright red/pink K-pop clichés — consider deep plum, ink navy, or
  warm charcoal as a base), one accent color used sparingly for CTAs/likes,
  and a full neutral/grayscale scale for backgrounds, cards, and text.
- Both light and dark theme variants.
- A typography scale: one clean, modern sans-serif for UI text, with clear
  hierarchy (display, headline, title, body, caption/label sizes).
- A spacing scale (4/8pt-based) and corner-radius scale for cards, buttons,
  and input fields — should feel soft but not rounded to the point of
  looking playful/childish.
- Core component styles: buttons (primary/secondary/ghost), cards (post
  card, drama hub card, community card), input fields, bottom navigation
  bar, avatar treatment, and video thumbnail/play-button treatment.

Output the tokens in a structured, reusable format (color hex values,
type scale in sp/pt, spacing values, radius values).
```

## Prompt 2 — Screens (run per screen, referencing the design system above)

```
Using the Hallyu design system above, design the following screen: [SCREEN
NAME]. Maintain strict visual consistency with the established color
palette, typography, spacing, and component styles. Keep the layout clean
and content-forward — the fandom content itself should be the visual star,
not the chrome around it.
```

Run Prompt 2 once per screen, substituting `[SCREEN NAME]` with each of:

1. Onboarding — genre/drama/actor selection
2. Home Feed
3. Explore (vertical short-form video feed)
4. Drama Hub (synopsis, cast, episode discussion tab)
5. Communities list + a single Community detail
6. Messages (DM list) + Channel detail (broadcast view)
7. Post composer (text/image/video)
8. Search results (dramas/actors/users/communities tabs)
9. Profile (own profile view)
10. Notifications

## Notes for using the Stitch output

- Export/record the exact hex codes, type sizes, and spacing values Stitch
  settles on — these go directly into `theme/Color.kt`, `theme/Type.kt`, and
  `theme/Shape.kt` in the KMP project.
- If Stitch offers a Figma or code export, keep it as the source of truth for
  visual QA once AI Studio generates the actual Compose screens — the
  Compose output should be checked against these mockups, not the other way
  around.
