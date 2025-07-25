import React from "react";
import ErrorPage from "./pages/ErrorPage"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return (
        <ErrorPage />
        );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;