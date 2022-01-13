import { Type } from 'class-transformer';
import {
  IsDateString,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUserDto } from 'src/components/user/dto/create.user.dto';
export class CreateCustomerDto {
  @IsString()
  dni: string;

  @IsString()
  province: string;

  @IsString()
  direction: string;

  @IsDateString({ strict: true } as any)
  dateOfBirth: Date;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
