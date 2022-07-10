import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CloseIcon({ iconColor = '#F66D6D', width = 24, height = 24 }) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        fill={iconColor}
      />
    </Svg>
  );
}

export default CloseIcon;
