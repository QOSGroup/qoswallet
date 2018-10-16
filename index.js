import React from "react";
import { AppRegistry } from "react-native";

import { createStackNavigator } from 'react-navigation';


import HomeScreen from './src/home'
import DetailsScreen from './src/detail'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);


class RNHighScores extends React.Component {
  render() {
    return <RootStack />;
  }
}

// 整体js模块的名称
AppRegistry.registerComponent("RNHighScores", () => RNHighScores);
