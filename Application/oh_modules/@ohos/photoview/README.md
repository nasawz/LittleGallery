# PhotoView

## 简介

>图片缩放浏览组件，图片可缩放，平移，旋转


## 旋转/缩放/平移
![img](screenshot/rotate.png)![img](screenshot/scale.png)![img](screenshot/translate.png)



## 下载安装
```shell
ohpm  install @ohos/photoview
```
OpenHarmony ohpm环境配置等更多内容，请参考 [如何安装OpenHarmony ohpm包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md) 。


## 使用说明

### 生成 PhotoView
   ```
   import {PhotoView} from '@ohos/photoview';
   ...
   //创建model对象
    @Local data: PhotoView.Model = new PhotoView.Model();
   
   //设置图片源
   aboutToAppear() {
   this.data
   .setImageResource($rawfile('wallpaper.jpg'))
   .setScale(1, false)
   .setImageFit(ImageFit.Contain)
   .setOnPhotoTapListener({
   onPhotoTap(x:number,y:number){
   }
   })
   }
   ...
   //使用PhotoView
   PhotoView({model: this.data})
   ```
## 接口说明   
1. 设置图片资源

   ```
   public setImageResource(src:Resource)
   public setImageURI(src: string)
   public setImageElement(src: PixelMap)
   ```
2. 设置图片是否可缩放
   ```
   public setZoomable(zoomable: boolean)
   ```
3. 设置旋转角度
   ```
   public setRotationTo(rotationDegree: number)
   public setRotationBy(rotationDegree: number)
   ```
4. 设置图片最大缩放比
   ```
   public setMaximumScale(maximumScale: number)
   ```
5. 设置图片最小缩放比
   ```
   public setMinimumScale(minimumScale: number)
   ```
6. 设置中间缩放比
   ```
   public setMediumScale(mediumScale: number)
   ```
7. 获取当前缩放比
   ```
   public getScale(): number
   ```
8. 单击监听器
   ```
   public setOnClickListener(listener: OnClickListener)
   ```
9. 长按监听器  
   ```
   public setOnLongClickListener(listener: OnLongPressListener)
   ```
10. 双击监听器  
    ```
    public setOnDoubleTapListener(onDoubleTapListener: OnDoubleTapListener)  \
    ```
11. matrix监听器
    ```
    public setOnMatrixChangeListener(listener: OnMatrixChangedListener)
    ```

## 约束与限制

在下述版本验证通过：
- DevEco Studio: NEXT Beta1-5.0.3.806, SDK: API12 Release(5.0.0.66)

## 目录结构
````
|---- PhotoView
    |---- entry
    |     |---- pages  # 示例代码文件夹       
    |---- library 
    |     |---- components  # 库文件夹 
    |     |     |---- PhotoView.ets  # 自定义组件                  
    |     |     |---- RectF.ets  # 区域坐标点数据封装
    |     |---- README.md  # 安装使用方法
````

## 贡献代码
使用过程中发现任何问题都可以提 [Issue](https://gitee.com/openharmony-sig/PhotoView/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://gitee.com/openharmony-sig/PhotoView-ETS/pulls) 。

## 开源协议
本项目基于 [Apache License 2.0](https://gitee.com/openharmony-sig/PhotoView/blob/master/LICENSE) ，请自由地享受和参与开源。

