import React from 'react';
import { Text, View } from 'react-native';

type HLabelTextProps = {
  label: string;
  text: string;
};

const HorizontalLabelText = ({ label, text }: HLabelTextProps) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text
        style={{
          color: '#AEC57D',
          marginRight: 4,
          flex: 1,
        }}>{`${label}: `}</Text>
      <Text style={{ flex: 2 }}>{text}</Text>
    </View>
  );
};

export default HorizontalLabelText;
