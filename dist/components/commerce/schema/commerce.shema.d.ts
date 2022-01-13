import * as mongoose from 'mongoose';
export declare type CommerceDocument = Commerce & mongoose.Document;
export declare class Commerce {
    name: string;
    province: string;
    direction: string;
    cif: string;
    maxDiscountAmount: number;
    discount: number;
    discounts?: [
        {
            user_id: string;
            maxDiscountAmount: number;
            amount: number;
            status: boolean;
        }
    ];
    manager?: string;
}
export declare const CommerceSchema: mongoose.Schema<mongoose.Document<Commerce, any, any>, mongoose.Model<mongoose.Document<Commerce, any, any>, any, any, any>, {}>;
