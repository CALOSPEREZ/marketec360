import { IsNumber, IsString } from 'class-validator';
export class CreateCommerceDto {
  @IsString()
  name: string;
  @IsString()
  province: string;
  @IsString()
  direction: string;
  @IsString()
  cif: string;
  @IsString()
  manager: string;
  @IsNumber()
  maxDiscountAmount: number;
  @IsNumber()
  discount: number;
}
