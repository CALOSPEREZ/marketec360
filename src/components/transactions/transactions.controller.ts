import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Inject,
  NotAcceptableException,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
import { Relations } from 'src/common/constants/relations';
import { Slug } from 'src/common/constants/slugs';
import { amountDiscount, countDiscount } from 'src/common/inquiries/array.crud';
import { handleResponse } from 'src/common/response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTransactionsDto } from './dto/create.transactions.dto';
import { SignInDtoResponse } from './dto/SignInDtoResponse';
import { TransactionsServiceInterface } from './interface/transactions.service.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject('transactionsServiceInterface')
    private readonly transactionsService: TransactionsServiceInterface,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(
    @Body() userDto: CreateTransactionsDto,
    @Res() res,
    @Request() req,
  ): Promise<{ message: string; data: CreateTransactionsDto }> {
    userDto.commerce_id = req.user.commerce_id;
    if (!userDto.commerce_id)
      throw new NotAcceptableException(
        'disponible solo para empleados de un comercio',
      );
    const data = await this.transactionsService.create(userDto);
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async findpopulateuser(
    @Res() res,
    @Request() req,
  ): Promise<{ message: string; data: CreateTransactionsDto }> {
    let relations, id;
    if (req.user.role_slug !== Slug.employee) {
      id = req.user.id;
      relations = Relations.commerce;
    } else {
      relations = Relations.user;
      id = req.user.commerce_id;
    }
    const data = await this.transactionsService.findByAllConditionRelation(
      id,
      relations,
    );
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }

  @Get('shoppingProfile/:id')
  public async findByConditionRelationAgregate(
    @Res() res,
    @Request() req,
    @Param('id') id: string,
  ): Promise<{ message: string; data: CreateTransactionsDto }> {
    const data = await this.transactionsService.findByConditionRelationAgregate(
      [
        {
          $match: {
            user_id: ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$user_id',
            accumulatedPurchases: { $sum: '$amount' },
            count: { $sum: 1 },
          },
        },
        { $limit: 1 },
      ],
    );
    const numberComerce =
      await this.transactionsService.findByConditionRelationAgregate([
        {
          $match: {
            user_id: ObjectId(id),
          },
        },
        {
          $group: {
            _id: '$commerce_id',
          },
        },
      ]);
    const useDiscount = await this.transactionsService.useDiscount([
      {
        $match: {
          discounts: {
            $elemMatch: {
              $and: [{ user_id: ObjectId(id) }],
            },
          },
        },
      },
      {
        $addFields: {
          goals: {
            $filter: {
              input: '$discounts',
              as: 'discounts',
              cond: {
                $eq: ['$$discounts.user_id', ObjectId(id)],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          discounts: '$goals',
        },
      },
    ]);
    const count = 0;
    return handleResponse(res, HttpStatus.CREATED, 'ok', {
      accumulatedPurchases: data[0]['accumulatedPurchases'] || 0,
      numberComerce: numberComerce.length,
      useDiscount: countDiscount(useDiscount, count),
    });
  }
  @Get('all/descuentos/:id')
  public async listDisconunt(
    @Res() res,
    @Request() req,
    @Param('id') id: string,
  ): Promise<{ message: string; data: CreateTransactionsDto }> {
    const data = await this.transactionsService.findByAllConditionRelation(
      id,
      'commerce_id',
    );
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
  @Get('discount/custommer/:dni/commerce/:commerce_id')
  public async discount(
    @Res() res,
    @Request() req,
    @Param() { commerce_id, dni },
  ): Promise<{ message: string; data: any }> {
    const { user_id } = await this.transactionsService.filterUser({ dni: dni });
    const result = await this.transactionsService.resultAmount(
      user_id,
      commerce_id,
    );
    const acumulate = await this.transactionsService.useDiscount([
      { $match: { _id: ObjectId(commerce_id) } },
      {
        $match: {
          discounts: {
            $elemMatch: {
              $and: [{ user_id: ObjectId(user_id) }],
            },
          },
        },
      },
      {
        $addFields: {
          goals: {
            $filter: {
              input: '$discounts',
              as: 'discounts',
              cond: {
                $eq: ['$$discounts.user_id', ObjectId(user_id)],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          maxDiscountAmount: 1,
          discount: 1,
          discounts: '$goals',
        },
      },
    ]);

    return handleResponse(res, HttpStatus.CREATED, 'ok', [
      {
        accumulatedPurchases: result['accumulatedAmount'] || 0,
        disposition: result['disponible'] || 0,
        missingForDiscount:
          acumulate[0]['maxDiscountAmount'] - result['disponible'] || 0,
        amountDiscount: amountDiscount(acumulate, 0),
        useDiscount: countDiscount(acumulate, 0),
        commerce: {
          maxDiscountAmount: acumulate[0]['maxDiscountAmount'],
          discount: acumulate[0]['discount'],
        },
      },
    ]);
  }
}
