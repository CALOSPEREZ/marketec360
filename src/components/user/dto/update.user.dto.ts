import { IsEmail, IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsString()
  role_id: string;
}
