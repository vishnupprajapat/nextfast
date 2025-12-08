/**
 * Next.js Instrumentation File
 * Runs once when the server starts
 * Used to initialize monitoring tools like Sentry
 */

export async function register() {
  // Disable Sentry in development to avoid crypto.randomUUID() issues with Next.js 16 cacheComponents
  if (process.env.NODE_ENV === "development") {
    return;
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
