# Hallyu — Planning & Build Pack

This is a full restart of the Hallyu project. Nothing from any prior plan is carried over.

**Hallyu** is a mobile-first social platform for K-drama fans — the social home
the fandom doesn't currently have, combining discovery, feed, short-form video,
drama-specific communities, and channel-style messaging.

## What's in this pack

| File | Purpose |
|---|---|
| `01_vision_and_case.md` | Why this is worth building — problem, timing, benefits, competitive landscape |
| `02_product_spec.md` | Personas, MVP feature set, information architecture, core user flows |
| `03_technical_architecture_kmp.md` | KMP/Compose Multiplatform architecture, tech stack, module/file skeleton |
| `04_ai_studio_build_prompt.md` | Ready-to-paste master prompt for Google AI Studio (Gemini) to scaffold the codebase |
| `05_stitch_uiux_prompt.md` | Ready-to-paste prompt(s) for Stitch to generate the UI/UX design system and screens |

## Recommended order of operations

1. Read `01` and `02` — lock the concept and MVP scope.
2. Paste the prompts in `05_stitch_uiux_prompt.md` into **Stitch** first. Design
   comes before code — you want the visual language (colors, type, components)
   decided before generating screens in code, so the AI Studio build can
   reference real design tokens instead of guessing.
3. Take the resulting design system (colors, spacing, type scale, component
   look) and drop it into the placeholders in `04_ai_studio_build_prompt.md`.
4. Paste that into **Google AI Studio** (Gemini) to scaffold the actual KMP
   project — Gradle setup, module structure, shared business logic, and
   Compose Multiplatform UI wired to the design system.
5. Iterate screen-by-screen from there using `02` and `03` as the spec AI
   Studio should keep referring back to.
