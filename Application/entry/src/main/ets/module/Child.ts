/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * Child类用于定义孩子数据结构
 * 功能:
 * - 孩子基本信息
 * - 生日和性别
 * - 用户关联和排序
 */

import { cloudDatabase } from '@kit.CloudFoundationKit';

class Child extends cloudDatabase.DatabaseObject {
    id: string;
    userId: string = '';
    name: string = '';
    birthday: Date;
    gender: string;
    sort: number = 0;

    naturalbase_ClassName(): string {
        return 'Child';
    }
}

export { Child };