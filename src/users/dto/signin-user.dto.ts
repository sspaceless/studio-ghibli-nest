import TokensDto from './tokens.dto';

class UserDto {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly tokens: TokensDto;
}

export default UserDto;
