# Hallyu — Data Retention & Privacy Handling

This document was missing from the pack (referenced by
`12_content_moderation_policy.md`, `14_terms_of_service.md`, and
`15_privacy_policy.md`). It is the internal data-handling standard those
public-facing documents point at. *Operational/engineering draft — finalize
with counsel per jurisdiction (GDPR/UK GDPR, CCPA/CPRA, COPPA, GDPR-K, LGPD,
etc.) before launch.*

## 1. Data inventory

Mirrors the collections in `09_database_schema.md`. Owner column names the
system responsible for deletion.

| Data store | Contents | Sensitivity | Source |
|---|---|---|---|
| `users/{uid}` | Handle, display name, avatar ref, bio, followed drama/actor IDs, genres, counts, createdAt | Account/PII | User |
| Auth provider | Email, auth provider UID, credential hash, verification state | High (auth) | User / IdP |
| `posts`, `comments`, `broadcasts` | UGC text + media refs, tags, moderation status | UGC | User |
| Storage buckets | Images, short videos, avatars | UGC media | User |
| `conversations`, `messages` | DM 1:1/group contents + participants | Private comms | User |
| `channels/*`, `subscriptions` | Broadcasts, subscriber membership | Low/Public | Creator/user |
| `follows`, `members`, `likes` etc. | Social graph edges | Low | User/derived |
| `notifications` | Per-user notification items | Low | System |
| `reports` | Reporter, target ref, reason, status, reviewer notes | Moderation | User/mod |
| Moderation queue artifacts | Screening verdicts, hashes, evidence snapshots | Safety | System/mod |
| Blocked/muted lists | Safety graph | Low | User |
| Analytics events | Event catalog from `07_analytics_tracking_plan.md` | Pseudonymous | System |
| Device/push tokens | FCM token, platform, app version | Technical | System |
| Backups/snapshots | Point-in-time copies of the above | Inherited | System |
| Logs | Auth/security/audit logs | Mixed | System |

**Never collected in MVP:** payment data (no monetization), exact location,
contacts, message/UGC content inside analytics events, or browsing activity
outside Hallyu.

## 2. Retention schedule

| Data | Active retention | After deletion / offboarding |
|---|---|---|
| Account record (`users`) + auth | While account active | **30-day soft-delete**, then hard delete within next deletion run |
| Handle reservation (`handles/{handle}`) | Life of account | Held **30 days** then released; reused handles get no profile linkage |
| Posts & comments | Until author deletes or moderation removes | Author delete → immediate removal from all client views; **media purged within 30 days**; database tombstones removed within 30 days |
| Moderation-removed content | Not visible immediately | **Retained 180 days** in a restricted, non-user-facing store for appeals/audit/safety, then purged (doc 12 enforcement layer) |
| `reports` + evidence | Life of case + **365 days** after final resolution | Needed for repeat-offender patterns, appeals, legal requests; then anonymize/delete |
| DM messages | Until either participant deletes for themselves / account deleted | On account deletion: messages disassociated from identity immediately; content purged within **30 days** except where retained in an active report/legal hold |
| Channel broadcasts | Life of channel | Same as posts; subscriber-only access enforced by Rules |
| Avatar / media files | While referenced | Orphaned media (no referencing doc) purged by scheduled job every **7 days**; explicit deletes within 30 days |
| Notifications | 90 days after read | Unread kept 180 days, then purged |
| Analytics events | Raw events **13 months** rolling (uid-keyed) | Aggregated/trend data may be retained anonymized indefinitely |
| Push tokens | While valid/app installed | Deleted on logout, uninstall detection (channel expiry), or account deletion |
| Search/trending aggregates | 30-day rolling windows | Recomputed, not personal history |
| Auth/security audit logs | 180 days default | Extend under documented legal hold |
| Backups | Daily, retained **30 days** | Backups expire on schedule; deletions propagate within the retention window |

Clocks are measured from the triggering event; a weekly scheduled Cloud
Function performs hard-delete and orphan-media sweeps; a daily job ages out
notifications/analytics.

## 3. Deletion & export (user rights)

- **Delete account** (Settings → Privacy/Account): immediately marks the
  account disabled, revokes sessions/tokens, and removes profile from public
  surfaces. A 30-day grace period allows reactivation; after it, the full
  deletion schedule in §2 runs. The client surfaces the 30-day window.
- **Delete a post/comment/broadcast**: removes visibility immediately;
  counters reconcile via Cloud Function; media purged on schedule.
- **Data export (GDPR/CCPA access/portability)**: downloadable archive
  containing profile, follows, posts, comments, messages the user sent,
  reactions, notifications, settings — JSON plus a media folder. Target:
  generate within 30 days (aim for 72h) and deliver via authenticated,
  expiring link.
- **Correction**: profile fields self-service; other corrections via support.
- **Right to object / restrict processing**: honored via in-app settings
  (notifications, personalization toggle, account privacy); analytics
  suppression for opted-out users.
- Requests are tracked internally with status and completion timestamps.

## 4. Access control & security

- All client access governed by **Firestore Security Rules** (see
  `08_api_contract.md`); no open collections; Rules test suite is a release
  gate per `11_test_strategy.md`.
- Denormalized counters are Cloud-Function/Admin-SDK writes only; clients
  cannot write counts, moderation state, or other users' records.
- Internal access is **least privilege and named**:
  - Production database access requires individual (not shared) credentials,
    MFA, and is logged.
  - Moderators get a scoped review role limited to the moderation queues and
    reports; they never access DM contents except through an approved report
    workflow with audit logging.
  - No standing broad production read access; break-glass use is logged and
    reviewed.
- Channel broadcast read access requires a subscription doc checked in
  Rules; DM/conversation access requires participant status.
- Storage buckets are private; media is served via short-lived signed URLs.
- Transport: TLS everywhere; at-rest encryption via platform defaults, with
  customer-managed keys if/when scale/compliance requires.

## 5. Moderation & safety handling

- New posts/comments/broadcasts are created `pending` per
  `08_api_contract.md`'s `moderateContentOnCreate`, then flipped to
  `visible` (auto-pass) or held `pending` for human review per doc 12.
- Removed content is **soft-deleted, not hard-deleted**, with the original
  ref, verdict, reviewer, and reason retained for the §2 safety window; users
  see a stated reason and an appeal entry point.
- Reports reference (never duplicate into public views) target content;
  reporters are not visible to reported users.
- CSAM / credible violence / doxxing baseline: handled per doc 12 — immediate
  action, evidence preserved under the safety retention window, and authority
  reporting following a counsel-approved runbook.

## 6. Children & age

- Minimum age per jurisdiction (13/16 TBD in docs 14/15) enforced at signup;
  underage accounts discovered are disabled and personal data deleted within
  the safety window, retaining only the minimum record needed to prevent
  re-registration where lawful.

## 7. Vendors & data location

- Hosting/auth/storage: Firebase/Google Cloud (or Supabase — **resolve the
  backend contradiction between doc 03 and docs 04/08/09 first**);
  moderation APIs are sub-processors.
- Maintain a Data Processing Agreement with each processor; publish the
  sub-processor list in the privacy policy.
- Document processing regions and any international transfer mechanism;
  regional data residency reviewed before launch in regulated markets.

## 8. Incident & request response

- Data-subject request log: intake date, type, scope, completion date.
- Breach runbook: containment → assess scope/data categories → regulator and
  user notifications on the statutory clock (e.g. 72h GDPR) → remediation.
- Moderation legal-hold flag overrides normal deletion and is itself
  time-boxed and logged.
