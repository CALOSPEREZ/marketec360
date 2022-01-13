import { IsBoolean, IsNumber, IsString } from 'class-validator';
export class DiscountDto {
  @IsString()
  user_id: string;

  @IsNumber()
  amount: any;

  @IsBoolean()
  status: boolean;
}
