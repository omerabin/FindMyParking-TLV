import React from 'react';
import ErrorPage from './ErrorPage';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    // You can log the error to an external service here
    // console.error(error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage error={this.state.error ?? undefined} reset={this.reset} />
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
