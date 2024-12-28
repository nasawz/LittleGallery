import cloudDatabase from "@hms:core.deviceCloudGateway.cloudDatabase";
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
