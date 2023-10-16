// utils/ErrorBoundary.js
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or perform other actions here
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render an error message or fallback UI
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
