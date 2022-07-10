import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

/**
 * @param children React.ReactNode
 * @returns a non-scrollable ScrollView that will dismiss the keyboard when tapped anywhere on the screen.
 */
const KeyboardDismissView: React.FC = ({ children }) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={false}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});

export default KeyboardDismissView;
