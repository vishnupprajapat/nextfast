# Sentry Best Practices Guide

This guide documents the Sentry best practices implemented in this project, following official Sentry AI rules for exception catching, tracing, and logging.

## 📋 Table of Contents

- [Configuration](#configuration)
- [Exception Catching](#exception-catching)
- [Tracing & Spans](#tracing--spans)
- [Structured Logging](#structured-logging)
- [Component Examples](#component-examples)
- [API Route Examples](#api-route-examples)

## ⚙️ Configuration

### Initialization Files

Sentry is initialized in three places (DO NOT repeat initialization elsewhere):

1. **Client-side**: `sentry.client.config.ts`
2. **Server-side**: `sentry.server.config.ts`
3. **Edge runtime**: `sentry.edge.config.ts`

### Logging Enabled

All configurations have logging enabled:

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "your-dsn",
  enableLogs: true, // ✅ Enabled for structured logging
  integrations: [
    // Console logging integration - automatically captures console.log/warn/error
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
});
```

### Import Pattern

Always import Sentry using this pattern:

```typescript
import * as Sentry from "@sentry/nextjs";
```

## 🎯 Exception Catching

Use `Sentry.captureException(error)` to capture and log errors in Sentry.

### Basic Usage

```typescript
try {
  await doSomething();
} catch (error) {
  Sentry.captureException(error);
}
```

### With Context

```typescript
try {
  await processOrder(orderId);
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      component: "OrderProcessor",
      orderId: orderId,
    },
    extra: {
      orderData: orderDetails,
      timestamp: new Date().toISOString(),
    },
  });
}
```

### Helper Function

Use the helper from `@/lib/sentry`:

```typescript
import { captureException } from "@/lib/sentry";

try {
  await doSomething();
} catch (error) {
  captureException(error, {
    tags: { component: "checkout" },
    extra: { orderId: "123" },
  });
}
```

## 🔄 Tracing & Spans

Spans track meaningful actions within your application like button clicks, API calls, and function executions.

### Key Concepts

- **Parent spans** can contain **child spans**
- Set `name` and `op` properties to meaningful values
- Attach attributes with relevant information and metrics
- Use appropriate operation types: `ui.click`, `http.client`, `http.server`, `db.query`, `function`

### UI Component Spans

Track user interactions:

```typescript
function TestComponent() {
  const handleTestButtonClick = () => {
    // Create a span to measure performance
    Sentry.startSpan(
      {
        op: "ui.click",
        name: "Test Button Click",
      },
      (span) => {
        const value = "some config";
        const metric = "some metric";

        // Add metrics to the span
        span?.setAttribute("config", value);
        span?.setAttribute("metric", metric);

        doSomething();
      },
    );
  };

  return (
    <button type="button" onClick={handleTestButtonClick}>
      Test Sentry
    </button>
  );
}
```

### API Call Spans

Track HTTP requests:

```typescript
async function fetchUserData(userId: string) {
  return await Sentry.startSpan(
    {
      op: "http.client",
      name: `GET /api/users/${userId}`,
    },
    async (span) => {
      const startTime = Date.now();

      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();

      // Add attributes with metrics
      span?.setAttribute("statusCode", response.status);
      span?.setAttribute("duration", Date.now() - startTime);
      span?.setAttribute("userId", userId);

      return data;
    },
  );
}
```

### API Route Spans

Track server-side request handling:

```typescript
export async function POST(req: Request) {
  return await Sentry.startSpan(
    {
      op: "http.server",
      name: "POST /api/example",
    },
    async (span) => {
      const body = await req.json();

      // Add attributes
      span?.setAttribute("bodySize", JSON.stringify(body).length);

      // Process request...
      const result = await processRequest(body);

      return Response.json(result);
    },
  );
}
```

### Child Spans

Create nested spans for detailed performance tracking:

```typescript
async function processOrder(orderId: string) {
  return await Sentry.startSpan(
    {
      op: "function",
      name: "processOrder",
    },
    async (parentSpan) => {
      parentSpan?.setAttribute("orderId", orderId);

      // Child span for database query
      const order = await Sentry.startSpan(
        {
          op: "db.query",
          name: "fetchOrder",
        },
        async (childSpan) => {
          childSpan?.setAttribute("orderId", orderId);
          return await db.orders.findById(orderId);
        },
      );

      // Child span for payment processing
      const payment = await Sentry.startSpan(
        {
          op: "http.client",
          name: "processPayment",
        },
        async () => {
          return await paymentService.process(order);
        },
      );

      return { order, payment };
    },
  );
}
```

### Helper Functions

Use helpers from `@/lib/sentry`:

```typescript
import { startPerformanceSpan, startSpanWithAttributes } from "@/lib/sentry";

// Simple span
await startPerformanceSpan("fetchProducts", "db.query", async () => {
  return await db.query.products.findMany();
});

// With attributes
await startSpanWithAttributes(
  "fetchProducts",
  "db.query",
  { category: "electronics", limit: 10 },
  async (span) => {
    const products = await db.query.products.findMany();
    span?.setAttribute("resultCount", products.length);
    return products;
  },
);
```

## 📝 Structured Logging

Sentry provides a structured logger that integrates with error tracking.

### Logger Instance

```typescript
import * as Sentry from "@sentry/nextjs";

const { logger } = Sentry;
```

### Log Levels

```typescript
// Trace - most detailed
logger.trace("Starting database connection", { database: "users" });

// Debug - diagnostic information
logger.debug("Cache hit for user", { userId: "123", cached: true });

// Info - general informational messages
logger.info("Updated profile", { profileId: 345 });

// Warning - potentially harmful situations
logger.warn("Rate limit reached for endpoint", {
  endpoint: "/api/results/",
  isEnterprise: false,
});

// Error - error events
logger.error("Failed to process payment", {
  orderId: "order_123",
  amount: 99.99,
});

// Fatal - severe error events
logger.fatal("Database connection pool exhausted", {
  database: "users",
  activeConnections: 100,
});
```

### Template Literals with logger.fmt

Use `logger.fmt` to bring variables into structured logs:

```typescript
const userId = "12345";
const duration = 150;

// ✅ CORRECT - Using logger.fmt
logger.debug(logger.fmt`Cache miss for user: ${userId}`);
logger.info(logger.fmt`Request completed in ${duration}ms`);

// ❌ AVOID - String concatenation
logger.debug("Cache miss for user: " + userId);
```

### Console Logging Integration

Console methods are automatically captured when configured:

```typescript
// In sentry.client.config.ts and sentry.server.config.ts
Sentry.init({
  integrations: [
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
});
```

This means regular console calls are tracked:

```typescript
console.log("User logged in", { userId: "123" }); // Captured in Sentry
console.warn("Deprecated API used"); // Captured in Sentry
console.error("Payment failed", error); // Captured in Sentry
```

## 🎨 Component Examples

### Complete React Component Example

See `src/components/SentryExampleComponent.tsx` for a full example demonstrating:

- ✅ Custom span instrumentation for UI interactions
- ✅ Async span instrumentation for API calls
- ✅ Setting span attributes with metrics
- ✅ Exception catching with context
- ✅ Structured logging with all log levels
- ✅ Using logger.fmt for template literals

**Key patterns:**

```typescript
// UI interaction tracking
const handleButtonClick = () => {
  Sentry.startSpan({ op: "ui.click", name: "Button Click" }, (span) => {
    span?.setAttribute("buttonType", "submit");
    logger.info("Button clicked", { component: "MyComponent" });
    doWork();
  });
};

// Async API call tracking
const handleApiCall = async () => {
  await Sentry.startSpan(
    { op: "http.client", name: "GET /api/data" },
    async (span) => {
      const response = await fetch("/api/data");
      span?.setAttribute("statusCode", response.status);
      logger.info("API call completed", { statusCode: response.status });
      return response.json();
    },
  );
};

// Error handling with logging
try {
  await riskyOperation();
} catch (error) {
  logger.error("Operation failed", {
    errorMessage: error instanceof Error ? error.message : String(error),
  });
  Sentry.captureException(error);
}
```

## 🛣️ API Route Examples

### Complete API Route Example

See `src/app/api/example-sentry/route.ts` for a full example demonstrating:

- ✅ Parent span for entire request
- ✅ Child spans for sub-operations
- ✅ Setting span attributes with metrics
- ✅ Exception catching with context
- ✅ Structured logging throughout

**Key patterns:**

```typescript
export async function POST(req: Request) {
  return await Sentry.startSpan(
    { op: "http.server", name: "POST /api/example" },
    async (span) => {
      try {
        const body = await req.json();

        // Add attributes to parent span
        span?.setAttribute("bodySize", JSON.stringify(body).length);

        // Log request
        logger.info("API request received", {
          route: "/api/example",
          method: "POST",
        });

        // Child span for processing
        const result = await Sentry.startSpan(
          { op: "function", name: "processRequest" },
          async (childSpan) => {
            childSpan?.setAttribute("processingTime", 100);
            logger.debug("Processing request", { bodyKeys: Object.keys(body) });
            return await process(body);
          },
        );

        return Response.json({ success: true, result });
      } catch (error) {
        // Log and capture error
        logger.error("API request failed", {
          error: error instanceof Error ? error.message : String(error),
        });

        Sentry.captureException(error, {
          tags: { route: "/api/example" },
        });

        return Response.json({ error: "Failed" }, { status: 500 });
      }
    },
  );
}
```

## 📚 Additional Resources

- **Utility Functions**: `src/lib/sentry.ts` - All helper functions
- **Error Boundaries**: `src/components/ErrorBoundary.tsx` - React error catching
- **Example Component**: `src/components/SentryExampleComponent.tsx` - UI examples
- **Example API**: `src/app/api/example-sentry/route.ts` - API examples
- **Main Setup Guide**: `SENTRY_SETUP.md` - Configuration and deployment

## ✅ Checklist for New Code

When adding Sentry to new code:

- [ ] Use `Sentry.captureException(error)` in try-catch blocks
- [ ] Create spans for meaningful actions (UI clicks, API calls, DB queries)
- [ ] Set meaningful `name` and `op` properties on spans
- [ ] Add attributes to spans with relevant metrics
- [ ] Use structured logging with `logger` (not console.log directly)
- [ ] Use `logger.fmt` template literals for variables in logs
- [ ] Add context to exceptions (tags, extra data)
- [ ] Create child spans for detailed performance tracking
- [ ] Import Sentry as `import * as Sentry from "@sentry/nextjs"`
- [ ] Don't initialize Sentry in regular files (already done in config files)

## 🎯 Quick Reference

| Task | Pattern |
|------|---------|
| Catch exception | `Sentry.captureException(error)` |
| UI interaction | `Sentry.startSpan({ op: "ui.click", name: "..." }, ...)` |
| API call | `Sentry.startSpan({ op: "http.client", name: "..." }, ...)` |
| Server route | `Sentry.startSpan({ op: "http.server", name: "..." }, ...)` |
| DB query | `Sentry.startSpan({ op: "db.query", name: "..." }, ...)` |
| Add attribute | `span?.setAttribute("key", value)` |
| Log info | `logger.info("message", { data })` |
| Log with var | `logger.debug(logger.fmt\`User: ${userId}\`)` |
| Error context | `Sentry.captureException(err, { tags, extra })` |

Happy tracking! 🎉
