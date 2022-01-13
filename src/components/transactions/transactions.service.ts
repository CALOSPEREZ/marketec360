import { Inject, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
import { Cont } from 'src/common/constants/const';
import { Relations } from 'src/common/constants/relations';
import { countDiscount } from 'src/common/inquiries/array.crud';
import { CommerceServiceInterface } from '../commerce/interface/commerce.service.interface';
import { CustomerServiceInterface } from '../customer/interface/customer.service.interface';
import { CreateTransactionsDto } from './dto/create.transactions.dto';
import { TransactionsRepositoryInterface } from './interface/transactions.repository.interface';
import { Transactions } from './schema/Transactions.shema';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('transactionsRepositoryInterface')
    private readonly transactionRepository: TransactionsRepositoryInterface,
    @Inject('commerceServiceInterface')
    private readonly commerceService: CommerceServiceInterface,
    @Inject('customerServiceInterface')
    private readonly customerService: CustomerServiceInterface,
  ) { }

  public async findByAllConditionRelation(
    id: string,
    relation: any,
  ): Promise<Transactions[]> {
    if (Relations.user !== relation)
      return this.transactionRepository.findByAllConditionRelation(
        { user_id: id },
        relation,
      );
    else
      return this.transactionRepository.findByAllConditionRelation(
        { commerce_id: id },
        relation,
      );
  }
  public async findByConditionRelationAgregate(
    relation: any,
  ): Promise<Transactions[]> {
    return await this.transactionRepository.findByConditionRelationAgregate(
      relation,
    );
  }
  public async discount(
    comerce_id: string,
    mount: number,
    user_id: string,
  ): Promise<any> {
    const commerce = await this.commerceService.findById(comerce_id);
    const { discount, maxDiscountAmount } = commerce;
    if (maxDiscountAmount <= mount) {
      const result = mount / discount;
      if (result > Cont.discount)
        for (let index = 0; index < result; index++) {
          await this.commerceService.discount(
            { amount: discount, user_id, status: true },
            comerce_id,
          );
        }
    }
  }
  public async useDiscount(condition: any): Promise<any> {
    const commerce = await this.commerceService.findByConditionRelationAgregate(
      condition,
    );
    return commerce;
  }
  public async filterUser(condition: any): Promise<any> {
    const data = await this.customerService.findByCondition(condition);
    return data;
  }
  public async resultAmount(user_id: string, commerce_id): Promise<any> {
    const data = await this.findByConditionRelationAgregate([
      {
        $match: {
          user_id: ObjectId(user_id),
          commerce_id: ObjectId(commerce_id),
        },
      },
      {
        $group: {
          _id: '$user_id',
          accumulatedAmount: { $sum: '$amount' },
          discountsUsed: { $sum: '$discount' },
          montoLibreDescuento: {
            $sum: { $subtract: ['$amount', '$discount'] },
          },
        },
      },
      {
        $lookup: {
          from: 'commerces',
          let: { order_item: '$_id' },
          pipeline: [
            {
              $match: {
                _id: ObjectId(commerce_id),
              },
            },
            {
              $addFields: {
                discounts: {
                  $filter: {
                    input: '$discounts',
                    as: 'discounts',
                    cond: {
                      $eq: ['$$discounts.user_id', ObjectId(user_id)],
                    },
                  },
                },
                notUsediscounts: {
                  $filter: {
                    input: '$discounts',
                    as: 'discounts',
                    cond: {
                      $and: [
                        { $eq: ['$$discounts.user_id', ObjectId(user_id)] },
                        { $eq: ['$$discounts.status', true] },
                      ],
                    },
                  },
                },
                usediscounts: {
                  $filter: {
                    input: '$discounts',
                    as: 'discounts',
                    cond: {
                      $and: [
                        { $eq: ['$$discounts.user_id', ObjectId(user_id)] },
                        { $eq: ['$$discounts.status', false] },
                      ],
                    },
                  },
                },
              },
            },
          ],
          as: 'commerce',
        },
      },
      { $unwind: { path: '$commerce' } },
      {
        $addFields: {
          descuentoNoUsadoAcumulado: {
            $reduce: {
              input: '$commerce.notUsediscounts',
              initialValue: 0,
              in: {
                $add: ['$$value', '$$this.maxDiscountAmount'],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          commerce: 1,
          discount: '$commerce.discount',
          statistics: {
            $let: {
              vars: {
                neto: {
                  $subtract: [
                    '$montoLibreDescuento',
                    '$descuentoNoUsadoAcumulado',
                  ],
                },
              },
              in: {
                montoNeto: '$montoLibreDescuento',
                montoReclamable: '$$neto',
                faltante: {
                  $subtract: ['$commerce.maxDiscountAmount', '$$neto'],
                },
                descuentoReclamable: {
                  $divide: ['$$neto', '$commerce.maxDiscountAmount'],
                },
              },
            },
          },
          discounts: {
            descuentosAcumulados: {
              $multiply: [
                '$commerce.discount',
                { $size: '$commerce.notUsediscounts' },
              ],
            },
            disponibles: {
              $size: '$commerce.notUsediscounts',
            },
            utilizados: {
              $size: '$commerce.usediscounts',
            },
          },
          transactions: 1,
        },
      },
    ]);
    return data[0];
  }

  public async commerce(id: string): Promise<any> {
    const data = await this.findByConditionRelationAgregate([
      {
        $match: {
          user_id: ObjectId(id),
        },
      },
      // {
      //   $group: {
      //     _id: '$commerce_id',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'commerces',
      //     localField: { $in: '$_id' },
      //     foreignField: '_id',
      //     as: 'commer',
      //   },
      // },
    ]);
    return data;
  }
  public async validate(userDto: CreateTransactionsDto): Promise<Transactions> {
    const result = await this.resultAmount(
      userDto.user_id,
      userDto.commerce_id,
    );
    if (result) {
      const discount = {
        user_id: userDto.user_id,
        amount: result.discount,
        status: true,
      };
      const iteration = Math.trunc(result.statistics['descuentoReclamable']);
      for (let index = 0; index < iteration; ) {
        await this.commerceService.discount(discount, userDto.commerce_id);
        index++;
      }
      return result;
    }
    return result;
  }
  public async create(userDto: CreateTransactionsDto): Promise<Transactions> {
    const result = await this.transactionRepository.create(userDto);
    await this.validate(userDto);
    return await this.resultAmount(userDto.user_id, userDto.commerce_id);
  }
}
