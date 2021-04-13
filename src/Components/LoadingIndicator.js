import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const LoadingIndicator = (props) => {
  return(
    <View style={styles.container}>
      <ActivityIndicator
        size={'small'}
        color={props.color || '#ccc'}
      />
      {
        props.disableText ? null :
        <Text style={styles.infoText}>
          {props.text || 'Please wait'}
        </Text>
      }
    </View>
  )
}

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  infoText: {
    marginTop: 5,
    justifyContent: 'center',
    color: '#fff',
    fontSize: 12
  }
})