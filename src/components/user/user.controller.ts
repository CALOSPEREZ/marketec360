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
import { filterQuery, filterQueryReverse } from 'src/common/inquiries/agregate';
import { handleResponse } from 'src/common/response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserServiceInterface } from './interface/user.service.interface';
import { User } from './schema/user.schema';
// @UseInterceptors(ErrorsInterceptor)
@Controller('user')
export class UserController {
  constructor(
    @Inject('userServiceInterface')
    private readonly userService: UserServiceInterface,
  ) {}
  @Get()
  public async findAll(@Res() res): Promise<User[]> {
    const data = await this.userService.findByConditionRelationAgregate(
      filterQuery('roles', 'role_id', '_id', 'Role', '$Role', {
        'Role.slug': 'user.empleado',
      }),
    );
    return handleResponse(res, HttpStatus.ACCEPTED, 'ok', data);
  }
  @Get(':id')
  public async first(@Param('id') id: string, @Res() res) {
    const data = await this.userService.findById(id);
    return handleResponse(res, HttpStatus.ACCEPTED, 'ok', data);
  }
  @UseGuards(JwtAuthGuard)
  @Get('commerces/list')
  public async commerces(@Request() req, @Res() res) {
    const data = await this.userService.commerceList(req.user.id);
    return handleResponse(res, HttpStatus.ACCEPTED, 'ok', data);
  }
  @UseGuards(JwtAuthGuard)
  @Get('commerces/user/:filter')
  public async commercesfindUser(
    @Param('filter') filter: string,
    @Request() req,
    @Res() res,
  ) {
    const data = await this.userService.commercefindUser(
      filter,
      req.user.commerce_id,
    );
    return handleResponse(res, HttpStatus.ACCEPTED, 'ok', data);
  }
  @Post()
  public async create(
    @Body() userDto: CreateUserDto,
    @Res() res,
  ): Promise<{ message: string; data: CreateUserDto }> {
    const data = await this.userService.create(userDto);
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
  @Put(':id')
  public async update(
    @Body() userDto: UpdateUserDto,
    @Param('id') id: string,
    @Res() res,
  ): Promise<User> {
    const data = await this.userService.update(userDto, id);
    return handleResponse(res, HttpStatus.ACCEPTED, 'ok', data);
  }
  @Delete(':id')
  public async delete(@Param('id') id: string, @Res() res) {
    const data = await this.userService.delete(id);
    return handleResponse(res, HttpStatus.ACCEPTED, 'ok', data);
  }
  @Post('login')
  public async login(@Body('email') email) {
    const t = await this.userService.findByCondition(email);
    return t;
  }
}
