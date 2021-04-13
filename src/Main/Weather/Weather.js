import React, {Component} from 'react';
import { View, Text, Image, PermissionsAndroid, ScrollView, RefreshControl, ToastAndroid } from "react-native";
import * as _ from 'lodash';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { Divider, LoadingIndicator } from '../../Components';
import Parameter from './Component/Parameter';
import HourlyBarChart from './Component/HourlyBarChart';
import styles from './WeatherStyles';
import { getCurrentWeather, getWeatherOneCall } from '../../Redux/Actions/WeatherActions';
import { apiConfig } from '../../Core/Settings';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import { Table, Row } from 'react-native-table-component';
const moment = require('moment');

const mapStateToProps = (state) => {
  return {
    weather: state.weatherReducer.weather,
    hourlyWeather: state.weatherReducer.hourlyWeather,
    loading: state.weatherReducer.loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    getCurrentWeatherData : (params) => {
      return dispatch(getCurrentWeather(params)).then((res) => Promise.resolve(res))
    },

    getWeatherOneCallData : (params) => {
      return dispatch(getWeatherOneCall(params)).then((res) => Promise.resolve(res))
    },
  }
}

class Weather extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      refreshing: false,
      
      today: moment(new Date()).format('ddd DD-MM-YYYY'),
      locationStatus: '',
      hourlyData: [],

      tableHead: ['Date', 'Clouds', 'Humidity', 'Wind Speed', 'Temp'],
      widthArr: [120, 60, 60, 70, 60],
      tableData: []
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    this.getPermission()
  }

  async getPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(info => {
          let params = {
            lat: info.coords.latitude,
            lon: info.coords.longitude,
            appid: apiConfig.apiKeyOpenWeatherMap,
            units: 'metric',
          }

          Promise.all([this.props.getWeatherOneCallData(params), this.props.getCurrentWeatherData(params)])
          .then(([oneCallDataResponse, currentWeatherResponse]) => {
            console.log('ONE', oneCallDataResponse)
            let daily = oneCallDataResponse.daily;
            let dataArr = [];
            for (let index = 0; index < daily.length; index++) {
              let newArr = [];
              newArr.push(moment.unix(daily[index].dt, 'X').format('ddd DD-MM-YYYY'))
              newArr.push(Math.round(daily[index].clouds * 10) / 10)
              newArr.push(Math.round(daily[index].humidity * 10) / 10)
              newArr.push(Math.round(daily[index].wind_speed * 10) / 10)
              newArr.push(Math.round(daily[index].temp.day * 10) / 10)
              dataArr.push(newArr)
            }

            this.setState({
              loading: false,
              refreshing: false,
              tableData: dataArr
            })
          }).catch((err) => {
            this.setState({
              loading: false,
              refreshing: false,
            })
          })
        });
      } else {
        this.setState({
          locationStatus: "Permission denied",
          loading: false,
          refreshing: false,
        })
      }
    } catch (err) {
      ToastAndroid.show('Something wrong', ToastAndroid.SHORT)
    }
  }

  render() {
    return(
      <ScrollView
        nestedScrollEnabled={true}
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({ refreshing: true }, () => {
                this.getPermission()
              });
            }}
          />
        }
      >
        <View style={styles.contentContainer}>
          {
            this.state.loading ? <LoadingIndicator color={'#fff'} text={'Loading current data weather'}/> :
            <>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <View style={{position: 'absolute', left: 0, top: 0, maxWidth: 100}}>
                  <Text style={{fontSize: 12, color: '#fff'}}>
                    Current Weather
                  </Text>
                  <Text style={{fontSize: 11, color: '#000'}}>
                    {this.state.today}
                  </Text>
                </View>
                <IconMI
                  name='location-pin'
                  size={24}
                  color={'#000'}
                  style={{marginRight: 10}}
                />
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center'}}>
                  {_.get(this.props,'weather.name')}
                </Text>
              </View>
              
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Parameter
                  value={Math.round(_.get(this.props,'weather.main.temp') * 10) / 10 }
                  unit={`\u00b0C`}
                  title={'Temperature'}
                />
                <Image
                  style={{width: 100, height: 100, resizeMode: 'contain', flex: 1}}
                  source={{uri: `${apiConfig.baseImageUrl}${_.get(this.props,'weather.weather[0].icon')}@2x.png`}}/>

                <Text style={{fontSize: 15, color: '#000', fontWeight:'bold', textAlign: 'center', flex: 1, textTransform: 'capitalize'}}>
                  {_.get(this.props,'weather.weather[0].description')}
                </Text>
              </View>

              <Divider height={1}/>

              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 13}}>
                <Parameter
                  value={Math.round(_.get(this.props,'weather.wind.speed') * 10) / 10 }
                  unit={'m/sec'}
                  title={'Wind Speed'}
                />
                <Parameter
                  value={Math.round(_.get(this.props,'weather.clouds.all') * 10) / 10 }
                  unit={'%'}
                  title={'Clouds'}
                />
                <Parameter
                  value={Math.round(_.get(this.props,'weather.main.humidity') * 10) / 10 }
                  unit={'%'}
                  title={'Humidity'}
                />
              </View>
            </>
          }
          
        </View>

        <ScrollView
          horizontal
          style={[styles.contentContainer, {paddingVertical: 0}]}>
          {
            this.state.loading ? <LoadingIndicator color={'#fff'} text={'Loading hourly data weather'}/> :
            <>
              <Text style={styles.titleContent}>
                Hourly
              </Text>
              {
                _.get(this.props,'hourlyWeather.hourly') &&
                <HourlyBarChart
                  data={_.get(this.props,'hourlyWeather.hourly')}
                />
              }
              <View style={styles.infoContainer}>
                <View style={styles.infoTextContainer}>
                  <View style={[styles.indicator, {backgroundColor: 'rgba(50,100,200,0.8)'}]}/>
                  <Text style={{fontSize: 11, color: '#fff'}}>
                    {'Temperature (\u00b0C)'}
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <View style={[styles.indicator, {backgroundColor: 'rgba(50,100,200,0.5)'}]}/>
                  <Text style={{fontSize: 11, color: '#fff'}}>
                    {('Humidity (%)')}
                  </Text>
                </View>
                <View style={styles.infoTextContainer}>
                  <View style={[styles.indicator, {backgroundColor: 'rgba(50,100,200,0.3)'}]}/>
                  <Text style={{fontSize: 11, color: '#fff'}}>
                    {('Clouds (%)')}
                  </Text>
                </View>
              </View>
            </>
          }
        </ScrollView>

        <ScrollView
          horizontal={true}
          style={[styles.contentContainer, {marginBottom: 70, padding: 0}]}>
          {
            this.state.loading ? <LoadingIndicator color={'#fff'} text={'Loading daily data weather'}/> :
            <View style={{backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10}}>
              <Table>
                <Row
                  data={this.state.tableHead}
                  widthArr={this.state.widthArr}
                  style={styles.tableHeader}
                  textStyle={styles.tableHeaderTitle}
                />
              </Table>
              {
                _.get(this.state,'tableData').length > 0 ?
                <ScrollView nestedScrollEnabled style={{marginTop: -1}}>
                  <Table style={{backgroundColor: '#E7E6E1', borderRadius: 10}}>
                    {
                      _.get(this.state,'tableData').map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={this.state.widthArr}
                          style={[{height: 40, backgroundColor: '#E7E6E1'}, index%2 && {backgroundColor: '#F7F6E7'}]}
                          textStyle={{textAlign: 'center', fontWeight: '100'}}
                        />
                      ))
                    }
                  </Table>
                </ScrollView>
                :
                <View style={styles.noDataContainer}>
                  <Text style={{color: 'grey', fontSize: 13}}>
                    No data available
                  </Text>
                </View>
              }
            </View>
          }
        </ScrollView>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);