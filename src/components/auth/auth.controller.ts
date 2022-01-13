import {
  Controller,
  Get,
  Inject,
  Post,
  HttpStatus,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { TransactionsServiceInterface } from '../transactions/interface/transactions.service.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { handleResponse } from 'src/common/response';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject('transactionsServiceInterface')
    private readonly transactionservice: TransactionsServiceInterface,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    const data = await this.authService.login(req.user);
    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req, @Res() res) {
    let data;
    if (!req.user.commerce_id)
      data = await await this.authService.porfileUser(req.user.id);
    else data = await await this.authService.porfileCommerce(req.user.id);
    return handleResponse(res, HttpStatus.CREATED, 'ok', data);
  }
}
