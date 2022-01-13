import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Relations } from 'src/common/constants/relations';
import { isMatch } from 'src/common/encryption';
import { filterQueryReverse } from 'src/common/inquiries/agregate';
import { UserServiceInterface } from '../user/interface/user.service.interface';
import { User } from '../user/schema/user.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    @Inject('userServiceInterface')
    private readonly userService: UserServiceInterface,
    private jwtService: JwtService,
  ) {}
  public async autentification(data: AuthDto): Promise<User | null> {
    const user = await this.userService.findByConditionRelationAgregate(
      filterQueryReverse(
        'commerces',
        { userId: '$_id' },
        ['$manager', '$$userId'],
        'commerce',
        { email: data.email },
        {
          from: 'roles',
          localField: Relations.role,
          foreignField: '_id',
          as: 'role',
        },
      ),
    );
    if (user.length === 0) {
      throw new NotFoundException('user not exist');
    }
    const match = await isMatch(data.password, user[0].password);
    if (match) {
      if (
        user[0]['role'][0]?.slug === 'user.empleado' &&
        !user[0]['commerce'][0]
      )
        throw new NotAcceptableException('user empleado sin comercio');
      return user[0];
    }
    throw null;
  }
  public async login(user: any) {
    const playload = {
      id: user._id.toString(),
      role_slug: user.role[0]?.slug,
      commerce_id: user.commerce[0]?._id.toString(),
    };
    return {
      access_token: this.jwtService.sign(playload),
    };
  }

  public async porfileUser(id: any) {
    return await this.userService.findByConditionRelationAgregate([
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
          as: 'transactions',
        },
      },
      {
        $lookup: {
          from: 'transactions',
          pipeline: [
            { $match: { user_id: ObjectId(id) } },
            {
              $group: {
                _id: '$commerce_id',
              },
            },
          ],
          as: 'comerciosVisitados',
        },
      },
      {
        $project: {
          _id: 0,
          email: 1,
          lastName: 1,
          name: 1,
          transactions: 1,
          comerciosVisitados: {
            $cond: {
              if: { $isArray: '$comerciosVisitados' },
              then: { $size: '$comerciosVisitados' },
              else: 'NA',
            },
          },
        },
      },
    ]);
  }
  public async porfileCommerce(id: any) {
    return await this.userService.findByConditionRelationAgregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'commerces',
          pipeline: [{ $match: { manager: ObjectId(id) } }],
          as: 'commerce',
        },
      },
      {
        $unwind: '$commerce',
      },
      {
        $project: {
          _id: 0,
          name: 1,
          lastName: 1,
          email: 1,
          commerce: {
            _id: '$commerce._id',
            name: '$commerce.name',
            direction: '$commerce.direction',
            discount: '$commerce.discount',
            maxDiscountAmount: '$commerce.maxDiscountAmount',
            // $map: {
            //   input: '$commerce',
            //   as: 'data',
            //   in: {
            //     _id: '$$data._id',
            //     name: '$$data.name',
            //     direction: '$$data.direction',
            //     discount: '$$data.discount',
            //     maxDiscountAmount: '$$data.maxDiscountAmount',
            //   },
            // },
          },
        },
      },
    ]);
  }
}
