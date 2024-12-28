import { cloudDatabase } from '@kit.CloudFoundationKit';

/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * Picture类用于定义图片数据结构
 * 功能:
 * - 图片基本信息
 * - 关联相册、分类和孩子
 * - 标签管理
 * - 排序和创建时间
 */

class Picture extends cloudDatabase.DatabaseObject {
    id: string;
    userId: string = '';
    imageUrl: string = '';
    description: string;
    tags: string = '[]';
    createTime: Date;
    albumId: string = '';
    categoryId: string = '';
    childId: string = '';
    sort: number = 0;

    naturalbase_ClassName(): string {
        return 'Picture';
    }
}

export { Picture };
