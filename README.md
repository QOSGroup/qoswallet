# qoswallet
qoswallet

# 目标
集成RN应用，参考文档：[RN 集成到现有原生应用](https://reactnative.cn/docs/integration-with-existing-apps/)  

集成H5应用

# RN版本
0.57.2

# RN当前可用组件
react-navigation
react-native-qrcode-svg
react-native-vector-icons

# 目录介绍
```
.  
├── android // Native Code  
├── ios // Native Code  
├── app // 钱包前端RN JS   
│   ├── components  
│   ├── images  
│   ├── main.js  
│   ├── pages  
│   └── route  
├── bundle // RN离线包输出目录  
│   ├── android  
│   │   ├── app // 子应用输出目录  
│   │   └── wallet // 钱包输出目录  
│   └── ios  
│       ├── app // 子应用输出目录  
│       └── wallet // 钱包输出目录  
├── src // 子应用前端RN JS  
│   ├── components  
│   │   ├── base.js  
│   │   └── home  
│   ├── images  
│   │   └── common  
│   ├── main.js  
│   ├── modals  
│   │   └── about.js  
│   ├── pages  
│   │   ├── detail.js  
│   │   ├── home.js  
│   │   ├── setting.js  
│   │   └── settingdetail.js  
│   └── route.js  
├── index.js // RN开发入口  
├── build.js // RN子应用打包入口  
├── wallet.js // 钱包打包入口  
├── package.json  
├── LICENSE  
├── README.md  
└── yarn.lock  
<<<<<<< HEAD
```
=======
>>>>>>> master

# 开发子应用目录
src/

# Bash
```
RN:
安装依赖：
    yarn install

打RN离线包：
    npm run build

IOS:
    cd ios/
    pod install
    cd ..
    react-native run-ios
```
