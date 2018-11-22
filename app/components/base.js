import React from 'react'

import { NativeModules, Platform, Dimensions } from 'react-native'
const { StatusBarManager } = NativeModules;
import { Header } from 'react-navigation'
import assets from '../assets'

const RNBridgeModule = NativeModules.RNBridgeModule

export default class BaseComponent extends React.Component {

    constructor(props) {
        super(props)
        this.assets = assets
        this.HEADER_HEIGHT = Header.HEIGHT
        this.STATUSBAR_HEIGHT = this.getStatusBarHeight()
    }

    /**
     * 返回钱包主页
     */
    backToWallet() {
        RNBridgeModule.backToViewController()
    }

    isIphoneX() {
        let screenW = Dimensions.get('window').width;
        let screenH = Dimensions.get('window').height;
        // iPhoneX
        const X_WIDTH = 375;
        const X_HEIGHT = 812;
        return (
            Platform.OS === 'ios' &&
            ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
                (screenH === X_WIDTH && screenW === X_HEIGHT))
        )
    }

    getStatusBarHeight() {
        if (this.isIphoneX()) {
            return 44;
        } else if (Platform.OS === 'ios') {
            return 20
        } else {
            return StatusBarManager.HEIGHT
        }
    }

}