import * as Sentry from "@sentry/nextjs";

/**
 * Sentry Client Configuration
 * Handles error tracking, performance monitoring, and session replay for the browser
 */
Sentry.init({
  // Your Sentry DSN (Data Source Name)
  // Get this from: https://sentry.io/settings/[org]/projects/[project]/keys/
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment name
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,

  // Release tracking for better debugging
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Percentage of transactions to trace (1.0 = 100%)
  tracesSampleRate: 0,

  // Session Replay sample rate - disabled to reduce overhead
  replaysSessionSampleRate: 0,

  // If a session has an error, capture 100% of replays
  replaysOnErrorSampleRate: 1.0,

  // Enable debug mode in development
  debug: false,

  // Enable logging for structured logs
  enableLogs: true,

  // Integrations
  integrations: [
    // Session Replay for visual debugging
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),

    // Browser Tracing for performance monitoring
    Sentry.browserTracingIntegration({
      enableInp: true,
    }),

    // Breadcrumbs for better context
    Sentry.breadcrumbsIntegration({
      console: true,
      dom: true,
      fetch: true,
      history: true,
      xhr: true,
    }),

    // Console logging integration - captures console.log, console.warn, console.error
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  // Ignore specific errors
  ignoreErrors: [
    // Browser extensions
    "top.GLOBALS",
    "chrome-extension://",
    "moz-extension://",
    // Random plugins/extensions
    "atomicFindClose",
    // Network errors that are expected
    "Network request failed",
    "NetworkError",
    "Failed to fetch",
    // Cancelled requests
    "AbortError",
    "cancelled",
    // Non-error exceptions
    "Non-Error promise rejection captured",
    "Non-Error exception captured",
  ],

  // Don't send errors from localhost in production builds
  beforeSend(event, _hint) {
    // Filter out localhost errors in production
    if (
      process.env.NODE_ENV === "production" &&
      event.request?.url?.includes("localhost")
    ) {
      return null;
    }

    // Don't send if DSN is not configured
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
      return null;
    }

    return event;
  },

  // Set user context
  initialScope: {
    tags: {
      deployment: process.env.NEXT_PUBLIC_VERCEL_ENV || "development",
    },
  },
});
