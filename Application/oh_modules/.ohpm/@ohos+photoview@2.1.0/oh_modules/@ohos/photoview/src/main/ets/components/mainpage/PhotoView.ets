/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Matrix4 from '@ohos.matrix4';
import display from '@ohos.display';
import RectF from './RectF'

declare type ResourceStr = string | Resource | PixelMap;

export interface OnSwipeListener {
  onSwipeListener(ableSwipe: boolean): void;
}

export interface OnPhotoTapListener {
  /**
   * A callback to receive where the user taps on a photo. You will only receive a callback if
   * the user taps on the actual photo, tapping on 'whitespace' will be ignored.
   *
   * @param x    where the user tapped from the of the Drawable, as percentage of the
   *             Drawable width.
   * @param y    where the user tapped from the top of the Drawable, as percentage of the
   *             Drawable height.
   */
  onPhotoTap(x: number, y: number): void;
}

export interface OnDoubleTapListener {

  onSingleTapConfirmed(event: GestureEvent): void;

  onDoubleTap(event: GestureEvent): void;

}

export interface OnLongPressListener {
  onLongPress(event: GestureEvent): void;
}


export interface OnMatrixChangedListener {
  /**
   * Callback for when the Matrix displaying the Drawable has changed. This could be because
   * the View's bounds have changed, or the user has zoomed.
   *
   * @param rect - Rectangle displaying the Drawable's new bounds.
   */
  onMatrixChanged(rect: RectF | null): void;
}

export interface OnScaleChangedListener {
  /**
   * Callback for when the scale changes
   *
   * @param scaleFactor the scale factor (less than 1 for zoom out, greater than 1 for zoom in)
   * @param focusX      focal point X position
   * @param focusY      focal point Y position
   */
  onScaleChange(scaleFactor: number, focusX: number, focusY: number): void;
}

export interface OnOutsidePhotoTapListener {
  onOutsidePhotoTap(): void;
}

export interface OnViewDragListener {

  /**
   * Callback for when the photo is experiencing a drag event. This cannot be invoked when the
   * user is scaling.
   *
   * @param dx The change of the coordinates in the x-direction
   * @param dy The change of the coordinates in the y-direction
   */
  onDrag(dx: number, dy: number): void;
}

export interface OnViewTapListener {

  /**
   * A callback to receive where the user taps on a ImageView. You will receive a callback if
   * the user taps anywhere on the view, tapping on 'whitespace' will not be ignored.
   *
   * @param x    - where the user tapped from the left of the View.
   * @param y    - where the user tapped from the top of the View.
   */

  onViewTap(x: number, y: number): void;

}


export interface OnClickListener {
  onClick(event: GestureEvent): void;
}

@ComponentV2
struct PhotoView {
  @Param model: PhotoView.Model = new PhotoView.Model()

  public zoomTo(scale: number, durationMs: number): void {
    let currentScale = 0;
    if (scale > this.model.getMaximumScale()) {
      currentScale = this.model.getMaximumScale()
    } else if (scale < this.model.getMinimumScale()) {
      currentScale = this.model.getMinimumScale()
    } else {
      currentScale = scale;
    }
    animateTo({
      duration: durationMs,
      tempo: 0.5,
      curve: Curve.EaseInOut,
      delay: 0,
      iterations: 1,
      playMode: PlayMode.Normal,
      onFinish: () => {
      }
    }, () => {
      this.model.scale = currentScale;
      this.model.updateMatrix();
    })
  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Image(this.model.src)
        .alt(this.model.previewImage)
        .objectFit(this.model.imageFit)
        .transform(this.model.matrix)
        .interpolation(ImageInterpolation.Low)
        .draggable(false)
        .onComplete((event: ESObject) => {
          this.model.sWidth = event.width;
          this.model.sHeight = event.height;
          this.model.componentWidth = event.componentWidth;
          this.model.componentHeight = event.componentHeight;
          this.model.contentHeight = event.contentHeight;
          this.model.contentWidth = event.contentWidth;
          this.model.contentOffSetX = event.contentOffsetX;
          this.model.contentOffSetY = event.contentOffsetY;

          const left: number = event.contentOffsetX;
          const top: number = event.contentOffsetY;
          const right: number = event.contentOffsetX + event.contentWidth;
          const bottom: number = event.contentOffsetY + event.contentHeight;
          this.model.rect = new RectF(left, top, right, bottom)
        })
    }
    .gesture(
      GestureGroup(GestureMode.Exclusive,
        TapGesture({ count: 2, fingers: 1 })
          .onAction((event: GestureEvent) => {
            console.debug("photo double tap:")
            if (this.model.isZoom) {
              if (this.model.scale == this.model.scaleMax) {
                this.model.scale = this.model.scaleMin
                this.model.childSpan = false;
                this.model.resetMatrix();
              } else {
                if (this.model.scale < this.model.scaleMax) {
                  this.model.scale = this.model.scaleMax
                  this.model.panDirection = PanDirection.All
                  this.model.swipeDirection = SwipeDirection.None
                  this.model.childSpan = true;
                } else {
                  this.model.scale = this.model.scaleMin
                  this.model.panDirection = PanDirection.None
                  this.model.swipeDirection = this.model.cacheSwipeDirection
                  this.model.childSpan = false;
                }
                if (this.model.animate) {
                  this.zoomTo(this.model.scale, this.model.mZoomDuration)
                } else {
                  this.model.updateMatrix();
                }
              }
            }
            if (this.model.matrixChangedListener != null) {
              this.model.matrixChangedListener.onMatrixChanged(this.model.rect)
            }
            if (this.model.scaleChangeListener != null) {
              this.model.scaleChangeListener.onScaleChange(this.model.scale, 0, 0)
            }
            if (this.model.doubleTapListener != null) {
              this.model.doubleTapListener.onDoubleTap(event)
            }
          }),
        TapGesture({ count: 1, fingers: 1 })
          .onAction((event: GestureEvent) => {
            console.debug("photo single tap:")
            if (this.model.clickListener != null) {
              this.model.clickListener.onClick(event);
            }
            if (!event || !event.fingerList || !event.fingerList[0]) {
              return;
            }
            if (this.model.viewTapListener != null) {
              this.model.viewTapListener.onViewTap(vp2px(event.fingerList[0].globalX),
                vp2px(event.fingerList[0].globalY))
            }
            if (this.model.rect != null) {
              // Check to see if the user tapped on the photo
              if (this.model.rect.contains(vp2px(event.fingerList[0].globalX), vp2px(event.fingerList[0].globalY))) {
                let xResult: number = (vp2px(event.fingerList[0].globalX) - this.model.rect.left)
                  / this.model.rect.width();
                let yResult: number = (vp2px(event.fingerList[0].globalY) - this.model.rect.top)
                  / this.model.rect.height();
                if (this.model.photoTapListener != null) {
                  this.model.photoTapListener.onPhotoTap(xResult, yResult);
                }
              } else {
                if (this.model.outsidePhotoTapListener != null) {
                  this.model.outsidePhotoTapListener.onOutsidePhotoTap();
                }
              }
            }
          }),
        LongPressGesture()
          .onAction((event: GestureEvent) => {
            console.debug("PhotoView long press:")
            if (event && this.model.longPressListener != null) {
              this.model.longPressListener.onLongPress(event)
            }
          })
          .onActionEnd((event: GestureEvent) => {
            // if (this.model.longPressListener != null) {
            //   this.model.longPressListener.onLongPress(event)
            // }
          }),
        PanGesture(this.model.panOption)
          .onActionStart(() => {
            this.model.preOffsetX = this.model.offsetX;
            this.model.preOffsetY = this.model.offsetY;
          })
          .onActionUpdate((event: GestureEvent) => {
            if (this.model.isZoom && this.model.scale != this.model.scaleMin) {
              this.model.setOffset(this.model.preOffsetX + event.offsetX * this.model.scale,
                this.model.preOffsetY + event.offsetY * this.model.scale);
            }
          })
          .onActionEnd((event: GestureEvent) => {
            if (this.model.viewDragListener != null) {
              this.model.viewDragListener.onDrag(this.model.offsetX, this.model.offsetY)
            }
            if (this.model.matrixChangedListener != null) {
              this.model.matrixChangedListener.onMatrixChanged(this.model.rect)
            }
          }),
        PinchGesture({ fingers: 2 })
          .onActionUpdate((event: GestureEvent) => {
            if (this.model.isZoom) {
              this.model.isPinch = true;
              this.model.scale = this.model.currentScale * event.scale;

              if (this.model.animate) {
                this.zoomTo(this.model.scale, this.model.mZoomDuration)
              } else {
                this.model.offsetX = 0;
                this.model.offsetY = 0;
                this.model.updateMatrix();
              }
            }
          })
          .onActionEnd((event: GestureEvent) => {
            this.model.isPinch = false;
            if (this.model.scale < this.model.scaleMin) {
              this.model.scale = this.model.scaleMin
            }
            if (this.model.scale > this.model.scaleMax) {
              this.model.scale = this.model.scaleMax
            }

            this.model.currentScale = this.model.scale;
            this.model.preOffsetX = 0;
            this.model.preOffsetY = 0;

            if (this.model.animate) {
              this.zoomTo(this.model.scale, this.model.mZoomDuration)
            } else {
              this.model.offsetX = 0;
              this.model.offsetY = 0;
              this.model.updateMatrix();
            }

            this.model.isZooming = (this.model.scale > 1)
            if (this.model.matrixChangedListener != null) {
              this.model.matrixChangedListener.onMatrixChanged(this.model.rect)
            }
            if (this.model.scaleChangeListener != null) {
              this.model.scaleChangeListener.onScaleChange(this.model.scale, 0, 0)
            }
          })
        , SwipeGesture({ direction: this.model.swipeDirection })
          .onAction((event: GestureEvent) => {
            console.info("xxx photo swipe:")
          }),
      )
    ).onTouch((event?: TouchEvent): void => {
      if (event) {
        if (event.type == TouchType.Up) {
          //放大图片拖拽到边界后，启动滑动手势，将拖拽手势方向调整
          if (!this.model.vertical && this.model.enableSwipe) {
            if (this.model.isBoundary_X) {
              this.model.isBoundary_X = false;
              console.log("xxx this.gestureConversion1 PanDirection.Vertical, SwipeDirection.Horizontal");
              this.model.gestureConversion(PanDirection.Vertical, SwipeDirection.Horizontal);
            }
          } else if (this.model.vertical && this.model.enableSwipe) {
            if (this.model.isBoundary_Y) {
              this.model.isBoundary_Y = false;
              console.log("xxx this.gestureConversion2 PanDirection.Horizontal, SwipeDirection.Vertical");
              this.model.gestureConversion(PanDirection.Horizontal, SwipeDirection.Vertical);
            }
          }
        }
      }
    })
  }
}

namespace PhotoView {
  @ObservedV2
  export class Model {
    @Trace src: ResourceStr = '';
    @Trace sWidth: number = 0;
    @Trace sHeight: number = 0;
    @Trace componentWidth: number = 0;
    @Trace componentHeight: number = 0;
    @Trace baseAngle: number = 0
    @Trace rotateAngle: number = 0
    @Trace scale: number = 1
    @Trace currentScale: number = 1
    @Trace animate: boolean = false //  是否可手势缩放
    @Trace imageFit: ImageFit = ImageFit.Contain;
    @Trace scaleMin: number = 1.0
    @Trace scaleMed: number = 2
    @Trace scaleMax: number = 3.0
    @Trace isZoom: boolean = true
    @Trace centerX: number = 0
    @Trace centerY: number = 0
    @Trace centerZ: number = 0
    @Trace offsetX: number = 0
    @Trace offsetY: number = 0
    @Trace preOffsetX: number = 0
    @Trace preOffsetY: number = 0
    @Trace verticalEnd: boolean = false;
    //缩放后 平移到半屏边界的填充值
    @Trace startOffsetX: number = 10;
    @Trace startOffsetY: number = 23;
    photoTapListener: OnPhotoTapListener | null = null;
    doubleTapListener: OnDoubleTapListener | null = null;
    longPressListener: OnLongPressListener | null = null;
    clickListener: OnClickListener | null = null;
    matrixChangedListener: OnMatrixChangedListener | null = null;
    viewTapListener: OnViewTapListener | null = null;
    viewDragListener: OnViewDragListener | null = null;
    scaleChangeListener: OnScaleChangedListener | null = null
    outsidePhotoTapListener: OnOutsidePhotoTapListener | null = null
    onSwipeListener: OnSwipeListener | null = null
    @Trace rect: RectF | null = null;
    @Trace iterations: number = 0
    @Trace mZoomDuration: number = 200;
    @Trace scaledDensity: number = 0;
    @Trace isZooming: boolean = false;
    @Trace dragging: boolean = false;
    @Trace contentHeight: number = 0;
    @Trace contentWidth: number = 0;
    @Trace contentOffSetX: number = 0;
    @Trace contentOffSetY: number = 0;
    @Trace previewImage: string | Resource = '';
    @Trace panDirection: PanDirection = PanDirection.None;
    @Trace swipeDirection: SwipeDirection = SwipeDirection.Horizontal
    @Trace cacheSwipeDirection: SwipeDirection = SwipeDirection.Horizontal
    @Trace childSpan: boolean = false;
    @Trace parentIsSwiper: boolean = false;
    @Trace matrix: Matrix4.Matrix4Transit = Matrix4.identity()
      .rotate({
        x: 0,
        y: 0,
        z: 1,
        angle: this.rotateAngle
      })
      .translate({ x: this.offsetX, y: this.offsetY })
      .scale({ x: this.scale, y: this.scale });
    //是否拖拽到边界
    isBoundary_X: boolean = false;
    isBoundary_Y: boolean = false;
    // 是否双指缩放
    isPinch: boolean = false
    //是否垂直滑动
    vertical: boolean = false;
    //是否启动滑动
    enableSwipe: boolean = true;
    // 拖拽手势参数
    panOption: PanGestureOptions = new PanGestureOptions({ fingers: 1, direction: PanDirection.None })

    constructor() {
      console.debug("PhotoView create")
    }

    public setVertical(isVertical: boolean): Model {
      this.vertical = isVertical;
      return this
    }

    public setImageURI(src: string): Model {
      this.src = src
      return this
    }

    public setImageResource(src: Resource): Model {
      this.src = src
      return this
    }

    public setImageElement(src: PixelMap) {
      this.src = src
      return this
    }

    public setSwipeDirection(swipeDirection: SwipeDirection) {
      this.swipeDirection = swipeDirection;
      this.cacheSwipeDirection = swipeDirection;
      return this;
    }

    public isParentSwiper(parentIsSwiper: boolean) {
      this.parentIsSwiper = parentIsSwiper;
      return this;
    }

    public setImageFit(imageFit: ImageFit): Model {
      this.imageFit = imageFit
      console.log("imageFit")
      return this
    }

    public setPreviewImage(src: string | Resource) {
      this.previewImage = src;
      return this
    }

    public setScale(scale: number, animate: boolean): Model {
      this.scale = scale
      if (this.scale < this.scaleMin) {
        this.scale = this.scaleMin
      }
      if (this.scale > this.scaleMax) {
        this.scale = this.scaleMax
      }

      if (animate) {
        this.iterations = 1
      } else {
        this.iterations = 0
      }
      this.animate = animate
      return this
    }

    public setZoomTransitionDuration(milliseconds: number): Model {
      this.mZoomDuration = milliseconds;
      return this;
    }

    public getMinimumScale(): number {
      return this.scaleMin
    }

    public getMediumScale(): number {
      return this.scaleMed
    }

    public getMaximumScale(): number {
      return this.scaleMax
    }

    public getScale(): number {
      return this.scale
    }

    public setMinimumScale(minimumScale: number): Model {
      this.scaleMin = minimumScale
      return this
    }

    public setMediumScale(mediumScale: number): Model {
      this.scaleMed = mediumScale
      return this
    }

    public setMaximumScale(maximumScale: number): Model {
      this.scaleMax = maximumScale
      return this
    }

    public setScaleLevels(minimumScale: number, mediumScale: number, maximumScale: number): Model {
      this.scaleMin = minimumScale
      this.scaleMed = mediumScale
      this.scaleMax = maximumScale
      return this
    }

    public setBaseRotation(degrees: number): Model {
      this.rotateAngle = degrees % 360
      this.setRotationBy(this.rotateAngle)
      return this
    }

    public setRotationTo(rotationDegree: number): Model {
      this.rotateAngle = rotationDegree % 360
      this.matrix = Matrix4.identity()
        .rotate({
          x: 0,
          y: 0,
          z: 1,
          angle: this.rotateAngle
        })
      return this
    }

    public setRotationBy(rotationDegree: number): Model {
      this.rotateAngle = (this.rotateAngle + rotationDegree) % 360
      this.matrix = Matrix4.identity()
        .rotate({
          x: 0,
          y: 0,
          z: 1,
          angle: this.rotateAngle
        })
      return this
    }

    public setRotationCenter(x: number, y: number, z: number): Model {
      this.centerX = z
      this.centerY = y
      this.centerZ = z
      return this
    }

    public setZoomable(zoomable: boolean): Model {
      if (!zoomable) {
        this.scale = this.scaleMin
        this.setImageFit(ImageFit.None)
        this.isZoom = false
        return this
      }
      this.isZoom = zoomable
      return this
    }

    public isZoomEnabled(): boolean {
      return this.isZoom
    }

    public setImageOffset(pointX: number, pointY: number): Model {
      this.offsetX = pointX
      this.offsetY = pointY
      return this
    }

    public setOnClickListener(listener: OnClickListener): Model {
      this.clickListener = listener;
      return this;
    }

    public setOnLongClickListener(listener: OnLongPressListener): Model {
      this.longPressListener = listener;
      return this;
    }

    public setOnMatrixChangeListener(listener: OnMatrixChangedListener): Model {
      this.matrixChangedListener = listener;
      return this;
    }

    public setOnPhotoTapListener(listener: OnPhotoTapListener): Model {
      this.photoTapListener = listener;
      return this;
    }

    public setOnViewTapListener(listener: OnViewTapListener): Model {
      this.viewTapListener = listener;
      return this;
    }

    public setOnViewDragListener(listener: OnViewDragListener): Model {
      this.viewDragListener = listener;
      return this;
    }

    public setOnScaleChangeListener(scaleChangeListener: OnScaleChangedListener): Model {
      this.scaleChangeListener = scaleChangeListener;
      return this;
    }

    public setOnOutsidePhotoTapListener(outsidePhotoTapListener: OnOutsidePhotoTapListener): Model {
      this.outsidePhotoTapListener = outsidePhotoTapListener;
      return this;
    }

    public setOnDoubleTapListener(onDoubleTapListener: OnDoubleTapListener): Model {
      this.doubleTapListener = onDoubleTapListener;
      return this;
    }

    public setOnSwipeListener(onSwipeListener: OnSwipeListener): Model {
      this.onSwipeListener = onSwipeListener;
      return this;
    }

    public updateMatrix(): void {
      if (!!this.rect) {
        const originLeft: number = this.contentOffSetX;
        const originTop: number = this.contentOffSetY;
        const originWidth: number = this.contentWidth;
        const originHeight: number = this.contentHeight;

        const scaledWidth: number = originWidth * this.scale;
        const scaledHeight: number = originHeight * this.scale;

        const centerXOffset = (scaledWidth - originWidth) / 2;
        const centerYOffset = (scaledHeight - originHeight) / 2;

        this.rect.left = originLeft + this.offsetX - centerXOffset;
        this.rect.top = originTop + this.offsetY - centerYOffset;
        this.rect.right = this.rect.left + scaledWidth + centerXOffset;
        this.rect.bottom = this.rect.top + scaledHeight + centerYOffset;

      }

      if (this.enableSwipe && !this.isPinch) {
        //图片放大时禁用滑动手势，启动拖动手势
        //图片复原时启动滑动手势，禁用拖动手势
        if (this.scale == this.scaleMin) {
          if (!this.vertical) {
            console.log("xxx this.gestureConversion3 PanDirection.None, SwipeDirection.Horizontal");
            this.gestureConversion(PanDirection.None, SwipeDirection.Horizontal)
          } else {
            console.log("xxx this.gestureConversion4 PanDirection.None, SwipeDirection.Vertical");
            this.gestureConversion(PanDirection.None, SwipeDirection.Vertical)
          }
        } else {
          console.log("xxx this.gestureConversion5 PanDirection.All, SwipeDirection.None");
          this.gestureConversion(PanDirection.All, SwipeDirection.None)
        }
      }

      this.matrix = Matrix4.identity()
        .rotate({
          x: 0,
          y: 0,
          z: 1,
          angle: this.rotateAngle
        })
        .translate({ x: this.offsetX, y: this.offsetY, z: 1 })
        .scale({
          x: this.scale,
          y: this.scale,
          centerX: this.centerX,
          centerY: this.centerY
        })
      if (this.onSwipeListener != null) {
        this.onSwipeListener.onSwipeListener(this.childSpan)
      }
    }

    //设置滑动手势与拖拽手势的方向
    public gestureConversion(panDirection: PanDirection, swipeDirection?: SwipeDirection, vertical?: boolean): Model {
      this.panOption.setDirection(panDirection)
      if (swipeDirection !== undefined) {
        this.swipeDirection = swipeDirection
        if (vertical !== undefined) {
          this.vertical = vertical
        }
        if (!this.enableSwipe) {
          this.enableSwipe = true
        }
      } else {
        this.enableSwipe = false;
        this.swipeDirection = SwipeDirection.None;
      }
      return this;
    }

    public resetMatrix(): void {
      this.scale = 1;
      this.currentScale = 1;
      this.centerX = 0;
      this.centerY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.rotateAngle = 0
      this.panDirection = PanDirection.None;
      this.swipeDirection = this.cacheSwipeDirection;
      this.updateMatrix();
    }

    public getSuppMatrix(matrix: object): void {
      this.matrix;
    }

    public setSuppMatrix(matrix: Matrix4.Matrix4Transit): Model {
      this.matrix = matrix;
      return this;
    }

    public isScaling(): boolean {
      return this.scale != 1;
    }

    public isDragging(): boolean {
      return this.offsetX != 0 || this.offsetY != 0;
    }

    public getRectF(): RectF | null {
      return this.rect;
    }

    public setOffset(offsetX: number, offsetY: number): void {
      let maxOffsetX = (this.contentWidth * this.scale - this.componentWidth) / 2 / this.scale + 10;
      let maxOffsetY = (this.contentHeight * this.scale - this.componentHeight) / 2 / this.scale + 10;
      console.log("xxx maxOffsetX = " + maxOffsetX);
      if (this.contentWidth * this.scale > this.componentWidth) {
        this.offsetX = offsetX;
        if (this.offsetX > maxOffsetX) {
          //左边
          this.offsetX = maxOffsetX;
          this.isBoundary_X = true;
        } else if (this.offsetX < -maxOffsetX) {
          //右边
          this.offsetX = -maxOffsetX;
          this.isBoundary_X = true;
        }
      }

      if (this.contentHeight * this.scale > this.componentHeight) {
        this.offsetY = offsetY;
        if (this.offsetY > maxOffsetY) {
          this.offsetY = maxOffsetY;
          this.isBoundary_Y = true;
        } else if (this.offsetY < -maxOffsetY) {
          this.offsetY = -maxOffsetY;
          this.isBoundary_Y = true;
        }
      }
      this.updateMatrix();
    }
  }
}

export { PhotoView }