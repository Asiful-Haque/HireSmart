import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(
    @Body()
    userData: {
      full_name: string;
      email_address: string;
      password_hash: string;
      user_role: string;
    },
  ) {
    return this.usersService.createUser(userData);
  }

  @Post('test')
  testPost() {
    return { message: 'Test POST endpoint works!' };
  }

  @Get(':email')
  findUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
