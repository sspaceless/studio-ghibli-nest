import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';

import AccessTokenGuard from '../common/guards/access-token.guard';
import { UserDocument } from '../users/schemas/user.schema';
import { AuthService } from './auth.service';
import LocalAuthGuard from '../common/guards/local-auth.guard';
import CreateUserDto from '../users/dto/create-user.dto';
import RefreshTokenGuard from 'src/common/guards/refresh-token.guard';

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin/local')
  signinLocal(@Req() request: { user: UserDocument }) {
    return this.authService.signinLocal(request.user);
  }

  @Post('signup/local')
  signupLocal(@Body(ValidationPipe) body: CreateUserDto) {
    return this.authService.signupLocal(body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  signout(@Req() request: Request) {
    const id = request.user['sub'];
    this.authService.signout(id);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() request: Request) {
    const id = request.user['sub'];
    const refreshToken = request.user['refreshToken'];

    return this.authService.refreshTokens(id, refreshToken);
  }
}

export default AuthController;
