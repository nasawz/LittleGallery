/**
 * Copyright (c) 2024 风华(QQ:12446006)
 *
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 *
 * 应用配置工具类
 * 功能:
 * - 定义数据库区域
 * - 设置云存储基础路径
 * - 控制默认数据开关
 * - 提供全局配置访问
 */
export class AppConfig {
    // 数据库区域
    public static dbZone: string = "Demo";
    // 云基础路径
    public static cloudBasePath: string;
    // 是否启用默认数据
    public static isDefaultData: boolean;
}
