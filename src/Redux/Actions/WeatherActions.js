export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER';
export const GET_HOURLY_WEATHER = 'GET_HOURLY_WEATHER';

import Axios from 'axios';
import { apiConfig } from '../../Core/Settings';

export function getCurrentWeather(params) {
  return function (dispatch) {
    return Axios.get(`${apiConfig.baseUrl}weather`, {params: params})
    .then((res) => {
      dispatch({
        type: GET_CURRENT_WEATHER,
        weather: res.data,
        loading: false
      });
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      dispatch({
        type: GET_CURRENT_WEATHER,
        weather: null,
        loading: false
      });
      return Promise.reject(err)
    })
  }
}

export function getWeatherOneCall(params) {
  return function (dispatch) {
    return Axios.get(`${apiConfig.baseUrl}onecall`, {params: params})
    .then((res) => {
      dispatch({
        type: GET_HOURLY_WEATHER,
        hourlyWeather: res.data,
        loading: false
      });
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      dispatch({
        type: GET_HOURLY_WEATHER,
        hourlyWeather: null,
        loading: false
      });
      return Promise.reject(err)
    })
  }
}