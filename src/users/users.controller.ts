import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(
    @Body()
    dto: CreateUserDto,
  ) {
    return this.usersService.createUser(dto);
  }

  @Get(':email')
  findUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
