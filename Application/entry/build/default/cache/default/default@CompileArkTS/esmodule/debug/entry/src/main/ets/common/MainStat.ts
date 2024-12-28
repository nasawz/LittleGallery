import type { Album } from '../module/Album';
import type { Category } from '../module/Category';
import type { Child } from '../module/Child';
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
    @Trace
    albums: Album[] = []; // 专辑数组
    @Trace
    categories: Category[] = []; // 类别数组
    @Trace
    child: Child[] = []; // 子项数组
    imageDetails: Array<ImageDetail> = []; // 图片详情数组
}
