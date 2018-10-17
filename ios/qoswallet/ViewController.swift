//
//  ViewController.swift
//  qoswallet
//
//  Created by Wanghao on 2018/10/12.
//  Copyright © 2018年 qos. All rights reserved.
//

import UIKit
import Alamofire
import SSZipArchive

class ViewController: UIViewController {
    
    //原生与RN桥接
    private var reactNativeBridge: ReactNativeBridge!
    //进度条
    private var progressBar: UIProgressView!
    //下载文件保存路径
    private var destination: DownloadRequest.DownloadFileDestination!
    //下载请求对象
    private var downloadRequest:DownloadRequest!
    //暂停下载,保存已下载的部分
    private var cancelledData : Data?
    //下载路径
    private var downloadUrl = baseServerUrl + "ios.starcloud.zip"
    //解压文件名
    private var fileName: String?
    //读取配置文件
    private var configureData: NSArray?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        requestConfigure()
        
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
        btn2.setTitle("下载", for: .normal)
        btn2.titleLabel?.font = UIFont.systemFont(ofSize: 16)
        btn2.setTitleColor(UIColor.blue, for: .normal)
        
        btn1.addTarget(self, action: #selector(touchBtn(btn:)), for: .touchUpInside)
        btn2.addTarget(self, action: #selector(touchBtn(btn:)), for: .touchUpInside)
        
        view.addSubview(btn1)
        view.addSubview(btn2)
        
        progressBar = UIProgressView.init(frame: CGRect.init(x: 0, y: 28, width: 60, height: 2))
        progressBar.alpha = 0.5
        progressBar.progressViewStyle = .default
        progressBar.backgroundColor = .lightGray
        btn2.addSubview(progressBar)
    }
    
//    func initUI() {
//        for i in 0...self.configureData?.count {
//
//        }
//    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @objc func touchBtn(btn: UIButton) {
        if FileManager.default.fileExists(atPath: sourcePath) {
            loadRNRootView()
        } else {
            downloadJSBundle()
        }
    }
    
    func loadRNRootView() {
        if reactNativeBridge == nil {
            reactNativeBridge = ReactNativeBridge()
        }
        let vc = ReactViewController(moduleName: "RNHighScores", bridge: reactNativeBridge!.bridge)
        self.present(vc, animated: true, completion: nil)
    }
    
    func downloadJSBundle() {
        //下载的进度条显示
        Alamofire.download(downloadUrl).downloadProgress(queue: DispatchQueue.main) { (progress) in
            self.progressBar.setProgress(Float(progress.fractionCompleted), animated: true)//下载进度条
        }
        
        //下载存储路径
        self.destination = {_,response in
            let documentsUrl = FileManager.default.urls(for: .documentDirectory, in: FileManager.SearchPathDomainMask.userDomainMask).first
            let fileUrl = documentsUrl?.appendingPathComponent(response.suggestedFilename!)
            print(fileUrl as Any)
            self.fileName = response.suggestedFilename!
            return (fileUrl!,[.removePreviousFile, .createIntermediateDirectories] )
        }
        
        self.downloadRequest = Alamofire.download(downloadUrl, to: self.destination)
        
        self.downloadRequest.responseData(completionHandler: downloadResponse)
    }
    
    //根据下载状态处理
    func downloadResponse(response:DownloadResponse<Data>){
        switch response.result {
        case .success:
            print("下载完成")
            //解压
            let documentPath = NSHomeDirectory() + "/Documents"
            let sourcePath = documentPath + "/" + self.fileName!
            let isSuccess = SSZipArchive.unzipFile(atPath: sourcePath, toDestination: documentPath)
            print("解压结果:\(isSuccess)")
            if isSuccess {
                loadRNRootView()
            }
        case .failure:
            //意外停止的话,把已下载的数据存储起来
            self.cancelledData = response.resumeData
        }
    }
    
    //请求配置文件
    func requestConfigure() {
        let url = baseServerUrl + configure
        Alamofire.request(url, method: .get, parameters: nil, encoding: URLEncoding.default, headers: nil).responseJSON { (response) in
            if(response.error == nil){
                print("请求成功")
                print(response.result.value as Any)
                self.configureData = (response.result.value as! NSArray)
            }else{
                print("请求失败\(String(describing: response.error))")
            }
            
        }
    }
}

