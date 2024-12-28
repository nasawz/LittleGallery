/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 窗口工具类
 * 功能:
 * - 存储窗口实例
 * - 记录窗口尺寸
 * - 保存顶部避让区高度
 * - 保存导航指示器高度
 */

// 窗口信息
import { window } from '@kit.ArkUI';

export class WindowUtils {
  public static window: window.Window;
  public static windowWidth_px: number;
  public static windowHeight_px: number;
  public static topAvoidAreaHeight_px: number;
  public static navigationIndicatorHeight_px: number;
}