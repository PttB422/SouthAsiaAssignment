import KeyboardDismissView from '@components/KeyboardDismissView';
import React, { ComponentType } from 'react';

const withKeyboardDismiss = <T,>(WrappedComponent: ComponentType<T>) => {
  const WithKeyboardDismissComponent = (props: T) => {
    return (
      <KeyboardDismissView>
        <WrappedComponent {...props} />
      </KeyboardDismissView>
    );
  };
  return WithKeyboardDismissComponent;
};

export default withKeyboardDismiss;
