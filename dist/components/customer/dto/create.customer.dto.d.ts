import { CreateUserDto } from 'src/components/user/dto/create.user.dto';
export declare class CreateCustomerDto {
    dni: string;
    province: string;
    direction: string;
    dateOfBirth: Date;
    user: CreateUserDto;
}
