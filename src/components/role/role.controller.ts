import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { handleResponse } from 'src/common/response';
import { CreateRoleDto } from './dto/createRoleDto';
import { SignInDtoResponse } from './dto/sign-in.dto';
import { RoleServiceInterface } from './interface/role.service.interface';
import { Role } from './schema/role.schema';

@Controller('role')
export class RoleController {
  constructor(
    @Inject('roleServiceInterface')
    private readonly roleService: RoleServiceInterface,
  ) {}
  @Get()
  public async findAll(): Promise<Role[]> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async first(@Param('id') id: string, @Res() res) {
    const data = await this.roleService.findById(id);
    return handleResponse(
      res,
      HttpStatus.CREATED,
      'ok',
      new SignInDtoResponse(data),
    );
  }

  @Post()
  public async create(
    @Body() roleDto: CreateRoleDto,
    @Res() res,
  ): Promise<{ message: string; data: CreateRoleDto }> {
    const data = await this.roleService.create(roleDto);
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
  @Put(':id')
  public async update(
    @Body() roleDto: CreateRoleDto,
    @Param('id') id: string,
  ): Promise<Role> {
    return await this.roleService.update(roleDto, id);
  }
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.roleService.delete(id);
  }
  @Get()
  public async findSlug(@Param('slug') slug: string) {
    return await this.roleService.findByCondition(slug);
  }
}
