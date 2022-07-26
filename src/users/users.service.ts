import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_NOT_FOUND_MESSAGE } from 'src/auth/config';

import CreateUserDto from './dto/create-user.dto';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  public async createUser(userDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async getUserByEmail(email: string): Promise<UserDocument | undefined> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user;
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }
  }

  async getUserById(id: string): Promise<UserDocument | undefined> {
    try {
      const user = await this.userModel.findById(id).exec();
      return user;
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }
  }

  async updateRefreshToken(
    id: string,
    hashedToken: string,
  ): Promise<UserDocument> {
    const updatedData = { refreshToken: hashedToken };
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updatedData)
      .exec();
    return updatedUser;
  }
}
