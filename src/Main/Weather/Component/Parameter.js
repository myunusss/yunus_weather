import * as React from 'react';
import { View, Text } from 'react-native';

const Parameter = (props) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{fontSize: 20, fontWeight:'bold'}}>
        {props.value || '0'}
        <Text style={{fontSize: 12}}> {props.unit}</Text>
      </Text>
      <Text style={{fontSize: 13, color: '#000', textAlign: 'center'}}>
        {props.title}
      </Text>
    </View>
  );
};

export default Parameter;
