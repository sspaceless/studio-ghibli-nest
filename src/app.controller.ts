import { Controller, Get, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserDocument } from './users/schemas/user.schema';

@Controller()
class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('data')
  getData(@Request() request: { user: UserDocument }) {
    return request.user;
  }
}

export default AppController;
