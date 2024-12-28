/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * Category类用于定义分类数据结构
 * 功能:
 * - 分类基本信息
 * - 用户关联
 * - 排序和创建时间
 */

import { cloudDatabase } from '@kit.CloudFoundationKit';

class Category extends cloudDatabase.DatabaseObject {
    id: string;
    userId: string = '';
    name: string = '';
    description: string;
    createTime: Date;
    sort: number = 0;

    naturalbase_ClassName(): string {
        return 'Category';
    }
}

export { Category };
