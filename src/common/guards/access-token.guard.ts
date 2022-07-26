import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_ACCESS_STRATEGY_NAME } from '../../auth/config';

@Injectable()
class AccessTokenGuard extends AuthGuard(JWT_ACCESS_STRATEGY_NAME) {}
export default AccessTokenGuard;
