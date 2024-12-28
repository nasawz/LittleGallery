import cloudDatabase from "@hms:core.deviceCloudGateway.cloudDatabase";
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
