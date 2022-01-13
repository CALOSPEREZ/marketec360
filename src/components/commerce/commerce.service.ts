import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommerceDto } from './dto/create.commerce.dto';
import { DiscountDto } from './dto/discount.dto';
import { DiscountUpdateDto } from './dto/discount.updatedto.dto';
import { CommerceRepositoryInterface } from './interface/commerce.repository.interface';
import { Commerce } from './schema/commerce.shema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class CommerceService {
  constructor(
    @Inject('CommerceRepositoryInterface')
    private readonly commerceRepository: CommerceRepositoryInterface,
  ) {}
  public async create(userDto: any): Promise<Commerce> {
    return await this.commerceRepository.create(userDto);
  }
  public async findAll(): Promise<Commerce[]> {
    return await this.commerceRepository.findAll();
  }
  public async findById(id: string): Promise<Commerce> {
    return await this.commerceRepository.findById(id);
  }
  public async update(userDto: CreateCommerceDto, id: any): Promise<Commerce> {
    const custommer = await this.findById(id);
    if (!custommer) throw new NotFoundException('custommer not exist');
    return await this.commerceRepository.update(userDto, { _id: id });
  }
  public async delete(id: string): Promise<Commerce> {
    return await this.commerceRepository.delete(id);
  }

  public async findByCondition(slug: string): Promise<Commerce> {
    return await this.commerceRepository.findByCondition({ slug: slug });
  }
  public async findByConditionRelationAgregate(
    relation: any,
  ): Promise<Commerce[]> {
    return await this.commerceRepository.findByConditionRelationAgregate(
      relation,
    );
  }
  public async discount(data: DiscountDto, id: any): Promise<any> {
    const custommer = await this.findById(id);
    if (!custommer) throw new NotFoundException('custommer not exist');
    const { user_id, amount, status } = data;
    const maxDiscountAmount = custommer.maxDiscountAmount;
    const model = await this.commerceRepository.pushInArray(
      { _id: id },
      {
        $push: { discounts: { user_id, amount, maxDiscountAmount, status } },
      },
    );
    return model;
  }
  public async updateDiscount(
    id: string,
    data: DiscountUpdateDto,
  ): Promise<Commerce> {
    const custommer = await this.findById(id);
    if (!custommer) throw new NotFoundException('custommer not exist');
    const model = await this.commerceRepository.pushInArray(
      { _id: id, 'discounts._id': data.id },
      {
        $set: {
          'discounts.$.user_id': data.user_id,
          'discounts.$.maxDiscountAmount': custommer.maxDiscountAmount,
          'discounts.$.amount': data.amount,
          'discounts.$.status': data.status,
        },
      },
    );
    return model;
  }
  public async deleteDiscount(id: string, comId: string): Promise<Commerce> {
    const custommer = await this.findById(comId);
    if (!custommer) throw new NotFoundException('custommer not exist');
    const model = await this.commerceRepository.pushInArray(
      { _id: comId },
      {
        $pull: {
          discounts: { _id: id },
        },
      },
    );
    return model;
  }
  public async findByConditionCommerce(
    findByAllCondition: any,
  ): Promise<Commerce> {
    return await this.commerceRepository.findByCondition(findByAllCondition);
  }
  public async statistics(user_id: string, commerce_id: string): Promise<any> {
    return await this.findByConditionRelationAgregate([
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
      {
        $lookup: {
          from: 'transactions',
          pipeline: [
            {
              $match: {
                user_id: ObjectId(user_id),
                commerce_id: ObjectId(commerce_id),
              },
            },
            {
              $group: {
                _id: '$user_id',
                montoTotal: { $sum: '$amount' },
                montoEnDescuentos: { $sum: '$discount' },
                montoLibreDescuento: {
                  $sum: { $subtract: ['$amount', '$discount'] },
                },
              },
            },
          ],
          as: 'statistics',
        },
      },
      {
        $lookup: {
          from: 'transactions',
          pipeline: [
            {
              $match: {
                user_id: ObjectId(user_id),
                commerce_id: ObjectId(commerce_id),
              },
            },
          ],
          as: 'transactions',
        },
      },
      {
        $addFields: {
          descuentoNoUsadoAcumulado: {
            $reduce: {
              input: '$notUsediscounts',
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
          commerce: {
            _id: '$_id',
            name: '$name',
            direction: '$direction',
            discount: '$discount',
            maxDiscountAmount: '$maxDiscountAmount',
          },
          statistics: {
            $let: {
              vars: {
                stadisticas: { $arrayElemAt: ['$statistics', 0] },
              },
              in: {
                $let: {
                  vars: {
                    neto: {
                      $subtract: [
                        '$$stadisticas.montoLibreDescuento',
                        '$descuentoNoUsadoAcumulado',
                      ],
                    },
                  },
                  in: {
                    $map: {
                      input: '$statistics',
                      as: 'data',
                      in: {
                        montoTotal: '$$data.montoLibreDescuento',
                        montoNeto: '$$neto',
                        montoaGastadoEnDescuentos: '$$data.montoEnDescuentos',
                        faltante: {
                          $subtract: ['$maxDiscountAmount', '$$neto'],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          discounts: {
            $reduce: {
              input: '$notUsediscounts',
              initialValue: { sum: 0 },
              in: {
                descuentosAcumulados: {
                  $multiply: ['$discount', { $size: '$notUsediscounts' }],
                },
                disponibles: {
                  $size: '$notUsediscounts',
                },
                utilizados: {
                  $size: '$usediscounts',
                },
              },
            },
          },
          transactions: 4,
        },
      },
    ]);
  }
}
