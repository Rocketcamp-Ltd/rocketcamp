import { ComponentType, ReactElement } from 'react';

export function withLayout<P extends object>(
  WrappedComponent: ComponentType<P>,
  Layout: ComponentType<{ children: ReactElement }>
) {
  return function WithLayoutComponent(props: P) {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  };
}
