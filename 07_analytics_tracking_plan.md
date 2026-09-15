# Hallyu — Analytics Tracking Plan

This document was missing from the pack (referenced by `06_prd_and_roadmap.md`
and `11_test_strategy.md`). It is drafted to match the Firestore schema in
`09_database_schema.md` and the MVP success signals in `02_product_spec.md`.
*Operational draft, not a legal document — align event collection with
`15_privacy_policy.md` and `13_data_retention_and_privacy_handling.md`.*

## Principles

- **Instrument from Phase 1.** Retrofitting event tracking onto shipped
  features is expensive and loses the baseline; every event below ships with
  the feature that emits it.
- **One event per action, one schema per event.** No free-form event names;
  every event carries the common envelope and the documented props.
- **No message/channel content in analytics.** Never put DM text, broadcast
  text, or message bodies into event properties (privacy by design — see
  doc 15 §2/§3). IDs and category flags only.
- **PII minimization.** Events carry an anonymous analytics client ID plus
  the authenticated uid (hashed at the analytics sink); no email/handle in
  event props.
- Backend assumed Firebase → **Firebase Analytics + BigQuery export**; the
  same events port 1:1 to any provider.

## Common event envelope

Every event includes:

| Prop | Type | Notes |
|---|---|---|
| `app_version` | string | Semver of the client |
| `platform` | enum | `android` / `ios` / `web` |
| `user_id` | string \| null | Hashed uid; null pre-auth |
| `anon_id` | string | Per-install anonymous ID, always present |
| `onboarded` | boolean | Whether onboarding completed |
| `session_id` | string | Reset after 30 min background |
| `timestamp` | number | Client ms, reconciled server-side |
| `network` | enum | `wifi` / `cellular` / `offline` |

## Event catalog

### Lifecycle / acquisition
| Event | Trigger | Key props |
|---|---|---|
| `app_opened` | Cold/foreground open | `cold_start`, `source` (deep link/organic) |
| `signup_started` | Create-account tapped | `method_visible` |
| `signup_completed` | Account created | `method` (email/apple/google) |
| `login_completed` | Logged in | `method` |
| `onboarding_step_viewed` | Each onboarding step | `step` (genres/dramas/actors/notif), `step_index` |
| `onboarding_selection` | Selection toggled | `step`, `item_id`, `item_type`, `selected`, `count_after` |
| `onboarding_completed` | Finish tapped | `genres_count`, `dramas_count`, `actors_count`, `elapsed_s` |
| `onboarding_abandoned` | App backgrounded/closed mid-flow | `step_index`, `elapsed_s` |
| `notification_permission_result` | System prompt answered | `granted` |

### Home feed
| Event | Trigger | Key props |
|---|---|---|
| `feed_viewed` | Home exposed (screen impression) | `post_count`, `has_follows` |
| `feed_refreshed` | Pull-to-refresh | `elapsed_s`, `post_count_after` |
| `feed_scrolled_to_bottom` | Infinite-scroll boundary | `page` (20 items/page per PRD #3) |
| `feed_ranked` | Rank pass completed | `followed_hits`, `discovery_hits`, `trending_hits` |
| `post_card_impression` | Card ≥50% visible ≥0.5s | `post_id`, `author_id`, `position`, `tagged_drama_id`, `tagged_community_id`, `spoiler` |

### Posts / engagement
| Event | Trigger | Key props |
|---|---|---|
| `post_created` | Composer post succeeds | `post_id`, `type` (text/image/video), `has_drama_tag`, `has_actor_tag`, `has_community_tag`, `spoiler`, `caption_length`, `media_duration_s`, `time_to_compose_s` |
| `post_create_failed` | Create rejected/failed | `reason` (validation/network/moderation_pending) |
| `post_liked` / `post_unliked` | Heart toggle | `post_id`, `source` (feed/post/thread/community/profile), `double_tap` |
| `post_saved` / `post_unsaved` | Bookmark toggle | `post_id`, `source` |
| `post_shared` | Share action | `post_id`, `channel` (system sheet result if available) |
| `post_detail_viewed` | Post opened | `post_id`, `source` |
| `spoiler_revealed` | Spoiler cover tapped | `post_id` |
| `comment_created` | Comment posted | `post_id`, `length`, `source` (post/episode_thread) |
| `report_submitted` | Any report flow | `target_type` (post/comment/video/profile/broadcast), `reason` enum, `target_id` |

### Explore (short-form video)
| Event | Trigger | Key props |
|---|---|---|
| `explore_viewed` | Explore tab exposed | `tab` (for_you/following) |
| `clip_viewed` | Clip centered/autoplay | `clip_id`, `author_id`, `drama_id`, `position`, `play_duration_s`, `watched_percent` |
| `clip_liked` / `clip_saved` / `clip_shared` | Rail actions | `clip_id` |
| `clip_comments_opened` / `clip_comments_closed` | Comments sheet | `clip_id` |
| `clip_mute_toggled` | Mute button | `muted` |
| `clip_upload_started` / `clip_upload_completed` / `failed` | Creator upload | `duration_s`, `size_bytes`, `drama_tag`, `failure_reason` |

> Media KPI: `watched_percent` ≥80% = effective view; feed this into clip ranking.

### Drama graph (the retention hypothesis)
| Event | Trigger | Key props |
|---|---|---|
| `drama_viewed` | Drama Hub opened | `drama_id`, `source`, `tab` (overview/cast/episodes) |
| `drama_followed` / `unfollowed` | Follow toggle | `drama_id`, `airing`, `source` |
| `episode_thread_viewed` | Episode thread opened | `drama_id`, `episode_number` |
| `episode_thread_commented` | Reply in an episode thread | `drama_id`, `episode_number` |
| `episode_alert_received` | New-episode push delivered/opened | `drama_id`, `episode_number`, `opened`, `minutes_after_air` |
| `cast_actor_viewed` | Cast → actor | `drama_id`, `actor_id` |
| `actor_followed` / `unfollowed` | Follow | `actor_id`, `source` |

### Communities
| Event | Trigger | Key props |
|---|---|---|
| `communities_viewed` | Tab exposed | `joined_count` |
| `community_viewed` | Detail opened | `community_id`, `type` (drama/topic), `joined` |
| `community_joined` / `left` | Join toggle | `community_id`, `type`, `source` (list/hub/search/detail) |
| `community_created` | Topic community created | `community_id`, `name_length` |

### Messaging & channels
| Event | Trigger | Key props |
|---|---|---|
| `dm_list_viewed` | Messages tab | `conversation_count`, `unread_count` |
| `dm_thread_viewed` | Conversation opened | `conversation_id`, `participant_count` (no content) |
| `dm_sent` | Message sent | `conversation_id`, `has_media`, `recipient_count` |
| `channels_viewed` | Channels list | `subscribed_count` |
| `channel_viewed` | Channel detail | `channel_id`, `subscribed` |
| `channel_subscribed` / `unsubscribed` | Subscribe toggle | `channel_id`, `source` |
| `broadcast_reacted` | Reaction pill tapped | `channel_id`, `broadcast_id`, `reaction_index` |
| `broadcast_reply_initiated` | Reply → owner DM | `channel_id` |

### Search & discovery
| Event | Trigger | Key props |
|---|---|---|
| `search_opened` | Search exposed | `source` |
| `search_performed` | After 300 ms debounce, ≥2 chars | `query_length`, `tab` (never log raw query to 3rd parties; hash it) |
| `search_result_tapped` | Result opened | `result_type` (drama/actor/user/community/post), `result_id`, `position`, `tab` |
| `search_tab_switched` | Result tab changed | `tab` |

### Notifications
| Event | Trigger | Key props |
|---|---|---|
| `notification_received` | In-app/Firebase push | `type` (new_episode/reply/mention/channel_broadcast), `foreground` |
| `notification_opened` | Tapped | `type`, `target_kind`, `minutes_delay` |
| `notification_pref_changed` | Settings toggle | `category`, `enabled` |

### Profile / settings / moderation
| Event | Trigger | Key props |
|---|---|---|
| `profile_viewed` | Any profile opened | `user_id`, `is_self`, `following_state` |
| `profile_edited` | Save in edit profile | `changed_fields[]` |
| `settings_changed` | Toggle/action | `setting`, `value` |
| `data_export_requested` / `account_delete_requested` | Privacy actions | — |
| `logout` | Log out | — |
| `moderation_flag_applied` | Automated screening outcome | `content_type`, `outcome` (visible/pending/removed), `reason_code` (no content) |

## Funnels to watch (built from the above)

1. **Activation**: `signup_completed` → `onboarding_completed` (drop-off per step).
2. **First value**: `onboarding_completed` → first `post_card_impression` →
   first `drama_followed` or `community_joined` within session 1.
3. **Air-day loop** (core hypothesis): `episode_alert_received(opened)` →
   `episode_thread_viewed` → `episode_thread_commented` / `post_created`;
   compare weekday/air-day vs non-air-day DAU.
4. **Creation**: `composer` open → `post_created` (and failure reasons).
5. **Retention cohorts**: D1/D7/D28 segmented by onboarding selection count
   and number of drama follows.

## North-star + guardrail metrics

- **North star:** *weekly active discussers* — users who view or post in an
  episode/community thread during an airing week.
- Leading indicators: dramas followed per user, air-day DAU ratio, episode
  thread open rate within 24h of airing, notification open rate by category.
- Guardrails: report rate per 1k posts, moderation pending-queue age vs the
  24h SLA (doc 12), crash-free sessions ≥99.5%, clip upload failure rate.

## Implementation notes

- Events emit through a thin shared `Analytics` interface in commonMain/the
  web data layer so KMP and web share one event vocabulary; QA build logs
  events to the console (the web demo already exposes the same actions).
- BigQuery-exported events power the ranking feedback loop and the
  Phase-3 recommendation work (replacing rule-based ranking in PRD #3).
