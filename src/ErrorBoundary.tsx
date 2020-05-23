import * as React from 'react';
import styled from '@emotion/styled';
import { ErrorBox } from './errors';
import { withScope, captureException } from '@sentry/browser';

const Outer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  & > *+* { margin-top: 20px; }
`;

class ErrorBoundary extends React.Component<{}, {}> {
  state = {hasError: false, error: null};

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error });
    if (process.env.REACT_APP_SENTRY_DSN) {
      withScope(scope => {
        // scope.setUser({ id: netlifyIdentity.currentUser()?.email });
        captureException(error);
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Outer>
          <ErrorBox
            text="Oops, etwas ist schief gelaufen… "
            error={this.state.error}
            retry={() => document.location.reload()}
          />
        </Outer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
