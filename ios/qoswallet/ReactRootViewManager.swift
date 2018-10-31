//
//  ReactRootViewManager.swift
//  qoswallet
//
//  Created by Wanghao on 2018/10/30.
//  Copyright © 2018年 qos. All rights reserved.
//

import UIKit
import React

class ReactRootViewManager: NSObject, RCTBridgeDelegate {
    
    /* 全局唯一的bridge */
    private var bridge: RCTBridge!
    private var rootViewMap: Dictionary<String, RCTRootView> = [:]
    
    /*
     * 获取单例
     */
    static let shared = ReactRootViewManager()
    private override init() {
        super.init()
        bridge = RCTBridge(delegate: self, launchOptions: nil)
    }
    
    // Optional
    func reset() {
        // Reset all properties to default value
    }
    
    //dealloc
    deinit {
        bridge.invalidate()
    }
    
    /*
     * 根据viewName预加载bundle文件
     * param:
     *     viewName RN界面名称
     *     initialProperty: 初始化参数
     */
    func preLoadRootViewWithName(viewName: String) {
        self.preLoadRootViewWithName(viewName: viewName, initialProperty:[:])
    }
    
    func preLoadRootViewWithName(viewName: String, initialProperty: Dictionary<String, String>) {
        if (self.rootViewMap[viewName] != nil) {
            return
        }
        // 由bridge创建rootView
        let rootView = RCTRootView(bridge: bridge,
                                   moduleName: viewName,
                                   initialProperties: initialProperty)
        self.rootViewMap[viewName] = rootView
    }
    
    /*
     * 根据viewName获取rootView
     * param:
     *     viewName RN界面名称
     *
     * return: 返回匹配的rootView
     */
    func rootViewWithName(viewName: String) -> RCTRootView {
        return self.rootViewMap[viewName]!
    }
    
    //RCTBridgeDelegate
    func sourceURL(for bridge: RCTBridge!) -> URL! {
        return RCTBundleURLProvider.sharedSettings()?.jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
//        #if DEBUG
//        return URL(string: RN_SOURCE_URL_LOCAL)
//        #else
//        return URL(string: sourcePath)
//        #endif
    }
}
