import * as React from 'react';
import { View } from 'react-native';

const Divider = (props) => {
  return (
    <View
      style={{
        height: props.height || 5,
        width: '100%',
        backgroundColor: props.backgroundColor || '#f1f1f1',
      }}
    />
  );
};

export default Divider;
