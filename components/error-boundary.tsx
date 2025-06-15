"use client"

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
          <Card className="bg-slate-800 border-slate-700 max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center text-red-400">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-slate-300">
                We encountered an error while loading your data. This might be a temporary issue.
              </p>
              {this.state.error && (
                <details className="text-left">
                  <summary className="text-slate-400 text-sm cursor-pointer hover:text-slate-300">
                    Technical details
                  </summary>
                  <pre className="mt-2 text-xs text-slate-500 bg-slate-900 p-2 rounded overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-900"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
                <Button
                  variant="outline"
                  onClick={() => this.setState({ hasError: false })}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export function FirebaseErrorDisplay({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <Card className="bg-slate-800 border-red-500/50 border-2">
      <CardContent className="p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-400 mb-2">Firebase Error</h3>
        <p className="text-slate-300 mb-4">{error}</p>
        <Button
          onClick={onRetry}
          variant="outline"
          className="border-red-500 text-red-400 hover:bg-red-500/10"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </CardContent>
    </Card>
  );
} 