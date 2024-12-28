/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * EntryAbility类是应用程序的入口能力类
 * 功能:
 * - 应用生命周期管理
 * - 权限请求处理
 * - 窗口创建与管理
 * - 云函数预加载
 */

import { abilityAccessCtrl, AbilityConstant, PermissionRequestResult, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';
import auth from '@hw-agconnect/auth';
import { buffer } from '@kit.ArkTS';
import { BusinessError } from '@kit.BasicServicesKit';
import { WindowUtils } from '../utils/WindowUtils';
import { AppConfig } from '../utils/AppConfig';
import { cloudFunction } from '@kit.CloudFoundationKit';

export default class EntryAbility extends UIAbility {

  functionPreload() {
    let promise = cloudFunction.call({
      name: "preload", // 预加载缓存数据的云函数名称
      timeout: 3 * 1000, // 获取缓存数据的超时时间
      loadMode: cloudFunction.LoadMode.PRELOAD   // 获取缓存数据必须设置为PRELOAD
    });
    promise.then((data: cloudFunction.FunctionResult) => { // 接口调用成功处理缓存的应用数据
      hilog.info(0x0000, 'testTag', 'get preload cache successfully');
      let getStr = data.result; // data.result即是缓存的应用数据
      // todo 处理getStr
      hilog.info(0x0000, 'testTag', JSON.stringify(getStr));
      this.functionPreloadConfig(getStr);
    }).catch((err: Error) => {
      hilog.error(0x0000, 'testTag', 'fail to get preload cache: %{public}s', err.message);
      hilog.error(0x0000, 'testTag', 'fail to get preload cache: %{public}s', err.name);
      hilog.error(0x0000, 'testTag', 'fail to get preload cache: %{public}s', err.stack);
      this.functionNormal(); // 使用普通方式获取应用数据
    })
  }

  functionNormal() {
    hilog.info(0x0000, 'testTag', 'promise start');
    let promise = cloudFunction.call({
      name: "preload",
      timeout: 5 * 1000,
      loadMode: cloudFunction.LoadMode.NORMAL    // 默认为NORMAL, 接口会调用云函数从云服务器获取应用数据
    });
    promise.then((data: cloudFunction.FunctionResult) => {
      hilog.info(0x0000, 'testTag', 'call function successfully');
      let getStr = data.result; // data.result即是缓存的应用数据
      // todo 处理getStr
      hilog.info(0x0000, 'testTag', JSON.stringify(getStr));

      this.functionPreloadConfig(getStr);
    }).catch((err: Error) => {
      hilog.info(0x0000, 'testTag', 'fail to call function: %{public}s', err.message);
    })
  }

  functionPreloadConfig(json:ESObject ) {
    AppConfig.cloudBasePath = json.cloudBasePath;
    AppConfig.isDefaultData = json.isDefaultData;
    hilog.info(0x0000, 'testTag', 'functionPreloadConfig: %{public}s', JSON.stringify(json));
  }

  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    this.functionPreload();
    let file = this.context.resourceManager.getRawFileContentSync('agconnect-services.json');
    let json: string = buffer.from(file.buffer).toString();
    auth.init(this.context, json);

    let AtManager = abilityAccessCtrl.createAtManager();
    AtManager.requestPermissionsFromUser(this.context, ['ohos.permission.READ_MEDIA', 'ohos.permission.MEDIA_LOCATION'])
      .then((data: PermissionRequestResult) => {
        hilog.info(0x0000, 'testTag', '%{public}s', 'request permissions from user success' + data);
      })
      .catch((err: Object) => {
        hilog.error(0x0000, 'testTag', 'Failed to request permissions from user. Cause: %{public}s',
          JSON.stringify(err) ?? '');
      });
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');

  }

  onDestroy(): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
        // 获取窗口宽高
    WindowUtils.window = windowStage.getMainWindowSync();
    WindowUtils.windowWidth_px = WindowUtils.window.getWindowProperties().windowRect.width;
    WindowUtils.windowHeight_px = WindowUtils.window.getWindowProperties().windowRect.height;
    // 获取上方避让区(状态栏等)高度
    let avoidArea = WindowUtils.window.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
    WindowUtils.topAvoidAreaHeight_px = avoidArea.topRect.height;
    // 获取导航条高度
    let navigationArea = WindowUtils.window.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
    WindowUtils.navigationIndicatorHeight_px = navigationArea.bottomRect.height;
    //     let windowClass: window.Window | null = null;
    // windowStage.getMainWindow((err: BusinessError, data) => {
    //   let errCode: number = err.code;
    //   if (errCode) {
    //     console.error('Failed to obtain the main window. Cause: ' + JSON.stringify(err));
    //     return;
    //   }
    //   windowClass = data;
    //   console.info('Succeeded in obtaining the main window. Data: ' + JSON.stringify(data));
    //   // 2.实现沉浸式效果。方式二：设置窗口为全屏布局，配合设置导航栏、状态栏的透明度、背景/文字颜色及高亮图标等属性，与主窗口显示保持协调一致。
    //   let isLayoutFullScreen = true;
    //   windowClass.setWindowLayoutFullScreen(isLayoutFullScreen)
    //     .then(() => {
    //       console.info('Succeeded in setting the window layout to full-screen mode.');
    //     })
    //     .catch((err: BusinessError) => {
    //       console.error('Failed to set the window layout to full-screen mode. Cause:' + JSON.stringify(err));
    //     });
    //   let sysBarProps: window.SystemBarProperties = {
    //     statusBarColor: '#e6f8d5',
    //     // navigationBarColor: '#44d7b6',
    //     // 以下两个属性从API Version 8开始支持
    //     // statusBarContentColor: '#ffffff',
    //     // navigationBarContentColor: '#44d7b6'
    //   };
    //   windowClass.setWindowSystemBarProperties(sysBarProps)
    //     .then(() => {
    //       console.info('Succeeded in setting the system bar properties.');
    //     })
    //     .catch((err: BusinessError) => {
    //       console.error('Failed to set the system bar properties. Cause: ' + JSON.stringify(err));
    //     });
    //
    // })
    let windowClass=windowStage.getMainWindowSync();
    


    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
    });
  }

  onWindowStageDestroy(): void {
    // Main window is destroyed, release UI related resources
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    // Ability has brought to foreground
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
  }

  onBackground(): void {
    // Ability has back to background
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
  }
}
