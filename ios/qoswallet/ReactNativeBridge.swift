//
//  ReactNativeBridge.swift
//  qoswallet
//
//  Created by Wanghao on 2018/10/15.
//  Copyright © 2018年 qos. All rights reserved.
//

import UIKit

class ReactNativeBridge {
    
    let bridge: RCTBridge
    
    init() {
        bridge = RCTBridge(delegate: ReactNativeBridgeDelegate(), launchOptions: nil)
    }
}

class ReactNativeBridgeDelegate: NSObject, RCTBridgeDelegate {
    
    func sourceURL(for bridge: RCTBridge!) -> URL! {
    #if DEBUG
        return URL(string: RN_SOURCE_URL_LOCAL)
    #else
        return URL(string: sourcePath)
    #endif
    }
}
