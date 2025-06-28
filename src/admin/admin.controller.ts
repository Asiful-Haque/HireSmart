import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('metrics')
  getMetrics() {
    return this.adminService.getMetrics();
  }
}
