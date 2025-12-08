# Sentry Integration Setup Guide

Complete guide for error tracking, performance monitoring, and session replay with Sentry in your Next.js application.

## 📋 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [GitHub Actions Integration](#github-actions-integration)
- [Vercel Integration](#vercel-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

Sentry is integrated with:
- ✅ Error tracking (client & server)
- ✅ Performance monitoring
- ✅ Session replay
- ✅ Source map uploads
- ✅ Release tracking
- ✅ Git commit tracking
- ✅ GitHub Actions CI/CD
- ✅ User context tracking

### What's Included

**Client-side (`sentry.client.config.ts`):**
- Browser error tracking
- Performance monitoring
- Session replay with privacy controls
- Breadcrumb tracking
- User session tracking

**Server-side (`sentry.server.config.ts`):**
- Node.js error tracking
- API route monitoring
- Database query tracking
- Server-side performance

**Edge Runtime (`sentry.edge.config.ts`):**
- Middleware error tracking
- Edge function monitoring
- Minimal overhead configuration

## 📦 Installation

Sentry is already installed! The package `@sentry/nextjs@10.29.0` is configured.

### Verify Installation

```bash
pnpm list @sentry/nextjs
```

## ⚙️ Configuration

### 1. Create Sentry Project

1. Go to [sentry.io](https://sentry.io)
2. Create a new project or use existing
3. Select "Next.js" as the platform
4. Copy your DSN (Data Source Name)

### 2. Set Environment Variables

Copy the example file:

```bash
cp .env.sentry.example .env.local
```

Fill in your Sentry credentials in `.env.local`:

```env
# Sentry DSN (public, safe for client-side)
NEXT_PUBLIC_SENTRY_DSN=https://your-key@o0000000.ingest.us.sentry.io/0000000

# Organization slug (found in Sentry settings)
SENTRY_ORG=your-org-slug

# Project name
SENTRY_PROJECT=your-project-name

# Auth token (secret! for source map uploads)
SENTRY_AUTH_TOKEN=sntrys_your_auth_token_here
```

### 3. Get Your Auth Token

Create a Sentry auth token:

1. Go to: https://sentry.io/settings/account/api/auth-tokens/
2. Click "Create New Token"
3. Name: "NextFast CI/CD"
4. Scopes: Select:
   - `project:releases` (create releases)
   - `project:write` (upload files)
5. Copy the token and add to `.env.local`

### 4. Add to GitHub Secrets

For CI/CD, add these secrets to your GitHub repository:

1. Go to: Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each:
   - `NEXT_PUBLIC_SENTRY_DSN`
   - `SENTRY_ORG`
   - `SENTRY_PROJECT`
   - `SENTRY_AUTH_TOKEN`

### 5. Vercel Environment Variables

In your Vercel project settings:

1. Go to: Settings → Environment Variables
2. Add all four Sentry variables
3. Select which environments (Production, Preview, Development)

## 🚀 Usage

### Basic Error Tracking

```typescript
import { captureException } from '@/lib/sentry';

try {
  // Your code
  throw new Error('Something went wrong');
} catch (error) {
  captureException(error, {
    level: 'error',
    tags: { component: 'checkout' },
    extra: { orderId: '12345' },
  });
}
```

### Capture Messages

```typescript
import { captureMessage } from '@/lib/sentry';

captureMessage('User completed checkout', 'info', {
  tags: { flow: 'checkout' },
  extra: { amount: 99.99 },
});
```

### Set User Context

```typescript
import { setUser } from '@/lib/sentry';

// After login
setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});

// After logout
setUser(null);
```

### Add Breadcrumbs

```typescript
import { addBreadcrumb } from '@/lib/sentry';

addBreadcrumb('User clicked checkout button', 'user-action', 'info', {
  cartTotal: 99.99,
  itemCount: 3,
});
```

### Performance Monitoring

```typescript
import { measurePerformance } from '@/lib/sentry';

const result = await measurePerformance(
  'fetchProducts',
  async () => {
    return await db.query.products.findMany();
  },
  'db.query'
);
```

### API Route Error Handling

```typescript
import { withSentry } from '@/lib/sentry';

export const POST = withSentry(async (req: Request) => {
  // Your API logic
  const data = await req.json();
  
  if (!data.email) {
    throw new Error('Email required');
  }
  
  return Response.json({ success: true });
}, 'api-subscribe');
```

### Server Actions

```typescript
'use server';

import { captureException } from '@/lib/sentry';

export async function createOrder(formData: FormData) {
  try {
    // Your logic
    const order = await db.insert(orders).values({...});
    return { success: true, orderId: order.id };
  } catch (error) {
    captureException(error, {
      tags: { action: 'createOrder' },
      extra: { formData: Object.fromEntries(formData) },
    });
    return { success: false, error: 'Failed to create order' };
  }
}
```

### React Components

```typescript
'use client';

import { useEffect } from 'react';
import { setUser, captureException } from '@/lib/sentry';

export function CheckoutPage() {
  useEffect(() => {
    // Track page view
    setUser({ id: userId, email: userEmail });
  }, []);

  const handleCheckout = async () => {
    try {
      await processCheckout();
    } catch (error) {
      captureException(error, {
        tags: { component: 'CheckoutPage' },
      });
      // Show error to user
    }
  };

  return <div>...</div>;
}
```

## 🔄 GitHub Actions Integration

### Automatic Release Creation

The deployment workflow (`.github/workflows/deploy.yml`) automatically:

1. **Creates Sentry release** on production deploy
2. **Uploads source maps** for better stack traces
3. **Tracks Git commits** for each release
4. **Notifies deployment** completion

### Manual Release

Create a release manually:

```bash
# Install Sentry CLI
pnpm add -D @sentry/cli

# Create release
npx sentry-cli releases new $RELEASE_VERSION

# Upload source maps
npx sentry-cli releases files $RELEASE_VERSION upload-sourcemaps .next

# Finalize release
npx sentry-cli releases finalize $RELEASE_VERSION
```

## ☁️ Vercel Integration

### Automatic Integration

Sentry automatically detects Vercel environment variables:

- `NEXT_PUBLIC_VERCEL_ENV` → Environment name
- `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA` → Release version
- `VERCEL_GIT_COMMIT_REF` → Branch name
- `VERCEL_GIT_REPO_SLUG` → Repository name

### Source Maps Upload

Source maps are automatically uploaded during build when:
- `SENTRY_AUTH_TOKEN` is set
- `SENTRY_ORG` and `SENTRY_PROJECT` are configured
- Building for production (`pnpm build`)

## 📚 Best Practices

### 1. Filter Sensitive Data

Already configured in `sentry.server.config.ts`:

```typescript
beforeSend(event) {
  // Remove sensitive headers
  if (event.request?.headers) {
    delete event.request.headers.authorization;
    delete event.request.headers.cookie;
  }
  
  // Filter passwords
  if (event.contexts?.request?.data) {
    const data = event.contexts.request.data;
    if (data.password) data.password = '[Filtered]';
  }
  
  return event;
}
```

### 2. Set Sample Rates

Adjust in config files based on traffic:

```typescript
// Production (low traffic cost)
tracesSampleRate: 0.1,  // 10% of transactions
replaysSessionSampleRate: 0.1,  // 10% of sessions

// Development (full visibility)
tracesSampleRate: 1.0,  // 100%
replaysSessionSampleRate: 1.0,  // 100%
```

### 3. Ignore Expected Errors

Already configured common errors:

```typescript
ignoreErrors: [
  'Network request failed',
  'Failed to fetch',
  'AbortError',
  'chrome-extension://',
  // Add more as needed
]
```

### 4. Add Context to Errors

Always include relevant context:

```typescript
captureException(error, {
  tags: {
    component: 'ProductPage',
    action: 'addToCart',
  },
  extra: {
    productId: product.id,
    quantity: qty,
    userId: user?.id,
  },
});
```

### 5. Use Breadcrumbs

Add breadcrumbs before errors occur:

```typescript
addBreadcrumb('User viewed product', 'navigation');
addBreadcrumb('Added to cart', 'user-action');
addBreadcrumb('Started checkout', 'user-action');
// Error occurs here - breadcrumbs show what led to it
```

### 6. Session Replay Privacy

Already configured with privacy controls:

```typescript
replayIntegration({
  maskAllText: true,      // Hide all text
  blockAllMedia: true,    // Hide images/videos
})
```

Customize if needed:

```typescript
maskAllText: false,       // Show some text
block: ['.sensitive'],    // Block specific elements
mask: ['.pii'],          // Mask specific elements
```

## 🐛 Troubleshooting

### No Errors Appearing in Sentry

1. **Check DSN is set:**
   ```bash
   echo $NEXT_PUBLIC_SENTRY_DSN
   ```

2. **Verify initialization:**
   - Open browser console
   - Look for Sentry debug messages
   - Check Network tab for Sentry requests

3. **Test manually:**
   ```typescript
   import { captureMessage } from '@/lib/sentry';
   captureMessage('Test message');
   ```

### Source Maps Not Working

1. **Verify auth token has correct scopes:**
   - `project:releases`
   - `project:write`

2. **Check build output:**
   ```bash
   pnpm build
   # Look for "Sentry" messages in output
   ```

3. **Verify files uploaded:**
   - Go to Sentry → Settings → Source Maps
   - Check if `.map` files are present

### High Event Volume

Reduce sample rates in config files:

```typescript
// Reduce traces
tracesSampleRate: 0.05,  // 5% instead of 10%

// Reduce replays
replaysSessionSampleRate: 0.05,  // 5% instead of 10%
```

### Localhost Errors in Production

Already filtered in `beforeSend`:

```typescript
if (process.env.NODE_ENV === 'production' && 
    event.request?.url?.includes('localhost')) {
  return null;  // Don't send
}
```

### Performance Impact

Sentry is optimized for minimal impact:

- Errors: ~1-2ms overhead
- Performance: Sampled (not every request)
- Session Replay: Compressed & async
- Total: <5% overhead

## 📊 Monitoring in Sentry

### View Errors

1. Go to Issues → All Issues
2. Filter by environment
3. Click issue for details:
   - Stack trace with source maps
   - Breadcrumbs leading to error
   - User context
   - Device/browser info

### View Performance

1. Go to Performance
2. See transaction times
3. Identify slow endpoints
4. Optimize based on data

### View Session Replays

1. Go to Replays
2. Watch user sessions
3. See exactly what happened
4. Reproduce bugs easily

## 🔗 Resources

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Dashboard](https://sentry.io)
- [Release Management](https://docs.sentry.io/product/releases/)
- [Source Maps Guide](https://docs.sentry.io/platforms/javascript/sourcemaps/)

## ✅ Verification Checklist

- [ ] `.env.local` configured with Sentry credentials
- [ ] Test error captured in Sentry dashboard
- [ ] Source maps uploading on build
- [ ] GitHub secrets configured for CI/CD
- [ ] Vercel environment variables set
- [ ] Performance monitoring active
- [ ] Session replay working
- [ ] User context tracking enabled
- [ ] Release tracking configured

Your Sentry integration is production-ready! 🎉
