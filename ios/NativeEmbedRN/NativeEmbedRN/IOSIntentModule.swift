//
//  IOSIntentModule.swift
//  NativeEmbedRN
//
//  Created by Wanghao on 2018/10/15.
//  Copyright © 2018年 qos. All rights reserved.
//

import UIKit

@objc(RNBridgeModule)

class RNBridgeModule: NSObject {
    
    @objc func backToViewController() -> Void {
        
        print("backToViewController called swift")
        
        DispatchQueue.main.async {
            print("come back to main thread\(Thread.current)")
            NotificationCenter.default.post(name: NSNotification.Name("backToViewController"), object: self, userInfo: ["post":"RN"])
        }

    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
