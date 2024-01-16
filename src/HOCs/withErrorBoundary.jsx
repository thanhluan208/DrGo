import React from "react";
import Fallback from "../screen/Fallback";
import ErrorBoundary from "../providers/ErrorBoundary";

const withErrorBoundary = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
      );
    }
  };
};

export default withErrorBoundary;
