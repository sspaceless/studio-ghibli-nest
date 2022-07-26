import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_REFRESH_STRATEGY_NAME } from 'src/auth/config';

@Injectable()
class RefreshTokenGuard extends AuthGuard(JWT_REFRESH_STRATEGY_NAME) {}
export default RefreshTokenGuard;
