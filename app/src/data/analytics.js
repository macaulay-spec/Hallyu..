// Hallyu analytics — thin shared logger matching 07_analytics_tracking_plan.md.
// QA/demo build: emits to the console (and keeps an in-memory ring buffer).
// Production swaps `transport` for Firebase Analytics; the event vocabulary stays identical.
// Rule (doc 13/15): never log message/UGC *content* — IDs and category flags only.

const BUFFER_SIZE = 200;
const buffer = [];

function transport(event) {
  // In-app QA surface: console. Replace with Firebase Analytics / BigQuery sink in production.
  if (typeof console !== 'undefined') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event.name, event.params);
  }
}

export function track(name, params = {}) {
  const event = {
    name,
    params: {
      platform: 'web',
      app_version: '0.1.0-demo',
      timestamp: Date.now(),
      ...params,
    },
  };
  buffer.push(event);
  if (buffer.length > BUFFER_SIZE) buffer.shift();
  transport(event);
}

export const getAnalyticsLog = () => [...buffer];

// Screen impression helper (drama_viewed, community_viewed, etc. are fired by screens as needed).
export function screenView(screen, params = {}) {
  track('screen_view', { screen, ...params });
}
