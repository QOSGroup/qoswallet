//
//  ViewController.swift
//  NativeEmbedRN
//
//  Created by Wanghao on 2018/10/12.
//  Copyright © 2018年 qos. All rights reserved.
//

import UIKit
import Alamofire

class ViewController: UIViewController {
    
    //原生与RN桥接
    private var reactNativeBridge: ReactNativeBridge!
    //进度条
    private var progressBar: UIProgressView!
    //下载文件保存路径
    private var destination: String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        let btn1 = UIButton.init()
        btn1.frame = CGRect.init(x: 0, y: 0, width: 60, height: 30)
        btn1.tag = 1
        btn1.center = self.view.center
        btn1.setTitle("星云", for: .normal)
        btn1.titleLabel?.font = UIFont.systemFont(ofSize: 16)
        btn1.setTitleColor(UIColor.blue, for: .normal)
        
        let btn2 = UIButton.init()
        btn2.frame = CGRect.init(x: btn1.frame.origin.x, y: btn1.frame.origin.y + btn1.frame.size.height + 40, width: 60, height: 30)
        btn1.tag = 2
        btn2.setTitle("腾讯", for: .normal)
        btn2.titleLabel?.font = UIFont.systemFont(ofSize: 16)
        btn2.setTitleColor(UIColor.blue, for: .normal)
        
        btn1.addTarget(self, action: #selector(touchBtn(btn:)), for: .touchUpInside)
        btn2.addTarget(self, action: #selector(touchBtn(btn:)), for: .touchUpInside)
        
        view.addSubview(btn1)
        view.addSubview(btn2)
        
//        progressBar = UIProgressView.init(frame: CGRect.init(x: 0, y: 100, width: view.frame.size.width, height: 2))
//        progressBar.progressViewStyle = .default
//        progressBar.backgroundColor = .lightGray
//        view.addSubview(progressBar)
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @objc func touchBtn(btn: UIButton) {
        if btn.tag == 1 {
            
        }else {
            
        }
        if reactNativeBridge == nil {
            reactNativeBridge = ReactNativeBridge()
        }
        let vc = ReactViewController(moduleName: "RNHighScores", bridge: reactNativeBridge!.bridge)
        self.present(vc, animated: true, completion: nil)
    }
    
    func downloadJSBundle() {
        Alamofire.request("http://192.168.168.46:9000/", method: .get, parameters: nil, encoding: URLEncoding.default, headers: nil).responseJSON { (response) in
            if(response.error == nil){
                print("请求成功")
                print(response.result.value as Any)
            }else{
                print("请求失败\(String(describing: response.error))")
            }
            
        }
    }
}

