# Hallyu — Build Verdict & Status

*Added after the first executable build. This answers: **is it buildable, is it
worth building, and what does building the real thing require?** All evidence below
is in this repo.*

---

## 1. Can it be built? — Yes, and now it exists (as a runnable app)

A fully interactive build now lives in **`app/`** — a mobile-first React + Vite PWA
that implements the MVP end to end against the real design system and fictional
content universe:

- **40 screens render**, covering auth → onboarding → feed → Explore → Drama Hubs →
  episode threads → actor pages → communities → DMs → channels → composer → search →
  notifications → profiles → settings → Terms/Privacy/Guidelines.
- **33 end-to-end interaction assertions pass** (`npm test`): signup, onboarding gates
  (≥3 genres, ≥1 drama, actors optional), feed seeding/ranking, join/leave, composing
  a tagged+spoilered post, commenting, DM send/receive, channel reactions, profile
  edits, episode-thread replies, and localStorage persistence.
- Production build compiles (`npm run build`, ~75 kB gzipped JS); dev server runs.
- Design tokens, icon set, and brand mark were ported 1:1 from `design/src/` rather
  than re-interpreted.

This de-risks the hardest unknown the pack raised: **does the product hang together as
one UX?** It does — the flows in `02_product_spec.md` all close.

### Why web/PWA first and not KMP?

The pack’s target stack is Kotlin Multiplatform + Compose Multiplatform
(`03_technical_architecture_kmp.md`). That remains a sound *production* choice, but:
the build environment has no JVM/Android SDK, KMP/iOS can’t compile in CI without
Apple tooling, and the biggest unknown was product/UX, not code sharing. A web/PWA
client made the product real today and gives you:

1. Something test users can open from a link immediately (no app-store gate) —
   critical for validating the weekly-cadence retention bet.
2. The complete **screen inventory + state contracts** the KMP build needs — the
   `app/src/data` store (use-case-shaped actions) and screen props map almost directly
   onto the planned ViewModel/StateFlow layer.
3. A working PWA install target for the dogfood/closed-beta phases of the roadmap.

The web build does **not** replace the planned KMP client; it’s its executable spec and
a parallel beta vehicle. Video capture/upload and push on web remain the weak spots
(noted in doc 03).

---

## 2. Is it worth building? — Candid verdict

**The thesis is strong and the timing is real, but the product’s value hinges on
content/community density it does not start with. Worth building as a focused,
fandom-density-first beta — not as a broad five-surface launch.**

### What genuinely de-risks it
- **Built-in retention rhythm.** The twice-weekly episode-airing cadence is a
  structural hook generic platforms can’t offer (episode threads, NEXT indicators,
  airing notifications are already built). This is the single best idea in the pack.
- **Ownable category.** No product owns “social home for K-drama fandom”; fragmentation
  across X/TikTok/Reddit/Discord is real (see `01_vision_and_case.md`).
- **Episode-thread + spoiler mechanics are differentiated and were underserved
  everywhere else** — spoiler-permissive threads vs spoiler-protected feeds is a
  thoughtful, specific wedge.
- **Channels** give creators/actors a WhatsApp-style broadcast surface that converts
  fandom follow into a retention asset.
- Content rights risk is avoided at the data layer: discussion + clips + community
  needs no licensed streaming rights (unlike building a streaming product).

### The honest risks (these, not engineering, decide the outcome)
1. **Cold-start density per drama.** A Drama Hub with 3 comments is worse than a
   Reddit thread with 400. The product only works when the *currently airing* dramas
   have live, active threads. Recommend launch scoped to **2–3 airing dramas with
   seeded/partnered discussion** rather than a complete catalog.
2. **Short-form video supply.** TikTok-style Explore needs a clip pipeline; fans
   already post this on TikTok and may cross-post rather than re-upload. Plan an import
   flow and accept that Explore may be thin in v1.
3. **Rights/IP on drama metadata, posters, actor photos.** `14_terms_of_service.md`
   flags this itself: fair-use discussion vs licensed image rights is unresolved and
   needs its own legal review **before launch** (not as ToS wording).
4. **Moderation of a global Gen-Z UGC product** is a real operating cost —
   `12_content_moderation_policy.md` assumes 1–2 humans + automated screening; the
   queue/SLA tooling doesn’t exist yet.
5. **Platform dependency**: Firebase/Supabase + FCM and video CDN economics at scale;
   fine for beta, revisit with usage data (consistent with the pack’s own position).

### Validation bar (from `02_product_spec.md`, made measurable)
Run the closed beta around a single airing cycle (~8 weeks) and require:
- WAU spike on known air days vs other days (retention hypothesis).
- ≥X% of active users post/reply in an episode thread within 24h of airing.
- Return rate to a specific drama hub week over week > generic DAO/feed DAU.
If airing-day spikes don’t appear, the structural hook isn’t strong enough and that’s
the cheapest possible moment to learn it.

---

## 3. Everything needed to build the real product (checklist)

### Decisions to make first
- [ ] **Backend contradiction**: doc `03` says **Supabase**; docs `04`, `08`, `09` say
      **Firebase/Firestore/Functions/FCM**. Pick one before writing backend code.
      (The data models map to either; the realtime/fan-out contracts are Firebase-flavored.)
- [x] ~~Missing docs 07/10/13~~ — **resolved**: `07_analytics_tracking_plan.md` and
      `13_data_retention_and_privacy_handling.md` have been drafted to match the
      schema/contract, and the stale `10_content_moderation_policy.md` reference in
      `08` now points to the actual `12_content_moderation_policy.md`. Both new docs
      are operational drafts pending counsel review, like docs 12/14/15.
- [ ] Target markets/ages (sets COPPA/GDPR-K age, eligibility, consent).
- [ ] Legal: entity/jurisdiction, support inbox, DPA with hosting/moderation vendors.

### Backend / infra (per `08`/`09`, not yet implemented)
- [ ] Auth (email + Apple/Google), handle reservation (`handles/{handle}` txn)
- [ ] Firestore collections + composite indexes (`taggedCommunityId`, `taggedDramaId` × createdAt)
- [ ] Security Rules + emulator test suite (test strategy calls this non-negotiable)
- [ ] Cloud Functions: follow count fan-out, post fan-out, community memberCount,
      scheduled new-episode notifications, channel broadcast fan-out, moderation pre-screen
- [ ] Media: image/short-video pipeline, 60s cap, CDN (Supabase Storage → Mux/Cloudflare Stream)
- [ ] Push (FCM) with per-category settings (the UI toggle exists in the app)
- [ ] Moderation: Perspective/Vision hooks, `reports/` queue, internal review view,
      enforcement + appeal workflow
- [ ] Analytics events (recreate missing doc 07) instrumented at launch
- [ ] Content ingestion/CMS for `dramas`/`actors` (client cannot write these)

### Client productionization
- [ ] Decide client strategy: PWA to beta, then KMP (Android+iOS) per doc 03; port
      tokens/theme (already final), icons, content models, and use cases from `app/src`
- [ ] Real video capture/trim/playback (highest risk; Wasm fallback documented)
- [ ] Reactive client for realtime listeners replacing simulated replies
- [ ] Offline cache (SQLDelight in KMP; IndexedDB/workbox on web)
- [ ] Accessibility pass, localization (Korean first after English)

### Ops/legal gate before public launch
- [ ] Content rights review (poster/actor/metadata usage)
- [ ] Finalize `12` moderation policy, `14` ToS, `15` Privacy with counsel; add docs 10/13
- [ ] CSAM reporting process + authority escalation (non-negotiable baseline in doc 12)

---

## 4. Where the build stands vs the 13-week roadmap (doc 06)

| Roadmap phase | Spec | Interactive UI (this build) | Backend |
|---|---|---|---|
| Phase 0 — scaffold/design/auth | ✅ docs | ✅ welcome/auth + design system live | ☐ |
| Phase 1 — onboarding, feed, hubs, communities, composer | ✅ | ✅ all flows working with persistence | ☐ |
| Phase 2 — Explore, messages+channels, search, notifications | ✅ | ✅ working with stubs (video playback, realtime) | ☐ |
| Phase 3 — ranking, watch-parties, creator tools | ☐ post-MVP | ☐ | ☐ |

What remains to reach a *usable beta* is largely **backend wiring + one thin
video-upload path + content seeding** — not design or product discovery; those are
now validated assets in this repo (`design/out` + `app/`).
