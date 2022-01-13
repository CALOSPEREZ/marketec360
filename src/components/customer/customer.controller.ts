import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { handleResponse } from 'src/common/response';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { CustomerServiceInterface } from './interface/customer.service.interface';
@Controller('customer')
export class CustomerController {
  constructor(
    @Inject('customerServiceInterface')
    private readonly customerService: CustomerServiceInterface,
  ) {}
  @Post()
  public async create(
    @Body() dataDto: CreateCustomerDto,
    @Res() res,
  ): Promise<{ message: string; data: CreateCustomerDto }> {
    const data = await this.customerService.create(dataDto);
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
}
