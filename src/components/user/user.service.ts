import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { encryption } from 'src/common/encryption';
import { RoleServiceInterface } from '../role/interface/role.service.interface';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsereRepositoryInterface } from './interface/user.repository.interface';
import { User } from './schema/user.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class UserService {
  constructor(
    @Inject('userRepositoryInterface')
    private readonly userRepository: UsereRepositoryInterface,
    @Inject('roleServiceInterface')
    private readonly roleService: RoleServiceInterface,
  ) { }
  public async create(userDto: CreateUserDto): Promise<User> {
    const { name, lastName, phone, email, role } = userDto;
    const dataRole = await this.roleService.findByCondition(role);
    if (!dataRole) throw new NotFoundException('role not exist');
    const role_id = dataRole['_id'].toString();
    const password = await encryption(userDto.password);
    return await this.userRepository.create({
      name,
      lastName,
      phone,
      email,
      password,
      role_id,
    });
  }
  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
  public async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
  public async update(userDto: UpdateUserDto, id: string): Promise<User> {
    if (userDto.password) userDto.password = await encryption(userDto.password);
    return this.userRepository.update(userDto, { _id: id });
  }
  public async findByCondition(email: string): Promise<User> {
    return await this.userRepository.findByCondition({ email: email });
  }
  public async findByConditionRelation(
    email: any,
    relation: string,
  ): Promise<User> {
    return await this.userRepository.findByConditionRelation(
      { email: email },
      relation,
    );
  }
  public async delete(id: string): Promise<User> {
    return this.userRepository.delete(id);
  }
  public async findByConditionRelationAgregate(relation: any): Promise<any> {
    return this.userRepository.findByConditionRelationAgregate(relation);
  }
  public async commerceList(id: string): Promise<any> {
    const commerceVisitados = await this.findByConditionRelationAgregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'transactions',
          pipeline: [
            { $match: { user_id: ObjectId(id) } },
            {
              $group: {
                _id: {
                  commerce_id: '$commerce_id',
                  user_id: '$user_id',
                },
                creation: { $push: '$creation' },
              },
            },
          ],
          as: 'transactions',
        },
      },
      { $sort: { 'transactions.creation': -1 } },
      {
        $project: {
          _id: 0,
          commerce: {
            $map: {
              input: '$transactions',
              as: 'data',
              in: {
                _id: '$$data._id.commerce_id',
                creation: { $arrayElemAt: ['$$data.creation', 0] },
              },
            },
          },
        },
      },
    ]);
    const commerce = [];
    if (commerceVisitados[0]?.commerce)
      commerceVisitados[0].commerce.forEach((element) => {
        commerce.push(element._id);
      });
    const commerceNotVisitados = await this.findByConditionRelationAgregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'commerces',
          pipeline: [{ $match: { _id: { $nin: commerce } } }],
          as: 'commerce',
        },
      },
      {
        $lookup: {
          from: 'commerces',
          pipeline: [{ $match: { _id: { $in: commerce } } }],
          as: 'commercenotVisitado',
        },
      },
      {
        $project: {
          _id: 0,
          commercevisitate: {
            $map: {
              input: '$commercenotVisitado',
              as: 'data',
              in: {
                _id: '$$data._id',
                name: '$$data.name',
                maxDiscountAmount: '$$data.maxDiscountAmount',
                discount: '$$data.discount',
              },
            },
          },
          commercenotVisitate: {
            $map: {
              input: '$commerce',
              as: 'data',
              in: {
                _id: '$$data._id',
                name: '$$data.name',
                maxDiscountAmount: '$$data.maxDiscountAmount',
                discount: '$$data.discount',
              },
            },
          },
        },
      },
    ]);

    return commerceNotVisitados[0];
  }
  public async commercefindUser(
    filter: string,
    commerce_id: string,
  ): Promise<any> {
    const commerceVisitados = await this.findByConditionRelationAgregate([
      {
        $match: {
          phone: filter,
        },
      },
      {
        $lookup: {
          from: 'transactions',
          let: { order_item: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$user_id', '$$order_item'] },
                    { $eq: ['$commerce_id', ObjectId(commerce_id)] },
                  ],
                },
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
                count: { $sum: 1 },
              },
            },
          ],
          as: 'statistics',
        },
      },
      {
        $lookup: {
          from: 'transactions',
          let: { order_item: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$user_id', '$$order_item'] },
                    { $eq: ['$commerce_id', ObjectId(commerce_id)] },
                  ],
                },
                commerce_id: ObjectId(commerce_id),
              },
            },
          ],
          as: 'transactions',
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
                      $eq: ['$$discounts.user_id', '$$order_item'],
                    },
                  },
                },
                usediscounts: {
                  $filter: {
                    input: '$discounts',
                    as: 'discounts',
                    cond: {
                      $and: [
                        { $eq: ['$$discounts.user_id', '$$order_item'] },
                        { $eq: ['$$discounts.status', false] },
                      ],
                    },
                  },
                },
                notUsediscounts: {
                  $filter: {
                    input: '$discounts',
                    as: 'discounts',
                    cond: {
                      $and: [
                        { $eq: ['$$discounts.user_id', '$$order_item'] },
                        { $eq: ['$$discounts.status', true] },
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
          name: 1,
          lastName: 1,
          email: 1,
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
                          $subtract: ['$commerce.maxDiscountAmount', '$$neto'],
                        },
                        descuentoReclamable: {
                          $divide: ['$$neto', '$commerce.maxDiscountAmount'],
                        },
                      },
                    },
                  },
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

    return commerceVisitados[0];
  }
}
