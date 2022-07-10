import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

type FabProps = {
  onPress: () => void;
  Icon: React.ReactNode;
  position?: {
    top?: number;
    left?: number;
    bottom: number;
    right: number;
  };
};

const Fab = ({ onPress, Icon, position }: FabProps) => {
  const { bottom, right } = position ?? { bottom: 16, right: 16 };
  return (
    <TouchableOpacity
      style={[styles.container, { bottom, right }]}
      onPress={onPress}>
      {Icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AEC57D',
    padding: 12,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Fab;
