import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as _ from 'lodash';
import { Divider } from '../../Components';
import { labelNumber } from '../../Core/Services';
import styles from './DigitStyles';
import DigitAction from './DigitAction';
import HintDigit from './HintDigit';

export default class Digit extends DigitAction {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.titleHeader}>
          Find The Digit
        </Text>

        <Text style={styles.inputLabel}>
          Input N
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={[styles.textInputContainer, {flex: 1, marginRight: 13}]}>
            <TextInput
              style={styles.textInput}
              value={_.get(this.state,'totalNumber').toString()}
              autoFocus={false}
              onChangeText={(totalNumber) => this.setState({
                totalNumber,
                showResult: false
              })}
              keyboardType={'numeric'}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={() => this.createInitialNumberOfString(this.state.totalNumber)}>
            <Text style={{color: '#fff'}}>Save</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.inputLabel}>
          Input Digit
        </Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={_.get(this.state,'findIndex').toString()}
            autoFocus={false}
            placeholder={`Input the digit between 1 to ${this.state.totalNumber}`}
            placeholderTextColor={'#ddd'}
            onChangeText={(findIndex) => this.actionFindDigit(findIndex)}
            keyboardType={'numeric'}
          />
        </View>

        <Divider height={2}/>

        {
          this.state.showResult ?
            this.state.isNotFound ?
              <Text style={styles.textInfo}>
                Sorry {labelNumber.ordinalBuilder(this.state.findIndex)} digit number is not found
              </Text>
            :
              <Text style={styles.textInfo}>
                {labelNumber.ordinalBuilder(this.state.findIndex)} digit number is
                <Text style={{fontWeight: 'bold', fontSize: 16}}> {_.get(this.state,'dataFound.digit')} </Text>
                lies on number
                <Text style={{fontWeight: 'bold', fontSize: 16}}> {_.get(this.state,'dataFound.value')} </Text>
              </Text>
          :
            <HintDigit/>
        }
      </View>
    )
  }
}