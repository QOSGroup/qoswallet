import React from 'react'
import { AppRegistry } from 'react-native'
import Component from './src/components/base'
import RootStack from './src/route'


class QOSWalletExample extends Component {
  render() {
    return <RootStack />;
  }
}

// 注册组件
AppRegistry.registerComponent('qosexample', () => QOSWalletExample);

