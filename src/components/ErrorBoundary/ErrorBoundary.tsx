import { Component, PropsWithChildren, ReactNode } from "react";

interface ErrorBoundaryProps {
       fallback: ReactNode;
}

export class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>> {
       state = {
              isError: false
       };

       static getDerivedStateFromError() {
              return { isError: true };
       }

       render() {
              if (this.state.isError) {
                     return this.props.fallback;
              }

              return this.props.children;
       }
}
