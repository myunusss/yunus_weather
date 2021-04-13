import * as React from 'react';
import { Text, View } from 'react-native';

const HintDigit = (props) => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <Text style={{fontSize: 14, color: '#000', marginTop: 10}}>
        1. Input N number {'\n'}
        2. Click button Save {'\n'}
        3. Input digit number
      </Text>
    </View>
  );
};

export default HintDigit;
