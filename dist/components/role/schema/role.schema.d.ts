import { Document } from 'mongoose';
export declare type RoleDocument = Role & Document;
export declare class Role {
    slug: string;
    value: string;
}
export declare const RoleSchema: import("mongoose").Schema<Document<Role, any, any>, import("mongoose").Model<Document<Role, any, any>, any, any, any>, {}>;
