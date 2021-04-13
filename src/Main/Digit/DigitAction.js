import React, {Component} from 'react';
import { Alert } from 'react-native';

export default class DigitAction extends Component {
  constructor(props){
    super(props)
    this.state = {
      initialData: [],
      findIndex: '',
      dataFound: {value: '', digit: '', row: ''},
      totalNumber: 100,
      showResult: false,
      isNotFound: true
    }
  }

  componentDidMount() {
    this.createInitialNumberOfString(this.state.totalNumber)
  }

  createInitialNumberOfString(length) {
    if (length > 1) {
      let value = '';
      let arrData = [];
  
      for (let i = 1; i <= length; i++) {
        let data = i.toString()
        for (let j = 1; j <= data.length; j++) {
          let digit = value.length + j;
          arrData.push(
            {value: i.toString(), digit: data[j-1], row: digit.toString()}
          )
        }
        value = value + data;
      }
  
      this.setState({
        initialData: arrData
      })
    } else {
      Alert.alert('Oopss', 'The digit number must be more than 1')
    }
  }

  actionFindDigit(findIndex) {
    this.setState({findIndex})

    let dataFound = this.state.initialData.filter((item) => item.row == findIndex);
    if (findIndex > 0) {
      if (dataFound.length >= 1) {
        this.setState({
          dataFound: dataFound[0],
          isNotFound: false,
          showResult: true
        })
      } else {
        this.setState({
          isNotFound: true,
          showResult: true
        })
      }
    } else {
      this.setState({
        showResult: false
      })
    }
  }
}