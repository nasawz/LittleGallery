/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 云函数预加载处理器
 * 功能:
 * - 提供客户端配置参数
 * - 设置数据库区域名称
 * - 配置云存储基础路径
 * - 控制默认数据开关
 * 
 * @param {Object} event - 客户端传入的事件参数
 * @param {Object} context - 包含HTTP响应的上下文对象
 * @param {Function} callback - 返回响应的回调函数
 * @param {Object} logger - 用于调试的日志对象
 */
let myHandler = function(event, context, callback, logger) {
    // Define cloud parameters for client pre-reading
    // 定义云端参数供客户端预先读取
    let res = new context.HTTPResponse(
        {
            // Database zone name
            // 数据存储区名称
            "dbZone": "Demo",
            
            // Base path for storing images in cloud storage
            // 云存储中的图片基础路径
            "cloudBasePath": "pictures",
            
            // Whether to enable default data
            // 是否启用默认数据
            "isDefaultData": true
        }, 
        {
            "res-type": "preload data for client",
            "faas-content-type": "json"
        }, 
        "application/json",
        "200"
    );

    callback(res);
};

module.exports.myHandler = myHandler;
