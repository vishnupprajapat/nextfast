import * as Sentry from "@sentry/nextjs";

/**
 * Sentry Server Configuration
 * Handles error tracking and performance monitoring for Node.js/Edge runtime
 */
Sentry.init({
  // Your Sentry DSN (Data Source Name)
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment name
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Percentage of transactions to trace
  // Disabled to avoid crypto.randomUUID() issues with Next.js 16 cacheComponents
  tracesSampleRate: 0,

  // Enable debug mode in development
  debug: false,

  // Integrations - minimal set without tracing
  integrations: [
    // Module loading integration
    Sentry.modulesIntegration(),

    // Context lines for stack traces
    Sentry.contextLinesIntegration(),
  ],

  // Ignore specific errors
  ignoreErrors: [
    // Network timeouts
    "ETIMEDOUT",
    "ECONNRESET",
    "ENOTFOUND",
    "ECONNREFUSED",
    // Database connection errors that should be logged differently
    "Connection terminated unexpectedly",
    // Expected errors
    "AbortError",
    "cancelled",
  ],

  // Filter sensitive data
  beforeSend(event, _hint) {
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
      headers["x-api-key"] = undefined;
    }

    // Remove sensitive data from context
    if (event.contexts?.request?.data) {
      const data = event.contexts.request.data as Record<string, unknown>;
      if (data.password) data.password = "[Filtered]";
      if (data.passwordHash) data.passwordHash = "[Filtered]";
      if (data.token) data.token = "[Filtered]";
    }

    return event;
  },

  // Set server context
  initialScope: {
    tags: {
      runtime: "nodejs",
      deployment: process.env.NEXT_PUBLIC_VERCEL_ENV || "development",
    },
  },
});
