# Master Prompt — Paste into Google AI Studio (Gemini)

The design tokens below are now the real, final values pulled from the
Hallyu design system (not placeholders) — this is ready to paste as-is.

---

```
You are acting as a senior Kotlin Multiplatform engineer. Build the initial
codebase scaffold for a social app called "Hallyu" — a mobile-first social
platform for K-drama fans, combining a personalized feed, short-form video
discovery, drama-specific communities, one-way broadcast channels, and DMs.

TARGETS: Android, iOS, and Web (Wasm), all sharing one Kotlin Multiplatform
codebase using Compose Multiplatform for UI.

ARCHITECTURE (follow strictly):
- Clean layered architecture: presentation (Compose UI + StateFlow-based
  view models) → domain (use cases, pure Kotlin) → data (repositories with
  remote + local data sources).
- Dependency injection via Koin.
- Networking via Ktor Client.
- Serialization via kotlinx.serialization.
- Local caching via SQLDelight (offline cache layered in front of Firestore).
- Async via Kotlin Coroutines/Flow throughout.
- Image loading via Coil 3.
- Backend: Firebase (Firestore, Auth, Cloud Storage, Cloud Functions, FCM for
  push) via the multiplatform `firebase-kotlin-sdk` (GitLive) wrapper so
  Firebase is accessed through one shared API in commonMain.

MODULE STRUCTURE (create this Gradle module layout):
Hallyu/
├── shared/ (domain/, data/, di/)
├── composeApp/ (ui/feed, ui/explore, ui/dramahub, ui/communities,
  ui/messages, ui/profile, ui/onboarding, navigation/, theme/,
  androidMain/, iosMain/, wasmJsMain/)
├── androidApp/
├── iosApp/
├── webApp/
└── build-logic/

CORE DATA MODELS (define as Kotlin data classes in shared/domain/model):
User, Drama, Actor, Post, Community, Channel, Message/ChannelPost, Notification
— fields as follows: [paste the "Data model sketch" section from
03_technical_architecture_kmp.md here]

MVP FEATURES TO SCAFFOLD (screens + view models + use cases, UI can be
placeholder-populated with mock data for now, wired to real repository
interfaces so backend can be plugged in later):
1. Auth & profile
2. Onboarding (pick genres/dramas/actors)
3. Home feed (mixed algorithmic + follow-based)
4. Explore (vertical short-form video feed)
5. Drama Hub (synopsis, cast, episode discussion threads)
6. Communities (list, join, post)
7. Messages (DMs) + Channels (one-way broadcast, distinct data model from DMs)
8. Post composer (text/image/video, taggable to drama/actor/community)
9. Search (dramas, actors, users, communities, posts)
10. Notifications
11. Follow system (users, dramas, actors, creators, communities)

NAVIGATION: Bottom navigation with Home, Explore, Communities, Messages,
Profile. Use Voyager (or Compose Multiplatform Navigation) for screen
navigation, shared across all three platforms.

DESIGN SYSTEM — apply these exact tokens across every screen via a shared
`theme/` package (Color.kt, Type.kt, Shape.kt). These are the real, final
tokens (not placeholders) — translate them directly into Kotlin/Compose
types, don't reinterpret or restyle them:

Colors (dark theme, OLED-first):
- bg: #000000
- surface1 (card): #0C0C0E
- surface2 (raised): #141417
- surface3 (pressed/overlay): #1D1D22
- hairline: rgba(245,245,247,0.10) / hairlineSoft: rgba(245,245,247,0.06)
- text1 (primary): #F5F5F7
- text2 (secondary): #A4A4AC
- text3 (tertiary/disabled): #6C6C75
- accent (muted crimson — use ONLY for live/airing indicator, likes, and
  destructive actions; never decorative): #C6483F
- accentSoft: rgba(198,72,63,0.16)
- success: #4E9B72
- warning: #B98A3F
- scrim: rgba(0,0,0,0.55)

Typography scale (size/line-height/weight/letter-spacing, in sp):
- display: 32/38, weight 700, ls -0.6
- headline: 26/32, weight 700, ls -0.4
- title: 20/26, weight 600, ls -0.2
- title2: 17/24, weight 600, ls -0.2
- body: 15/22, weight 400, ls 0
- bodyEmphasis: 15/22, weight 600, ls 0
- caption: 13/18, weight 400, ls 0.1
- overline: 11/14, weight 600, ls 1.4

Spacing scale (dp, 4/8pt-based): 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

Corner radius scale (dp): sm 8, md 12, lg 16, xl 20, sheet 28, pill 999

Elevation: flat surfaces + hairline borders, NOT drop shadows — elevation
is expressed via the surface1/2/3 lightness steps above. Shadows are
reserved for modals/sheets only: 0 8 24 rgba(0,0,0,0.5).

Overall direction: OLED black, editorial restraint, monochrome-dominant.
The crimson accent is rare and functional (live/airing, likes, destructive)
— never used decoratively. Avoid anything flashy, neon-heavy, or childish.

MOCK/SEED DATA: generate mock data (dramas, actors, users, posts) as a
small fictional content set — invented titles/names only, no real K-drama
titles or real actor names, to avoid IP issues. Keep it internally
consistent (e.g. the same handful of dramas and actors recur across feed
posts, drama hubs, and cast pages) rather than randomly generated per
screen.

DELIVERABLE: Generate the full Gradle project structure, build files
(build.gradle.kts at root and per-module, settings.gradle.kts, version
catalog libs.versions.toml), the shared domain/data/di scaffolding with
interfaces and mock implementations, and Compose Multiplatform screen
composables for each MVP feature wired to view models exposing StateFlow.
Leave clear TODOs where the real Firebase backend integration (Firestore
collections, Auth, Cloud Functions triggers) should be plugged in. Prioritize
a codebase that compiles and runs on all three targets with mock data over
completeness of every feature.
```
