import * as mongoose from 'mongoose';
export declare type CustomerDocument = Customer & mongoose.Document;
export declare class Customer {
    dni: string;
    dateOfBirth: string;
    province: string;
    direction: string;
    user_id: string;
}
export declare const CustomerSchema: mongoose.Schema<mongoose.Document<Customer, any, any>, mongoose.Model<mongoose.Document<Customer, any, any>, any, any, any>, {}>;
