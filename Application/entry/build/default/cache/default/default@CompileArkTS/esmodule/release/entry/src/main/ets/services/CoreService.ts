import cloudDatabase from "@hms:core.deviceCloudGateway.cloudDatabase";
import cloudStorage from "@hms:core.deviceCloudGateway.cloudStorage";
import { Album } from "@normalized:N&&&entry/src/main/ets/module/Album&";
import { Category } from "@normalized:N&&&entry/src/main/ets/module/Category&";
import { Child } from "@normalized:N&&&entry/src/main/ets/module/Child&";
import { Picture } from "@normalized:N&&&entry/src/main/ets/module/Picture&";
import type { BusinessError } from "@ohos:base";
import { AppConfig } from "@normalized:N&&&entry/src/main/ets/utils/AppConfig&";
// 初始化云存储桶
let bucket: cloudStorage.StorageBucket = cloudStorage.bucket();
// CoreService类用于管理数据库操作
export default class CoreService {
    private static instance: CoreService;
    private userId: string = '';
    // 数据库和查询条件
    private agcDataBase: cloudDatabase.DatabaseZone | undefined = undefined;
    private condition: cloudDatabase.DatabaseQuery<cloudDatabase.DatabaseObject> | undefined = undefined;
    constructor() {
        // 初始化数据库区域
        this.agcDataBase = cloudDatabase.zone(AppConfig.dbZone);
    }
    // 单例模式获取服务实例
    public static getService(): CoreService {
        if (!CoreService.instance) {
            CoreService.instance = new CoreService();
        }
        return CoreService.instance;
    }
    // 设置用户ID用于查询
    setUserId(userId: string) {
        this.userId = userId;
    }
    // 获取当前用户的相册
    async getMyAlbums() {
        this.condition = new cloudDatabase.DatabaseQuery(Album);
        this.condition?.equalTo('userId', this.userId);
        this.condition?.orderByDesc('createTime');
        // this.condition?.orderByDesc('sort');
        this.condition?.limit(100, 0);
        const albums = await this.agcDataBase?.query(this.condition) as Album[];
        // 为每个相册获取第一张图片
        for (const album of albums) {
            this.condition = new cloudDatabase.DatabaseQuery(Picture);
            this.condition?.equalTo('albumId', album.id);
            this.condition?.orderByDesc('createTime');
            this.condition?.limit(1, 0);
            const pictures = await this.agcDataBase?.query(this.condition) as Picture[];
            if (pictures && pictures.length > 0) {
                console.info('littleGallery', 'get cover image success.', pictures[0].imageUrl);
                album.coverImage = pictures[0].imageUrl;
            }
        }
        return albums;
    }
    // 获取当前用户的类别
    async getMyCategory() {
        this.condition = new cloudDatabase.DatabaseQuery(Category);
        this.condition?.equalTo('userId', this.userId);
        // this.condition?.orderByDesc('sort');
        this.condition?.orderByDesc('createTime');
        this.condition?.limit(100, 0);
        const resultArray = await this.agcDataBase?.query(this.condition);
        return resultArray as Category[];
    }
    // 生成默认分类和画册��据
    async generateDefaultData() {
        // 生成默认分类数据
        let defaultCategory = new Category();
        defaultCategory.id = 'defaultCategory';
        defaultCategory.name = '默认';
        defaultCategory.description = '';
        defaultCategory.createTime = new Date();
        defaultCategory.sort = 0;
        defaultCategory.userId = this.userId;
        await this.agcDataBase?.upsert(defaultCategory);
        // 生成默认男孩数据
        let defaultChild = new Child();
        defaultChild.id = 'defaultChild1';
        defaultChild.name = '小帅哥';
        defaultChild.birthday = new Date(new Date().setFullYear(new Date().getFullYear() - 5)); // 默认生日为5年前
        defaultChild.gender = '男孩';
        defaultChild.userId = this.userId;
        defaultChild.sort = 0;
        await this.agcDataBase?.upsert(defaultChild);
        // 生成默认女孩数据
        let defaultChild2 = new Child();
        defaultChild2.id = 'defaultChild2';
        defaultChild2.name = '小公主';
        defaultChild2.birthday = new Date(new Date().setFullYear(new Date().getFullYear() - 5)); // 默认生日为5年前
        defaultChild2.gender = '女孩';
        defaultChild2.userId = this.userId;
        defaultChild2.sort = 1;
        await this.agcDataBase?.upsert(defaultChild2);
        // 生成默认画册数据
        let defaultAlbum = new Album();
        defaultAlbum.id = 'defaultAlbum';
        defaultAlbum.name = '绘画本';
        defaultAlbum.userId = this.userId;
        defaultAlbum.categoryId = 'defaultCategory';
        defaultAlbum.childId = 'defaultChild1';
        defaultAlbum.description = '';
        defaultAlbum.createTime = new Date();
        defaultAlbum.sort = 0;
        await this.agcDataBase?.upsert(defaultAlbum);
    }
    // 获取当前用户的孩子信息
    async getMyChild() {
        this.condition = new cloudDatabase.DatabaseQuery(Child);
        this.condition?.equalTo('userId', this.userId);
        this.condition?.orderByDesc('birthday');
        const resultArray = await this.agcDataBase?.query(this.condition);
        return resultArray as Child[];
    }
    // 获取特定相册的图片
    async getPictures(albumId: string, limit: number, offset: number) {
        this.condition = new cloudDatabase.DatabaseQuery(Picture);
        this.condition?.equalTo('albumId', albumId);
        this.condition?.orderByDesc('createTime');
        // this.condition?.orderByDesc('sort');
        this.condition?.limit(limit, offset);
        const resultArray = await this.agcDataBase?.query(this.condition);
        return resultArray as Picture[];
    }
    // 如果没有关联的相册，删除孩子信息
    async deleteChild(childId: string) {
        this.condition = new cloudDatabase.DatabaseQuery(Album);
        this.condition?.equalTo('childId', childId);
        const resultArray = await this.agcDataBase?.query(this.condition) as Album[];
        if (resultArray.length > 0) {
            return false; // 如果存在关联记录则无法删除
        }
        this.condition = new cloudDatabase.DatabaseQuery(Child);
        this.condition?.equalTo('id', childId);
        let deleteTargets = await this.agcDataBase?.query(this.condition) as Child[];
        let deleteNum = await this.agcDataBase?.delete(deleteTargets) as number;
        return deleteNum > 0;
    }
    // 删除图片
    async deletePicture(pictureId: string) {
        this.condition = new cloudDatabase.DatabaseQuery(Picture);
        this.condition?.equalTo('id', pictureId);
        let deleteTargets = await this.agcDataBase?.query(this.condition) as Picture[];
        if (deleteTargets.length > 0) {
            let cloudPath = deleteTargets[0].imageUrl;
            // cloudPath云侧文件路径
            bucket.deleteFile(cloudPath).then(() => {
                console.log('littleGallery', 'delete file success.', cloudPath);
            }).catch((err: BusinessError) => {
                console.error('littleGallery', `delete file failed! Code: ${err.code}, message: ${err.message}`);
            });
        }
        let deleteNum = await this.agcDataBase?.delete(deleteTargets) as number;
        return deleteNum > 0;
    }
    // 如果没有关联的相册，删除类别
    async deleteCategory(categoryId: string) {
        this.condition = new cloudDatabase.DatabaseQuery(Album);
        this.condition?.equalTo('categoryId', categoryId);
        const resultArray = await this.agcDataBase?.query(this.condition) as Album[];
        if (resultArray.length > 0) {
            return false; // 如果存在关联记录则无法删除
        }
        this.condition = new cloudDatabase.DatabaseQuery(Category);
        this.condition?.equalTo('id', categoryId);
        let deleteTargets = await this.agcDataBase?.query(this.condition) as Category[];
        let deleteNum = await this.agcDataBase?.delete(deleteTargets) as number;
        return deleteNum > 0;
    }
    // 如果没有关联的图片，删除相册
    async deleteAlbum(albumId: string) {
        this.condition = new cloudDatabase.DatabaseQuery(Picture);
        this.condition?.equalTo('albumId', albumId);
        const resultArray = await this.agcDataBase?.query(this.condition) as Picture[];
        if (resultArray.length > 0) {
            return false; // 如果存在关联记录则无法删除
        }
        this.condition = new cloudDatabase.DatabaseQuery(Album);
        this.condition?.equalTo('id', albumId);
        let deleteTargets = await this.agcDataBase?.query(this.condition) as Album[];
        let deleteNum = await this.agcDataBase?.delete(deleteTargets) as number;
        return deleteNum > 0;
    }
}
