import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type HLabelTextProps = {
  label: string;
  text: string;
};

const HorizontalLabelText = ({ label, text }: HLabelTextProps) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.label}>{`${label}: `}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#AEC57D',
    marginRight: 4,
    flex: 1,
  },
  text: {
    flex: 2,
    color: '#000',
  },
});

export default HorizontalLabelText;
