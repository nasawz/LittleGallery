import cloudDatabase from "@hms:core.deviceCloudGateway.cloudDatabase";
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
