import { IsString } from 'class-validator';
export class CreateRoleDto {
  @IsString()
  slug: string;
  @IsString()
  value: string;
}
