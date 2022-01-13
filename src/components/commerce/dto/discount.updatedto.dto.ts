import { IsBoolean, IsNumber, IsString } from 'class-validator';
export class DiscountUpdateDto {
  @IsString()
  id: string;
  @IsString()
  user_id: string;

  @IsNumber()
  amount: number;

  @IsBoolean()
  status: boolean;
}
