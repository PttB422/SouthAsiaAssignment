import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

type LoadingOverlayProps = {
  isLoading: boolean;
};

const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  return (
    <Modal visible={isLoading} transparent={true}>
      <View
        style={{
          backgroundColor: '#302d2d',
          opacity: 0.5,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
};

export default LoadingOverlay;
