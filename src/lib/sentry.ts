import * as Sentry from "@sentry/nextjs";

/**
 * Sentry Utility Functions
 * Helper functions for error tracking, performance monitoring, and logging
 *
 * Note: Sentry is already initialized in:
 * - Client: sentry.client.config.ts
 * - Server: sentry.server.config.ts
 * - Edge: sentry.edge.config.ts
 */

// Get logger instance for structured logging
const { logger } = Sentry;

/**
 * Capture an exception with additional context
 * Use in try-catch blocks or areas where exceptions are expected
 *
 * @example
 * ```typescript
 * try {
 *   await doSomething();
 * } catch (error) {
 *   captureException(error, {
 *     tags: { component: 'checkout' },
 *     extra: { orderId: '123' }
 *   });
 * }
 * ```
 */
export function captureException(
  error: Error,
  context?: {
    level?: Sentry.SeverityLevel;
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
    user?: {
      id?: string;
      email?: string;
      username?: string;
    };
  },
) {
  Sentry.captureException(error, {
    level: context?.level || "error",
    tags: context?.tags,
    extra: context?.extra,
    user: context?.user,
  });
}

/**
 * Capture a message with additional context
 */
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = "info",
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
  },
) {
  Sentry.captureMessage(message, {
    level,
    tags: context?.tags,
    extra: context?.extra,
  });
}

/**
 * Set user context for error tracking
 */
export function setUser(
  user: {
    id?: string;
    email?: string;
    username?: string;
    [key: string]: unknown;
  } | null,
) {
  Sentry.setUser(user);
}

/**
 * Add a breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category?: string,
  level?: Sentry.SeverityLevel,
  data?: Record<string, unknown>,
) {
  Sentry.addBreadcrumb({
    message,
    category: category || "custom",
    level: level || "info",
    data,
  });
}

/**
 * Start a new span for performance monitoring
 * Use for custom performance tracking spans
 *
 * @example Component action
 * ```typescript
 * const handleButtonClick = () => {
 *   Sentry.startSpan({ op: "ui.click", name: "Test Button Click" }, (span) => {
 *     span.setAttribute("config", "some value");
 *     span.setAttribute("metric", "some metric");
 *     doSomething();
 *   });
 * };
 * ```
 *
 * @example API call
 * ```typescript
 * async function fetchUserData(userId: string) {
 *   return await Sentry.startSpan(
 *     { op: "http.client", name: `GET /api/users/${userId}` },
 *     async () => {
 *       const response = await fetch(`/api/users/${userId}`);
 *       return response.json();
 *     }
 *   );
 * }
 * ```
 */
export async function startPerformanceSpan<T>(
  name: string,
  op: string,
  callback: () => T | Promise<T>,
): Promise<T> {
  return await Sentry.startSpan({ name, op }, callback);
}

/**
 * Start a span with attributes
 * Use when you need to attach custom attributes to the span
 *
 * @example
 * ```typescript
 * await startSpanWithAttributes(
 *   "fetchProducts",
 *   "db.query",
 *   { category: "electronics", limit: 10 },
 *   async (span) => {
 *     const products = await db.query.products.findMany();
 *     span.setAttribute("resultCount", products.length);
 *     return products;
 *   }
 * );
 * ```
 */
export async function startSpanWithAttributes<T>(
  name: string,
  op: string,
  attributes: Record<string, string | number | boolean>,
  callback: (span: ReturnType<typeof Sentry.getActiveSpan>) => T | Promise<T>,
): Promise<T> {
  return await Sentry.startSpan({ name, op }, (span) => {
    // Set all attributes on the span
    for (const [key, value] of Object.entries(attributes)) {
      span?.setAttribute(key, value);
    }
    return callback(span);
  });
}

/**
 * Measure function execution time
 * Simplified wrapper for common use case
 *
 * @example
 * ```typescript
 * const products = await measurePerformance(
 *   "fetchProducts",
 *   async () => db.query.products.findMany(),
 *   "db.query"
 * );
 * ```
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>,
  op = "function",
): Promise<T> {
  return await Sentry.startSpan({ name, op }, async () => {
    try {
      return await fn();
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  });
}

/**
 * Wrap an API route with Sentry error handling
 */
export function withSentry<T extends (...args: any[]) => any>(
  handler: T,
  handlerName?: string,
): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await handler(...args);
    } catch (error) {
      captureException(error as Error, {
        tags: {
          handler: handlerName || handler.name || "unknown",
        },
      });
      throw error;
    }
  }) as T;
}

/**
 * Set custom tags for the current scope
 */
export function setTags(tags: Record<string, string>) {
  Sentry.setTags(tags);
}

/**
 * Set custom context for the current scope
 */
export function setContext(name: string, context: Record<string, unknown>) {
  Sentry.setContext(name, context);
}

/**
 * Create a checkpoint for performance monitoring
 */
export function createCheckpoint(name: string) {
  return Sentry.startSpan({ name }, () => {
    // Span will be automatically finished when the function returns
  });
}

/**
 * Flush pending events (useful before serverless function terminates)
 */
export async function flush(timeout: number = 2000): Promise<boolean> {
  return await Sentry.flush(timeout);
}

/**
 * Close the Sentry client
 */
export async function close(timeout = 2000): Promise<boolean> {
  return await Sentry.close(timeout);
}

/**
 * Structured logging functions using Sentry logger
 * Use logger.fmt template literal for variables in structured logs
 *
 * @example
 * ```typescript
 * // Trace level
 * logger.trace("Starting database connection", { database: "users" });
 *
 * // Debug level with template
 * logger.debug(logger.fmt`Cache miss for user: ${userId}`);
 *
 * // Info level
 * logger.info("Updated profile", { profileId: 345 });
 *
 * // Warning level
 * logger.warn("Rate limit reached for endpoint", {
 *   endpoint: "/api/results/",
 *   isEnterprise: false,
 * });
 *
 * // Error level
 * logger.error("Failed to process payment", {
 *   orderId: "order_123",
 *   amount: 99.99,
 * });
 *
 * // Fatal level
 * logger.fatal("Database connection pool exhausted", {
 *   database: "users",
 *   activeConnections: 100,
 * });
 * ```
 */
export { logger };

/**
 * Export Sentry for direct access if needed
 */
export { Sentry };
