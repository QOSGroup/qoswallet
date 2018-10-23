import React from 'react'

import { NativeModules } from 'react-native'
const RNBridgeModule = NativeModules.RNBridgeModule

export default class BaseComponent extends React.Component {
    /**
     * 返回钱包主页
     */
    backToWallet() {
        RNBridgeModule.backToViewController()
    }
}