import React from 'react';
import { Text, StyleSheet, Image } from "react-native";
import { useEffect } from 'react';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

const SplashPage = () => {
  useEffect(() => {
    setTimeout(() => {
      Actions.reset('home')
    }, 1000);
  }, [])

  return(
    <LinearGradient
      colors={['#91d3f9', '#58bcf4', '#1995fb']}
      style={styles.container}>
      <Image
        source={require('../Shared/assets/images/splashscreen.png')}
        style={{width: 220, resizeMode: 'contain'}}
      />
      <Text style={styles.versionText}>
        v 0.0.1 - 2021
      </Text>
    </LinearGradient>
  )
}

export default SplashPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(50,100,200,1)',
  },
  versionText: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center'
  }
})