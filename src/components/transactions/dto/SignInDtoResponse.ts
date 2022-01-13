import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  slug: string;
}

export class SignInDtoResponse {
  mont: string;
  slug: string;

  constructor(partial: Partial<any>) {
    partial.map((data) => {
      Object.assign(this, {
        value: data['discountsUsed'],
        slug: data['accumulatedPurchases'],
      });
    });
  }
}
