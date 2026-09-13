# Hallyu — Database Schema (Firestore)

Firestore is a document database, so this is a collection/document schema
rather than a relational ERD — relationships are expressed via ID references,
not foreign keys.

## `users/{uid}`
```
{
  handle: string (unique, indexed),
  displayName: string,
  avatarUrl: string,
  bio: string (max 160 chars),
  followedDramaIds: string[],
  followedActorIds: string[],
  followedGenres: string[],
  followerCount: number,       // Cloud-Function-only write
  followingCount: number,      // Cloud-Function-only write
  createdAt: timestamp
}
```

## `dramas/{dramaId}`
```
{
  title: string,
  synopsis: string,
  posterUrl: string,
  castActorIds: string[],
  episodeCount: number,
  airSchedule: { dayOfWeek: string[], startDate: timestamp },
  genres: string[],
  linkedCommunityId: string   // auto-created 1:1 with drama
}
```

## `dramas/{dramaId}/episodes/{episodeNumber}`
```
{
  airDate: timestamp,
  discussionThreadPostCount: number
}
```

## `actors/{actorId}`
```
{
  name: string,
  photoUrl: string,
  dramaIds: string[]
}
```

## `posts/{postId}`
```
{
  authorId: string (ref users),
  type: "text" | "image" | "video",
  mediaUrl: string | null,
  caption: string (max 500 chars),
  taggedDramaId: string | null,
  taggedActorId: string | null,
  taggedCommunityId: string | null,
  likeCount: number,      // Cloud-Function-only write
  commentCount: number,   // Cloud-Function-only write
  moderationStatus: "pending" | "visible" | "removed",
  createdAt: timestamp
}
```

## `posts/{postId}/comments/{commentId}`
```
{
  authorId: string,
  text: string (max 300 chars),
  createdAt: timestamp
}
```

## `communities/{communityId}`
```
{
  name: string,
  type: "drama" | "topic",
  linkedDramaId: string | null,
  description: string,
  memberCount: number,   // Cloud-Function-only write
  createdAt: timestamp
}
```

## `communities/{communityId}/members/{uid}`
```
{
  joinedAt: timestamp
}
```

## `channels/{channelId}`
```
{
  ownerId: string,
  name: string,
  avatarUrl: string,
  subscriberCount: number   // Cloud-Function-only write
}
```

## `channels/{channelId}/subscriptions/{uid}`
```
{
  subscribedAt: timestamp
}
```

## `channels/{channelId}/broadcasts/{broadcastId}`
```
{
  type: "text" | "image" | "video",
  mediaUrl: string | null,
  caption: string,
  createdAt: timestamp
}
```

## `conversations/{conversationId}`
```
{
  type: "dm" | "group",
  participantIds: string[],
  lastMessagePreview: string,
  updatedAt: timestamp
}
```

## `conversations/{conversationId}/messages/{messageId}`
```
{
  senderId: string,
  text: string | null,
  mediaUrl: string | null,
  createdAt: timestamp
}
```

## `notifications/{uid}/items/{notificationId}`
```
{
  type: "new_episode" | "reply" | "mention" | "channel_broadcast",
  payload: map,   // shape varies by type
  read: boolean,
  createdAt: timestamp
}
```

## Indexing notes

- Composite index needed on `posts`: `taggedCommunityId` + `createdAt desc`
  (community feed queries)
- Composite index needed on `posts`: `taggedDramaId` + `createdAt desc`
  (drama hub feed queries)
- `users.handle` needs a unique-enforcing check — Firestore doesn't enforce
  uniqueness natively, so handle reservation should go through a
  `handles/{handle}` collection written transactionally alongside user
  creation (doc existence = handle taken)

## Relationship diagram (textual)

```
User ──follows──> User
User ──follows──> Drama
User ──follows──> Actor
User ──member of──> Community
User ──subscribes──> Channel
Drama ──has many──> Episode
Drama ──has many──> Actor (cast)
Drama ──1:1──> Community (auto-created)
Post ──authored by──> User
Post ──tagged to──> Drama / Actor / Community (each optional)
Channel ──owned by──> User
Channel ──has many──> Broadcast
Conversation ──has many participants──> User
```
