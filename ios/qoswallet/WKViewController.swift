//
//  WKViewController.swift
//  StarCloud
//
//  Created by Wanghao on 2018/9/27.
//  Copyright © 2018年 sessionCh. All rights reserved.
//

import UIKit
import WebKit
import WKWebViewJavascriptBridge

typealias ObserveBlock = ()->();

class WKViewController: UIViewController, WKUIDelegate {
//    let webView = WKWebView(frame: CGRect(), configuration: WKWebViewConfiguration())
    var bridge: WKWebViewJavascriptBridge!
    let callbackBtn = UIButton(type: .custom)
    let reloadBtn = UIButton(type: .custom)
    
    private var _url : String?
    var url : String? {
        set {
            _url = newValue
            if newValue == nil {return}
            let request = URLRequest(url: NSURL.init(string: newValue!)! as URL)
            self.webView.load(request)
        }
        get {
            return _url
        }
    }
    
    /// 添加进度条
    lazy private var progressView: UIProgressView = {
        self.progressView = UIProgressView.init(frame: CGRect(x: CGFloat(0), y: 0, width: UIScreen.main.bounds.width, height: 2))
        self.progressView.tintColor = UIColor.green      // 进度条颜色
        self.progressView.trackTintColor = UIColor.white // 进度条背景色
        return self.progressView
    }()
    
    lazy var webView: WKWebView = {
        let webView = WKWebView.init(frame: view.bounds)
        webView.scrollView.bounces = false
        webView.uiDelegate = self as? WKUIDelegate
        webView.navigationDelegate = self
        view.addSubview(webView)
        view.addSubview(self.progressView)
        view.bringSubview(toFront: self.progressView) // 将进度条至于最顶层
        webView.addObserver(self, forKeyPath: "estimatedProgress", options: .new, context: nil)
        return webView
    }()
    
    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        //  加载进度条
        if keyPath == "estimatedProgress"{
            progressView.alpha = 1.0
            print(self.webView.estimatedProgress)
            progressView.setProgress(Float((self.webView.estimatedProgress) ), animated: true)
            if (self.webView.estimatedProgress )  >= 1.0 {
                UIView.animate(withDuration: 0.3, delay: 0.1, options: .curveEaseOut, animations: {
                    self.progressView.alpha = 0
                }, completion: { (finish) in
                    self.progressView.setProgress(0.0, animated: false)
                })
            }
        }
    }
    
    deinit {
        self.webView.removeObserver(self, forKeyPath: "estimatedProgress")
        self.webView.uiDelegate = nil
        self.webView.navigationDelegate = nil
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // setup bridge
        bridge = WKWebViewJavascriptBridge(webView: self.webView)
        bridge.register(handlerName: "testiOSCallback") { (paramters, callback) in
            print("testiOSCallback called: \(String(describing: paramters))")
            callback?("Response from testiOSCallback")
        }
        bridge.call(handlerName: "testJavascriptHandler", data: ["foo": "before ready"], callback: nil)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        loadLocalPage()
    }
    
    func loadLocalPage() {
        enum LoadDemoPageError: Error {
            case nilPath
        }
        
        do {
            guard let pagePath = Bundle.main.path(forResource: "Demo", ofType: "html") else {
                throw LoadDemoPageError.nilPath
            }
            let pageHtml = try String(contentsOfFile: pagePath, encoding: .utf8)
            let baseURL = URL(fileURLWithPath: pagePath)
            webView.loadHTMLString(pageHtml, baseURL: baseURL)
        } catch LoadDemoPageError.nilPath {
            print(print("webView loadLocalPage error: pagePath is nil"))
        } catch let error {
            print("webView loadLocalPage error: \(error)")
        }
    }
    
    @objc func callHandler() {
        let data = ["greetingFromiOS": "Hi there, JS!"]
        bridge.call(handlerName: "testJavascriptHandler", data: data) { (response) in
            print("testJavascriptHandler responded: \(String(describing: response))")
        }
    }
    
    @objc func reloadWebView() {
        webView.reload()
    }
}

extension WKViewController: WKNavigationDelegate, UIWebViewDelegate {
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        print("webViewDidStartLoad")
    }
    
    func webView(_ webView: WKWebView, didFinishnavigation: WKNavigation!) {
        print("webViewDidFinishLoad")
    }
    
    func webViewDidClose(_ webView: WKWebView) {
        
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        
    }
}

extension WKViewController {
    /// 快速跳转设置
    class func showVC(formVC:UIViewController, url:String) {
        let vc = WKViewController()
        //vc.url = url
        formVC.navigationController?.pushViewController(vc, animated: true)
    }
}

