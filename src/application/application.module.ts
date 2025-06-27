import { Module } from '@nestjs/common';
import { ApplicationsController } from './application.controller';
import { ApplicationsService } from './application.service';


@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
