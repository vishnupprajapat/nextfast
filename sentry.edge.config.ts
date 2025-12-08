import * as Sentry from "@sentry/nextjs";

/**
 * Sentry Edge Runtime Configuration
 * Handles error tracking for Edge Runtime (middleware, edge API routes)
 */
Sentry.init({
  // Your Sentry DSN
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Trace sample rate - lower for edge to reduce overhead
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.05 : 1.0,

  // Enable debug in development
  debug: process.env.NODE_ENV === "development",

  // Enable logging for structured logs
  enableLogs: true,

  // Ignore errors
  ignoreErrors: [
    "Network request failed",
    "Failed to fetch",
    "AbortError",
    "cancelled",
  ],

  // Filter sensitive data
  beforeSend(event) {
    // Don't send if DSN is not configured
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
      return null;
    }

    // Remove sensitive headers
    if (event.request?.headers) {
      const headers = event.request.headers as Record<
        string,
        string | undefined
      >;
      headers.authorization = undefined;
      headers.cookie = undefined;
    }

    return event;
  },

  // Set edge context
  initialScope: {
    tags: {
      runtime: "edge",
      deployment: process.env.NEXT_PUBLIC_VERCEL_ENV || "development",
    },
  },
});
