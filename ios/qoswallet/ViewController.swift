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
    private var downloadUrl: String?
    //解压文件名
    private var fileName: String?
    //读取配置文件
    private var configureData: NSArray?
    //当前配置
    private var currentConfigure: NSDictionary?
    //moduleName名
    private var moduleName: String?
    //读取本地配置文件
    private var loaclConfigureData: NSDictionary?
    //账户
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        #if DEBUG
        loadLocalModuleConfigure()
        print("DEBUG模式")
        #else
        requestConfigure()
        print("Release模式")
        #endif
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func initUI() {
        
        for (index, value) in (configureData?.enumerated())! {
            let dic = value as! NSDictionary

            let btn1 = UIButton.init()
            btn1.frame = CGRect.init(x: Int((kScreenW-100)/2), y: 200+index*60, width: 100, height: 30)
            btn1.tag = index
            btn1.setTitle((dic.object(forKey: "title") as! String), for: .normal)
            btn1.titleLabel?.font = UIFont.systemFont(ofSize: 16)
            btn1.setTitleColor(UIColor.blue, for: .normal)
            btn1.addTarget(self, action: #selector(touchBtn(btn:)), for: .touchUpInside)
            view.addSubview(btn1)
            
            let progressBar = UIProgressView.init(frame: CGRect.init(x: 20, y: 28, width: 60, height: 2))
            progressBar.tag = 100
            progressBar.alpha = 0.5
            progressBar.progressViewStyle = .default
            progressBar.backgroundColor = .lightGray
            btn1.addSubview(progressBar)
        }
    }
    
    func initLoacalUI() {
        let btn1 = UIButton.init()
        btn1.frame = CGRect.init(x: Int((kScreenW-100)/2), y: 200, width: 100, height: 30)
        btn1.tag = 100
        btn1.setTitle(self.loaclConfigureData!["title"] as? String, for: .normal)
        btn1.titleLabel?.font = UIFont.systemFont(ofSize: 16)
        btn1.setTitleColor(UIColor.blue, for: .normal)
        btn1.addTarget(self, action: #selector(touchBtn(btn:)), for: .touchUpInside)
        view.addSubview(btn1)
    }
    
    @objc func touchBtn(btn: UIButton) {
        if btn.tag == 100 {
            loadRNRootView()
            return
        }
        self.currentConfigure = (self.configureData?.object(at: btn.tag) as! NSDictionary)
        let fileName = (self.currentConfigure!["url"] as! NSString).lastPathComponent
        let filePath = documentPath + (fileName as NSString?)!.deletingPathExtension
        self.moduleName = self.currentConfigure?["name"] as? String
        self.progressBar = (btn.viewWithTag(100) as! UIProgressView)
        self.downloadUrl = self.currentConfigure?["url"] as? String
        loadSourcePath(fileName: fileName)
        if FileManager.default.fileExists(atPath: filePath) {
            loadRNRootView()
        } else {
            downloadJSBundle()
        }
    }
}

extension ViewController {
    
    //加载本地Module配置文件
    func loadLocalModuleConfigure() {
        let plistPath = Bundle.main.path(forResource: "localModuleConfig", ofType: "plist")
        self.loaclConfigureData = NSDictionary.init(contentsOfFile: plistPath!)
        self.moduleName = self.loaclConfigureData!["name"] as? String
        initLoacalUI()
    }
    
    //组装源文件路径
    func loadSourcePath(fileName: String) {
        let a = fileName as NSString?
        sourcePath = documentPath + (a?.deletingPathExtension)! + "/index.ios.jsbundle"
    }
    
    //加载RNRootView
    func loadRNRootView() {
        #if DEBUG
        if reactNativeBridge == nil {
            reactNativeBridge = ReactNativeBridge()
        }
        #else
        reactNativeBridge = nil
        reactNativeBridge = ReactNativeBridge()
        #endif
        let vc = ReactViewController(moduleName: self.moduleName!, bridge: reactNativeBridge!.bridge)
        self.present(vc, animated: true, completion: nil)
    }
    
    //下载JSBundle
    func downloadJSBundle() {
        //下载的进度条显示
        Alamofire.download(self.downloadUrl!).downloadProgress(queue: DispatchQueue.main) { (progress) in
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
        
        self.downloadRequest = Alamofire.download(self.downloadUrl!, to: self.destination)
        
        self.downloadRequest.responseData(completionHandler: downloadResponse)
    }
    
    //根据下载状态处理
    func downloadResponse(response:DownloadResponse<Data>){
        switch response.result {
        case .success:
            print("下载完成")
            //解压
            let sourcePath = documentPath + self.fileName!
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
                self.initUI()
            }else{
                print("请求失败\(String(describing: response.error))")
            }
            
        }
    }
}
