import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ACCESS_DENIED_MESSAGE, USER_ALREADY_EXIST_MESSAGE } from './config';
import { UserDocument } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import CreateUserDto from '../users/dto/create-user.dto';
import UserDto from '../users/dto/signin-user.dto';
import TokensDto from 'src/users/dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signupLocal(userDto: CreateUserDto): Promise<UserDto> {
    const { email, password } = userDto;
    const isUserExist = await this.usersService.getUserByEmail(email);
    if (isUserExist) {
      throw new BadRequestException(USER_ALREADY_EXIST_MESSAGE);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    const tokens = await this.generateTokens(newUser);
    await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken);

    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      tokens,
    };
  }

  async signinLocal(user: UserDocument): Promise<UserDto> {
    const tokens = await this.generateTokens(user);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      tokens,
    };
  }

  signout(id: string) {
    this.usersService.updateRefreshToken(id, null);
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.usersService.getUserById(id);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException(ACCESS_DENIED_MESSAGE);
    }

    const isRefreshTokenMatch = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!isRefreshTokenMatch) {
      throw new ForbiddenException(ACCESS_DENIED_MESSAGE);
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      tokens,
    };
  }

  private async updateRefreshTokenHash(id: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateRefreshToken(id, hashedToken);
  }

  private async generateTokens(user: UserDocument): Promise<TokensDto> {
    const jwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_AGE,
    });

    const refreshToken = this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_AGE,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.usersService.getUserByEmail(username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }
}
