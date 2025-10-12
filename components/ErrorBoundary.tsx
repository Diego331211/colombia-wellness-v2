// components/ErrorBoundary.tsx
import React from "react";
import { captureClientError } from "../lib/captureError";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  componentName?: string;
  user?: string;
  propsToLog?: Record<string, any>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    captureClientError(error, {
      component: this.props.componentName,
      user: this.props.user,
      props: this.props.propsToLog,
      reactErrorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return <div>Ha ocurrido un error inesperado.</div>;
    }
    return this.props.children;
  }
}
