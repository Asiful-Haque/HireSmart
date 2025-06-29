import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';

import { CreateApplicationDto } from './dto/create-application.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationsService } from './application.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard, ThrottlerGuard)
  @Throttle({ limit: 5, ttl: 60 } as any)
  @Roles('candidate')
  apply(@Body() dto: CreateApplicationDto) {
    return this.applicationsService.apply(dto);
  }

  @Get('job/:job_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('employer')
  getPerJobApplies(@Param('job_id') job_id: string) {
    return this.applicationsService.getPerJobApplies(Number(job_id));
  }

  @Get('user/:candidate_user_id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('candidate')
  getOwnApplies(@Param('candidate_user_id') candidate_user_id: string) {
    return this.applicationsService.getOwnApplies(Number(candidate_user_id));
  }
}
