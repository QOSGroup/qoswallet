//
//  ReactViewController.swift
//  qoswallet
//
//  Created by Wanghao on 2018/10/12.
//  Copyright © 2018年 qos. All rights reserved.
//

import UIKit
import React

class ReactViewController: UIViewController {
    
    private var jsCodeLocation: NSURL?
    
    
    init(moduleName: String, bridge: RCTBridge) {
        super.init(nibName: nil, bundle: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(disMissController), name: NSNotification.Name(rawValue:"backToViewController"), object: nil)
        
        let mockData:NSDictionary = ["scores":
            [
                ["name":"Alex", "value":"42"],
                ["name":"Joel", "value":"10"]
            ]
        ]
        
        let rootView = RCTRootView(bridge: bridge,
                           moduleName: moduleName,
                           initialProperties: nil)
        rootView?.appProperties = mockData as? [AnyHashable : Any]
        view = rootView
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    @objc func disMissController(nofi: Notification) {
        self.dismiss(animated: true, completion: nil)
    }
    
    deinit {
        self.view = nil
        NotificationCenter.default.removeObserver(self)
    }
}
