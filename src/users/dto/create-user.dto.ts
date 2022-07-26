import { IsEmail, IsString, Length } from 'class-validator';
import {
  IS_EMAIL_ERROR_MESSAGE,
  IS_STRING_ERROR_MESSAGE,
  LENGTH_ERROR_MESSAGE,
} from './config';

class CreateUserDto {
  @IsString({ message: `${IS_STRING_ERROR_MESSAGE} email` })
  @IsEmail({}, { message: IS_EMAIL_ERROR_MESSAGE })
  readonly email: string;

  @IsString({ message: `${IS_STRING_ERROR_MESSAGE} password` })
  @Length(6, 16, { message: `${LENGTH_ERROR_MESSAGE} password` })
  readonly password: string;
}

export default CreateUserDto;
