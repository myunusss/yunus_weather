import * as React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const Divider = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.onChange('weather')}>
        <Image
          source={require('../Shared/assets/icons/yu_weather.png')}
          style={[styles.image, {tintColor: props.screen === 'weather' ? '#fff' : '#aaa'}]}/>
        <View style={[styles.buttonIndicator, {height: props.screen === 'weather' ? 2 : 0}]}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {}}
        disabled>
          <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>- Yunus App -</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.onChange('digit')}>
        <Image
          source={require('../Shared/assets/icons/digit.png')}
          style={[styles.image, {tintColor: props.screen === 'digit' ? '#fff' : '#aaa'}]}/>
        <View style={[styles.buttonIndicator, {height: props.screen === 'digit' ? 2 : 0}]}/>
      </TouchableOpacity>
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    height: 50,
    backgroundColor: 'rgba(50,100,200,1)',
    alignItems: 'center',
    borderRadius: 30,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIndicator: {
    borderRadius: 2,
    width: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 5
  },
  image: {
    width: 24, height: 24, resizeMode: 'contain',
  }
})