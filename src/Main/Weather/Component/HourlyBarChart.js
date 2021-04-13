/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-svg';
import { XAxis, StackedBarChart } from 'react-native-svg-charts'
let moment = require('moment');

const HourlyBarChart = (props) => {
  const keys = ['temp', 'humidity', 'clouds']
  const colors = ['rgba(50,100,200,0.8)', 'rgba(50,100,200,0.5)', 'rgba(50,100,200,0.3)']
  const CUT_OFF = 10
  const TempLabels = ({ x, y, bandwidth, data }) => (
    props.data.map((item, index) => (
      <Text
        key={ index }
        x={ x(index) + (bandwidth / 2) }
        y={ item.temp < CUT_OFF ? y(item.temp) - 5 : y(item.temp) + 10 }
        fontSize={11}
        fill={'#fff'}
        alignmentBaseline={ 'middle' }
        textAnchor={ 'middle' }
      >
        {Math.round(item.temp * 10)/10}
      </Text>
    ))
  )

  const HumidityLabels = ({ x, y, bandwidth, data }) => (
    props.data.map((item, index) => (
      <Text
        key={ index }
        x={ x(index) + (bandwidth / 2) }
        y={ item.humidity+item.temp < CUT_OFF ? y(item.humidity+item.temp) - 5 : y(item.humidity+item.temp) + 15 }
        fontSize={11}
        fill={'#fff'}
        alignmentBaseline={ 'middle' }
        textAnchor={ 'middle' }
      >
        {Math.round(item.humidity * 10) / 10 }
      </Text>
    ))
  )

  const CloudsLabels = ({ x, y, bandwidth, data }) => (
    props.data.map((item, index) => (
      <Text
        key={ index }
        x={ x(index) + (bandwidth / 2) }
        y={ item.humidity+item.temp+item.clouds < CUT_OFF ? y(item.humidity+item.temp+item.clouds) - 5 : y(item.humidity+item.temp+item.clouds) + 15 }
        fontSize={11}
        fill={'#fff'}
        alignmentBaseline={ 'middle' }
        textAnchor={ 'middle' }
      >
        {Math.round(item.clouds * 10) / 10 }
      </Text>
    ))
  )

  function labelsXaxis(idx) {
    return(
      String(moment.unix(props.data[idx].dt, 'X').format('hh a'))
    )
  }

  return (
    <View style={{width: 2000, height: 250, marginRight: 30}}>
      <StackedBarChart
        style={{ height: 210 }}
        keys={keys}
        colors={colors}
        data={props.data}
        showGrid={false}
        contentInset={{ top: 25, bottom: 10 }}
      >
        <CloudsLabels/>
        <HumidityLabels/>
        <TempLabels/>
      </StackedBarChart>
      <XAxis
        data={props.data}
        svg={{
          fill: '#000',
          fontSize: 8,
          fontWeight: 'bold',
        }}
        style={{ width: 2000 }}
        contentInset={{ left: 20, right: 20 }}
        formatLabel={(value, index) => labelsXaxis(index)}
      />
    </View>
  );
};

export default HourlyBarChart;
