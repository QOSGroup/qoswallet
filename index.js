import React from 'react'
import { AppRegistry } from 'react-native'
import Component from './src/components/base'
import RootStack from './src/route'

class QOSWallet extends Component {
  render() {
    return <RootStack />;
  }
}

// 整体js模块的名称
AppRegistry.registerComponent("qosexample", () => QOSWallet);
