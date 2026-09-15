# Hallyu — interactive app build (web / PWA)

A **runnable, interactive** implementation of the Hallyu product pack — mobile-first,
pixel-matched to the design system in `../design`, built as a React + Vite PWA.

The sandbox this was built in has Node but no JVM/Android SDK, so the planned Kotlin
Multiplatform client could not be compiled here. This web build is the same product,
fully clickable, and doubles as the executable spec / reference client for the later
KMP port (see `../16_build_status_and_verdict.md`).

## Run

```bash
cd app
npm install
npm run dev        # http://localhost:5173
```

```bash
npm test           # 40-screen render smoke + full signup→onboarding→post→DM flow
npm run build      # production build to dist/
```

On a phone-sized viewport it runs full-screen; on desktop it renders in a 390×844
device frame. Installable as a PWA (manifest + icons wired).

## What works (interactive, with persistent state)

All MVP features from `02_product_spec.md` are implemented as screens + state:

| Area | What’s real |
|---|---|
| **Auth** | Welcome, signup (email/social + strength meter), login, forgot-password flow. Gate works |
| **Onboarding** | Genres (min 3, enforced) → dramas (searchable grid, min 1) → actors (optional/skip) → notification explainer; selections seed the feed |
| **Home feed** | Rule-based ranking per PRD #3 (followed dramas +3, joined communities +2, followed users +2), pull-to-refresh → re-rank, like/save, tag chips |
| **Explore** | Vertical snap-scroll video feed (Following / For You), mute toggle, overlay action rail, comments sheet, drama + OST attribution |
| **Drama Hub** | Hero, airing countdown card, follow/discuss, Overview (synopsis/credits/linked community), Cast (roles → actor pages), Episodes (air dates, discussion counts, NEXT) |
| **Episode threads** | Spoiler-permissive warning banner, canonical comment tree, post replies |
| **Actor profiles** | Fan counts, follow, linked dramas grid, link to official channel |
| **Communities** | Your / discover sections, instant join/leave, detail feeds, topic community creation, linked-drama cards, guidelines banner |
| **Messages** | DM inbox (unread dots, ordering), real threads with optimistic send + simulated replies, new-message contact picker |
| **Channels** | Separate data model from DMs (per spec), subscribe/unsubscribe, broadcast feed, reaction-only pills, “replies go to owner’s DMs” footer |
| **Composer** | Text with 500-char counter, drama/actor/community tag sheets, spoiler toggle (blurs media in feeds), image/video attach |
| **Search** | Debounce-ready, 5 tabs (Dramas/Actors/Users/Communities/Posts), trending + recent empty state, related communities/posts |
| **Post detail** | Full post, comments, comment composition, like/save/share |
| **Notifications** | Grouped New episodes / Replies & mentions / Channels, unread dots → auto-read, deep-link targets |
| **Profile** | Own/other profile, follow/message, posts/media/liked tabs, edit profile (160-char bio), followers list |
| **Settings** | Account, per-category notification toggles (PRD #10), privacy (export/delete), About |
| **Legal** | Community Guidelines (from doc 12), Terms & Privacy screens (from docs 14/15, with draft disclaimers intact) |

**State persistence**: follows, joins, subscriptions, likes, saves, posts, comments,
DMs, thread replies, reactions, notification prefs, and profile edits persist in
`localStorage`. Reset from Settings → Account → Delete/Log out, or clear site data.

> The content universe is the fictional bible from `../design/src/content.js`
> (invented titles/actors only — no real IP), extended with posts, episodes, threads,
> conversations, broadcasts, notifications, and clips.

## Code map

```
app/src/
├── data/
│   ├── content.js       # fictional universe (dramas, actors, users, communities, channels,
│   │                    #   broadcasts, posts, episodes, threads, DMs, notifs, clips) + lookups
│   └── store.jsx        # reducer + context, optimistic actions, localStorage persistence,
│                        #   rule-based feed ranking (the future use-case layer for KMP)
├── nav.jsx              # tab roots + push/pop stack, wired to browser/hardware back
├── components/
│   ├── icons.jsx        # 40+ icons + brand mark — paths ported 1:1 from design/src/ui.js
│   └── ui.jsx           # Button, Chip, Toggle, Sheet, SearchBar, Segmented, PostCard,
│                        #   Avatar, TabBar, headers, empty/loading states
├── screens/             # one file per feature group (see coverage table above)
├── styles.css           # design tokens translated from design/src/tokens.js
└── App.jsx              # auth/onboarding gate + screen registry
scripts/
├── smoke-entry.jsx      # server-renders all 40 screens (no-crash guarantee)
└── flow-entry.jsx       # jsdom end-to-end: signup → onboarding → every tab → post/comment/DM/react
```

## Deliberate demo stubs (backend seams)

Data access is centralized in `store.jsx` so these are drop-in replacements, not rewrites:

- **Auth** is local-only; swap for Firebase Auth (docs 08/09 say Firebase; doc 03 says
  Supabase — that contradiction should be settled before backend work).
- **Explore “video”** uses poster keyframes (Ken Burns), not real playback — video
  upload/playback (the highest-risk feature, incl. Wasm for web) is untouched.
- **Realtime** is simulated (fake DM reply); realtime chat/channels map to Firestore
  listeners or Supabase Realtime.
- **Moderation, Cloud Functions, push notifications, denormalized count fan-out,
  handle reservation, Security Rules** are not implemented — contracts already exist
  in `08_api_contract.md` / `09_database_schema.md`.
```
