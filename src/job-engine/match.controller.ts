import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}
  @Get('match-candidates')
  async matchCandidatesToJobs() {
    return this.matchService.handleMatchCandidatesToJobs();
  }
}
