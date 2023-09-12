import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateRepository } from './rate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RateRepository])],
  providers: [RateService, RateRepository],
  exports: [RateService],
})
export class RateModule {}
