import React from 'react'
import { AppRegistry } from 'react-native'
import Component from './src/components/base'
import RootStack from './app/main'


class QOSWallet extends Component {
  render() {
    return <RootStack />;
  }
}

// 注册组件
AppRegistry.registerComponent('QOSWallet', () => QOSWallet);

