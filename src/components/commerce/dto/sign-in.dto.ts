import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  slug: string;
}

export class SignInDtoResponse {
  value: string;
  slug: string;

  constructor(partial: Partial<SignInDtoResponse>) {
    const { value, slug } = partial;
    Object.assign(this, { value, slug });
  }
}
