import * as mongoose from 'mongoose';
export declare type transactionsDocument = Transactions & mongoose.Document;
export declare class Transactions {
    commerce_id: string;
    user_id: string;
    amount: number;
    discount: number;
    creation: Date;
}
export declare const TransactionsSchema: mongoose.Schema<mongoose.Document<Transactions, any, any>, mongoose.Model<mongoose.Document<Transactions, any, any>, any, any, any>, {}>;
