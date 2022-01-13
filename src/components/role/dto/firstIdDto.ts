import { IsMongoId } from 'class-validator';
export class FirstIdDto {
  @IsMongoId()
  id: string;
}
