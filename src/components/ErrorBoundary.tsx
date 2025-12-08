"use client";

import { Component, type ReactNode } from "react";
import { captureException } from "@/lib/sentry";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary component with Sentry integration
 *
 * Catches React errors in component tree and reports to Sentry
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 *
 * @example Custom fallback
 * ```tsx
 * <ErrorBoundary fallback={<div>Something went wrong</div>}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Report to Sentry
    captureException(error, {
      level: "error",
      tags: {
        component: "ErrorBoundary",
        errorBoundary: "true",
      },
      extra: {
        componentStack: errorInfo.componentStack,
        errorInfo: errorInfo,
      },
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h2 className="mb-4 font-bold text-2xl text-red-600">
              Something went wrong
            </h2>
            <p className="mb-6 text-gray-600">
              We've been notified and are working on a fix.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-left">
                <summary className="cursor-pointer font-semibold text-red-700">
                  Error Details (Dev Only)
                </summary>
                <pre className="mt-2 overflow-auto text-red-600 text-xs">
                  {this.state.error.message}
                  {"\n\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
              type="button"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Async Error Boundary for handling async errors
 *
 * Use with Suspense boundaries for loading states
 *
 * @example
 * ```tsx
 * <AsyncErrorBoundary>
 *   <Suspense fallback={<Loading />}>
 *     <AsyncComponent />
 *   </Suspense>
 * </AsyncErrorBoundary>
 * ```
 */
export function AsyncErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Failed to load content</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-blue-600 hover:underline"
              type="button"
            >
              Reload Page
            </button>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * Section Error Boundary for isolated sections
 *
 * Prevents entire page from crashing when one section fails
 *
 * @example
 * ```tsx
 * <SectionErrorBoundary sectionName="Product Reviews">
 *   <ProductReviews />
 * </SectionErrorBoundary>
 * ```
 */
export function SectionErrorBoundary({
  children,
  sectionName,
}: {
  children: ReactNode;
  sectionName: string;
}) {
  return (
    <ErrorBoundary
      onError={(error) => {
        // Additional logging for sections
        console.error(`Error in section: ${sectionName}`, error);
      }}
      fallback={
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600 text-sm">
            Failed to load {sectionName.toLowerCase()}
          </p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
