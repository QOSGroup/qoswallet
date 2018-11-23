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
        this.screenW = Dimensions.get('window').width
        this.screenH = Dimensions.get('window').height
    }

    /**
     * 返回钱包主页
     */
    backToWallet() {
        RNBridgeModule.backToViewController()
    }

    isIphoneX() {
       
        // iPhoneX
        const X_WIDTH = 375;
        const X_HEIGHT = 812;
        return (
            Platform.OS === 'ios' &&
            ((this.screenH === X_HEIGHT && this.screenW === X_WIDTH) ||
                (this.screenH === X_WIDTH && this.screenW === X_HEIGHT))
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

    getScaleHeigth(height){
        return height * this.screenW / 750
    }
}