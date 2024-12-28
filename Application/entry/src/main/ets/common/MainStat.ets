/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * MainStat类用于管理应用的全局状态
 * 功能:
 * - 用户数据状态管理
 * - 图片详情数据管理
 * - 结果状态管理
 */

import { Type } from '@kit.ArkUI';
import { Album } from '../module/Album';
import { Category } from '../module/Category';
import { Child } from '../module/Child';

// 定义一个结果类
export class resultClass {
  constructor(count: number) {
    this.count = count; // 初始化计数
  }
  count: number = 10; // 默认计数值为10
}

// 定义一个图片详情类
export class ImageDetail {
  constructor(key: string, height: number, url: string) {
    this.key = key; // 图片的键
    this.height = height; // 图片的高度
    this.url = url; // 图片的URL
  }
  key: string;
  height: number;
  url: string;
}

@ObservedV2
// 定义主状态类
export class MainStat {
  userId: string = ''; // 用户ID

  @Trace albums: Album[] = []; // 专辑数组
  @Trace categories: Category[] = []; // 类别数组
  @Trace child: Child[] = []; // 子项数组
  
  imageDetails: Array<ImageDetail> = []; // 图片详情数组
}