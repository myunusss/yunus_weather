import { GET_CURRENT_WEATHER, GET_HOURLY_WEATHER } from '../Actions/WeatherActions';

let dataState = {
  weather: [],
  hourlyWeather: [],
  loading: true
};

export const weatherReducer = (state = dataState, action) => {
  
  switch(action.type){
    case GET_CURRENT_WEATHER:
      state = Object.assign({}, state, { weather: action.weather, loading: action.loading });
      return state;
      break;

    case GET_HOURLY_WEATHER:
      state = Object.assign({}, state, { hourlyWeather: action.hourlyWeather, loading: action.loading });
      return state;
      break;

    default:
      return state;
  }
}