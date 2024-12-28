/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * Album类用于定义相册数据结构
 * 功能:
 * - 相册基本信息
 * - 关联用户、分类和孩子
 * - 排序和创建时间
 * - 封面图片管理
 */

import { cloudDatabase } from '@kit.CloudFoundationKit';

class Album extends cloudDatabase.DatabaseObject {
    id: string;
    userId: string = '';
    name: string = '';
    description: string;
    createTime: Date;
    childId: string = '';
    categoryId: string = '';
    sort: number = 0;

    // 虚拟字段
    coverImage: string = '';
    

    naturalbase_ClassName(): string {
        return 'Album';
    }
}

export { Album };
