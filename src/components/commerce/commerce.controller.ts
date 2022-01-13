import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { handleResponse } from 'src/common/response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommerceDto } from './dto/create.commerce.dto';
import { DiscountDto } from './dto/discount.dto';
import { DiscountUpdateDto } from './dto/discount.updatedto.dto';
import { CommerceServiceInterface } from './interface/commerce.service.interface';
import { Commerce } from './schema/commerce.shema';

@Controller('commerce')
export class CommerceController {
  constructor(
    @Inject('commerceServiceInterface')
    private readonly custommerService: CommerceServiceInterface,
  ) {}
  @Post()
  public async create(
    @Body() custommerDto: CreateCommerceDto,
    @Res() res,
  ): Promise<{ message: string; data: any }> {
    const data = await this.custommerService.create(custommerDto);
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
  @Post('discount/:id')
  public async discount(
    @Body() custommerDto: DiscountDto,
    @Param('id') id: string,
    @Res() res,
  ): Promise<{ message: string; data: any }> {
    const data = await this.custommerService.discount(custommerDto, id);
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
  @Put('discount/:id')
  public async updateDiscount(
    @Body() custommerDto: DiscountUpdateDto,
    @Param('id') id: string,
    @Res() res,
  ): Promise<{ message: string; data: any }> {
    const data = await this.custommerService.updateDiscount(id, custommerDto);
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
  @Delete(':comid/discount/:id')
  public async deleteDiscount(
    @Param() param: any,
    @Res() res,
  ): Promise<{ message: string; data: any }> {
    const data = await this.custommerService.deleteDiscount(
      param['id'],
      param['comid'],
    );
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':commerce_id/user')
  public async commerce(
    @Param('commerce_id') commerce_id: string,
    @Request() req,
    @Res() res,
  ): Promise<Commerce> {
    const data = await this.custommerService.statistics(
      req.user.id,
      commerce_id,
    );
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  public async findAll(@Res() res): Promise<Commerce[]> {
    const data = await this.custommerService.findAll();
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
  @Get(':id')
  public async findById(
    @Param('id') id: string,
    @Res() res,
  ): Promise<Commerce> {
    const data = await this.custommerService.findById(id);
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
  @Put(':id')
  public async update(
    @Body() commercedto: CreateCommerceDto,
    @Param('id') id: string,
    @Res() res,
  ): Promise<Commerce> {
    const data = await this.custommerService.update(commercedto, { _id: id });
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string, @Res() res): Promise<Commerce> {
    const data = await this.custommerService.delete(id);
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
}
