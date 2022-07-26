import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_ACCESS_STRATEGY_NAME } from '../config';
import jwtPayload from '../types/jwt-payload.type';

@Injectable()
class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_ACCESS_STRATEGY_NAME,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  validate(payload: jwtPayload): jwtPayload {
    return payload;
  }
}

export default AccessTokenStrategy;
