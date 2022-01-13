import { IsNumber, IsString } from 'class-validator';
export class CreateTransactionsDto {
  commerce_id: string;
  @IsString()
  user_id: string;
  @IsNumber()
  amount: number;
  @IsNumber()
  discount: number;
}
export class discount {
  _id: string;
  accumulatedPurchases: number;

  discountsUsed: number;
}
