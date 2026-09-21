import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Addis Eats Error:", error);

    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-page">
          <div className="error-card">
            <div className="error-icon">!</div>

            <h2>Something went wrong</h2>

            <p>This part of Addis Eats couldn't load.</p>

            <button
              onClick={() =>
                this.setState({
                  hasError: false,
                })
              }
              className="primary-button"
            >
              Try Again
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
