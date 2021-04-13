import React, {Component} from 'react';
import { View } from 'react-native';
import Digit from './Digit/Digit';
import Weather from './Weather/Weather';
import { CustomBottomBar } from '../Components';
import LinearGradient from 'react-native-linear-gradient';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      activeScreen: 'weather',
    }
  }

  onChangeTab(screen) {
    this.setState({activeScreen: screen})
  }

  render() {
    return(
      <LinearGradient
        style={{flex: 1}}
        colors={['#91d3f9', '#58bcf4', '#1995fb']}>
        {
          this.state.activeScreen === 'weather' ?
          <Weather/>
          :
          <Digit/>
        }
        <CustomBottomBar
          screen={this.state.activeScreen}
          onChange={this.onChangeTab.bind(this)}
        />
      </LinearGradient>
    )
  }
}

export default Home;