import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  titleStyle?: TextStyle;
};

const Button = ({ title, buttonStyle, titleStyle, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonBaseStyle, buttonStyle]}>
      <Text style={[styles.titleBaseStyle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBaseStyle: {
    backgroundColor: '#AEC57D',
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleBaseStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Button;
