import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LOCAL_STRATEGY_NAME } from '../../auth/config';

@Injectable()
class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY_NAME) {}
export default LocalAuthGuard;
